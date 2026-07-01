"use client";
import { useState, useCallback } from "react";

const BG         = "rgba(92, 79, 60, 0.92)";
const BG_HOVER   = "rgba(107, 93, 78, 0.95)";
const BG_ACTIVE  = "rgba(106, 92, 68, 0.95)";
const GOLD       = "#c9a84c";

type Selected = "資料請求" | "見学予約" | null;

interface TabConfig {
  label: string;
  type: "資料請求" | "見学予約";
  sub?: string;
}

const TABS: TabConfig[] = [
  { label: "資料請求", type: "資料請求" },
  { label: "見学会予約", type: "見学予約", sub: "ONLINE" },
];

export default function FloatingMenu() {
  const [selected, setSelected] = useState<Selected>(null);

  const handleClick = useCallback((type: "資料請求" | "見学予約") => {
    setSelected(type);

    const section = document.getElementById("contact");
    if (!section) return;
    section.scrollIntoView({ behavior: "smooth" });

    setTimeout(() => {
      const select = document.querySelector<HTMLSelectElement>('select[name="type"]');
      if (!select) return;
      select.value = type;
      select.dispatchEvent(new Event("change", { bubbles: true }));
    }, 800);
  }, []);

  return (
    <>
      {/* ── Desktop: right-side vertical tabs ── */}
      <div
        className="fixed right-0 top-1/2 -translate-y-1/2 z-[9000] hidden md:flex flex-col"
        style={{ width: 56 }}
      >
        {TABS.map((tab, i) => {
          const isSelected = selected === tab.type;
          const isLast = i === TABS.length - 1;

          return (
            <button
              key={tab.type}
              onClick={() => handleClick(tab.type)}
              aria-label={`${tab.label}フォームへ移動`}
              aria-pressed={isSelected}
              className="group relative flex items-center justify-center overflow-hidden hover:-translate-x-1"
              style={{
                width: 56,
                height: 180,
                background: isSelected ? BG_ACTIVE : BG,
                borderBottom: isLast ? undefined : "1px solid rgba(255,255,255,0.2)",
                transition: "background 0.3s, transform 0.2s",
              }}
              onMouseEnter={(e) => {
                if (!isSelected) e.currentTarget.style.background = BG_HOVER;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = isSelected ? BG_ACTIVE : BG;
              }}
            >
              {/* Left accent bar */}
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: isSelected ? 6 : 4,
                  background: isSelected ? GOLD : "rgba(255,255,255,0.15)",
                  boxShadow: isSelected ? `0 0 8px rgba(201,168,76,0.6)` : "none",
                  transition: "width 0.3s, background 0.3s, box-shadow 0.3s",
                }}
              />

              {/* Text */}
              <div
                className="flex flex-col items-center gap-2"
                style={{ writingMode: "vertical-rl" }}
              >
                <span
                  className="font-noto text-xs tracking-[0.3em]"
                  style={{
                    color: isSelected ? "#fff" : "rgba(255,255,255,0.85)",
                    transition: "color 0.3s",
                  }}
                >
                  {tab.label}
                </span>
                {tab.sub && (
                  <span
                    className="font-inter text-[8px] tracking-widest"
                    style={{
                      color: isSelected ? `${GOLD}cc` : `${GOLD}66`,
                      transition: "color 0.3s",
                    }}
                  >
                    {tab.sub}
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* ── Mobile: bottom horizontal bar ── */}
      <div
        className="fixed bottom-0 left-0 right-0 z-[9000] flex md:hidden"
        style={{ height: 52 }}
      >
        {TABS.map((tab, i) => {
          const isSelected = selected === tab.type;
          const isFirst = i === 0;

          return (
            <button
              key={tab.type}
              onClick={() => handleClick(tab.type)}
              aria-label={`${tab.label}フォームへ移動`}
              aria-pressed={isSelected}
              className="flex-1 flex items-center justify-center relative overflow-hidden"
              style={{
                background: isSelected ? BG_ACTIVE : BG,
                borderRight: isFirst ? "1px solid rgba(255,255,255,0.2)" : undefined,
                transition: "background 0.3s",
              }}
            >
              {/* Top accent bar */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: isSelected ? 3 : 2,
                  background: isSelected ? GOLD : "rgba(255,255,255,0.15)",
                  boxShadow: isSelected ? `0 0 6px rgba(201,168,76,0.6)` : "none",
                  transition: "height 0.3s, background 0.3s, box-shadow 0.3s",
                }}
              />
              <span
                className="font-noto text-sm tracking-widest"
                style={{
                  color: isSelected ? "#fff" : "rgba(255,255,255,0.85)",
                  transition: "color 0.3s",
                }}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </>
  );
}
