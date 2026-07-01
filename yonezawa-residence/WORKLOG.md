## 2026-06-29 ギャラリー強化 / お問い合わせUX改善

### 実装内容
- Gallery: Unsplash 6枚差し替え (大浴場/リビング/キッチン/寝室/バルコニー/エントランス)
  - マウスパラレックス: rAF スロットル + spring アニメーション (inset -4% で端露出なし)
  - AnimatePresence スライド遷移 (opacity fade 0.8s)
  - サムネイルストリップ + ドットインジケーター (両方クリックで切り替え)
- Contact: トースト通知 (成功=ゴールド枠 / エラー=赤枠 + 5秒自動消去)
  - 送信中スピナー (border-t アニメーション)
  - 送信後もフォームを表示したまま (ページ遷移なし)
- API route `/api/contact`:
  - Sheets レンジを `問い合わせ!A:I` に修正 + ステータス列追加
  - Notion に 送信日時 (date) / ステータス (select:未対応) 追加
- README.md 環境変数ドキュメント全面整備

### 残課題
- .env.local の NOTION_TOKEN / NOTION_DATABASE_ID または Google Sheets 認証情報を設定
- OGP画像 `/public/og-image.jpg` を用意 (現在プレースホルダー)
- reCAPTCHA v3 統合
- 自動返信メール (nodemailer SMTP 設定)
- 実物件画像のギャラリー差し替え
- Google Maps埋め込み (Location セクション)
- Vercel へのデプロイと本番 canonical URL 更新

---

## 2026-06-29 初期実装完了

### 実装内容
- Next.js 14 (App Router) + TypeScript + Tailwind CSS プロジェクト作成
- Three.js / React Three Fiber で12階建て3Dビルモデル実装
  - スクロール連動カメラリグ (0-100% 5段階アングル変化)
  - Bloom / ChromaticAberration / Vignette ポストプロセッシング
  - フロアごとの発光カラー切り替え (1-3F gold / 4-7F ice / 8-12F sunset)
- Framer Motion でローディング画面・セクションフェードイン
- カスタムカーソル (dot + ring ラグあり追従)
- セクション実装: Hero / Concept / FloorGuide / Amenities / Location / Gallery / Contact / Footer
- お問い合わせフォーム: react-hook-form + zod バリデーション
- API route `/api/contact` : Notion / Google Sheets 切り替え対応 + レート制限 (3req/60s)
- SEO: title / description / OGP / canonical / JSON-LD (RealEstateAgent)
- カラートークン tailwind.config.ts の brand.* に集約
- フォント: Cinzel Decorative (英見出し) / Noto Serif JP (和文) / Inter (本文)

### 残課題
- .env.local の NOTION_TOKEN / NOTION_DATABASE_ID または Google Sheets 認証情報を設定
- OGP画像 `/public/og-image.jpg` を用意 (現在プレースホルダー)
- reCAPTCHA v3 統合 (Google サイトキー取得後)
- 自動返信メール (nodemailer SMTP 設定)
- 実物件画像のギャラリー差し替え
- Google Maps埋め込み (Location セクション)
- Vercel へのデプロイと本番 canonical URL 更新
