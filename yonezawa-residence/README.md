# YONEZAWA RESIDENCE — LP サイト

山形県米沢市の高級マンション「YONEZAWA RESIDENCE」のシネマティック LP。  
Next.js 14 (App Router) + Three.js + GSAP + Framer Motion で構築。

## 開発サーバー起動

```bash
npm run dev
```

→ [http://localhost:3000](http://localhost:3000)

---

## 環境変数 (.env.local)

`.env.local` を作成し、以下の変数を設定してください。

### 送信先の切り替え

```
CONTACT_DESTINATION=notion   # または sheets
```

---

### Google Sheets 連携 (`CONTACT_DESTINATION=sheets`)

```
GOOGLE_SERVICE_ACCOUNT_EMAIL=xxx@your-project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIE...\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEET_ID=1aBcDeFgHiJkLmNoPqRsTuVwXyZ
```

#### スプレッドシート側の準備

1. Google Cloud Console でサービスアカウントを作成し、JSON キーをダウンロード
2. スプレッドシートを新規作成し、1行目（ヘッダー）を以下の順で入力:  
   `送信日時 / お名前 / フリガナ / メール / 電話 / 希望フロア / 種別 / メッセージ / ステータス`
3. **シート名を `問い合わせ` に変更**（デフォルトの `Sheet1` ではなく）
4. サービスアカウントのメールをスプレッドシートの「編集者」として共有

---

### Notion 連携 (`CONTACT_DESTINATION=notion`)

```
NOTION_TOKEN=secret_xxxxxxxxxxxxxxxxxxxxxx
NOTION_DATABASE_ID=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

#### Notion データベース側の準備

データベースに以下のプロパティを作成してください:

| プロパティ名 | 種別 |
|---|---|
| 名前 | タイトル（Title） |
| フリガナ | テキスト（Rich text） |
| メール | メール（Email） |
| 電話 | 電話番号（Phone number） |
| 希望フロア | セレクト（Select） |
| 種別 | セレクト（Select） |
| メッセージ | テキスト（Rich text） |
| 送信日時 | 日付（Date） |
| ステータス | セレクト（Select）— オプションに `未対応` を追加 |

---

## ビルド & デプロイ

```bash
npm run build
```

Vercel へのデプロイは、上記の環境変数を Vercel Dashboard の Environment Variables に設定してから行ってください。

## ワークログ

→ [WORKLOG.md](./WORKLOG.md) 参照
