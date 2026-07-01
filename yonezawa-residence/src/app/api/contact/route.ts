import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(1),
  furigana: z.string().min(1),
  email: z.string().email(),
  tel: z.string().optional(),
  floor: z.string().min(1),
  type: z.string().min(1),
  message: z.string().min(10),
  consent: z.literal(true),
});

// In-memory rate limiter: 3 req / 60s per IP
const rateMap = new Map<string, number[]>();
function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const WINDOW = 60_000;
  const LIMIT = 3;
  const hits = (rateMap.get(ip) ?? []).filter((t) => now - t < WINDOW);
  if (hits.length >= LIMIT) return false;
  hits.push(now);
  rateMap.set(ip, hits);
  return true;
}

async function saveToSheets(data: z.infer<typeof schema>) {
  const { google } = await import("googleapis");
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
  const sheets = google.sheets({ version: "v4", auth });
  await sheets.spreadsheets.values.append({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range: "問い合わせ!A:I",
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [[
        new Date().toLocaleString("ja-JP", { timeZone: "Asia/Tokyo" }),
        data.name,
        data.furigana,
        data.email,
        data.tel ?? "",
        data.floor,
        data.type,
        data.message,
        "未対応",
      ]],
    },
  });
}

async function saveToNotion(data: z.infer<typeof schema>) {
  const { Client } = await import("@notionhq/client");
  const notion = new Client({ auth: process.env.NOTION_TOKEN });
  const now = new Date().toISOString();
  await notion.pages.create({
    parent: { database_id: process.env.NOTION_DATABASE_ID! },
    properties: {
      名前:           { title:      [{ text: { content: data.name } }] },
      フリガナ:       { rich_text:  [{ text: { content: data.furigana } }] },
      メール:         { email:      data.email },
      電話:           { phone_number: data.tel ?? "" },
      希望フロア:     { select:     { name: data.floor } },
      種別:           { select:     { name: data.type } },
      メッセージ:     { rich_text:  [{ text: { content: data.message } }] },
      送信日時:       { date:       { start: now } },
      ステータス:     { select:     { name: "未対応" } },
    },
  });
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";

  if (!checkRateLimit(ip)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid data", issues: parsed.error.issues }, { status: 400 });
  }

  const dest = process.env.CONTACT_DESTINATION ?? "notion";

  try {
    if (dest === "sheets") {
      await saveToSheets(parsed.data);
    } else {
      await saveToNotion(parsed.data);
    }
    return NextResponse.json({ success: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[contact] save error:", message);
    return NextResponse.json({ error: "Save failed" }, { status: 500 });
  }
}
