山形県米沢市のマンション「YONEZAWA RESIDENCE」のシネマティックLPサイトをNext.js 14で構築してください。

【技術スタック】
- Next.js 14 (App Router) + TypeScript
- Three.js + React Three Fiber + Drei（3D）
- GSAP ScrollTrigger + Framer Motion（アニメーション）
- Tailwind CSS
- Notion API または Google Sheets API（フォーム送信先、環境変数で切り替え）

【3D Hero Section】
React Three Fiberで12階建てマンションの3Dモデルを実装。
スクロールに連動してカメラアングルとフロアハイライトが変化：
- 0-15%: 全景・正面ショット、ビルが浮かび上がる
- 15-35%: 1-3Fにズームイン・発光、"LOBBY & AMENITIES"テキスト表示
- 35-55%: 4-7Fにカメラ移動・フォーカス、"STANDARD RESIDENCE"テキスト
- 55-75%: 8-12Fを鳥瞰アングル・夕景ライティング、"PREMIUM SUITE"テキスト
- 75-100%: 全景夜景、全フロア点灯、米沢の山並みシルエット
Bloom・ChromaticAberration・Vignetteのポストプロセッシング付き。

【LPセクション構成】
1. Hero（3Dキャンバス全面）
2. Concept（米沢の四季・歴史、雪パーティクル）
3. Floor Guide（1-3F / 4-7F / 8-12F タブ切替）
4. Amenities（グリッドカード）
5. Location（米沢駅・上杉神社・周辺施設アクセス）
6. Gallery（パララックススライダー）
7. Contact（お問い合わせフォーム）
8. Footer

【お問い合わせフォーム】
フィールド: 名前・フリガナ・メール・電話（任意）・希望フロア・問い合わせ種別・メッセージ・同意チェック
react-hook-form + zodでバリデーション。
送信先は環境変数 CONTACT_DESTINATION で切り替え：
- notion: @notionhq/client でデータベースにページ作成
- sheets: googleapis でスプレッドシートに行追記
レート制限・reCAPTCHA・自動返信メール対応。

【デザイン】
ダークモード固定。カラー: 黒(#0a0a0f)ベース・ゴールド(#c9a84c)アクセント・アイスブルー(#e8eef7)。
フォント: Cinzel Decorative（英見出し）・Noto Serif JP（和文）・Inter（本文）。
カスタムカーソル・スクロールバー・ローディング画面付き。
prefers-reduced-motion対応。

【環境変数】
CONTACT_DESTINATION=notion
NOTION_TOKEN=
NOTION_DATABASE_ID=
GOOGLE_SERVICE_ACCOUNT_EMAIL=
GOOGLE_PRIVATE_KEY=
GOOGLE_SHEET_ID=
