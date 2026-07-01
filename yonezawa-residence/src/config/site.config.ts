export const siteConfig = {
  name: "YONEZAWA RESIDENCE",
  nameJa: "米沢レジデンス",
  tagline: "山形県米沢市 — 上質な暮らし、ここに。",
  description:
    "山形県米沢市に誕生する全50戸12階建ての高級マンション。上杉の城下町が育んだ歴史と自然が、あなたの日常を彩ります。",
  address: "山形県米沢市中央1丁目1番地",
  access: "JR奥羽本線「米沢」駅 徒歩5分",
  tel: "0238-00-0000",
  floors: 12,
  units: 50,
  completion: "2026年3月（予定）",

  floors_guide: [
    {
      range: "1F – 3F",
      label: "LOBBY & AMENITIES",
      labelJa: "エントランス・共用施設",
      color: "#c9a84c",
      rooms: ["コンシェルジュロビー", "ラウンジ", "フィットネス", "宅配ボックス"],
      description:
        "洗練されたエントランスと共用施設。24時間対応のコンシェルジュが居住者をサポートします。",
      image: "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?w=800",
    },
    {
      range: "4F – 7F",
      label: "STANDARD RESIDENCE",
      labelJa: "スタンダードレジデンス",
      color: "#e8eef7",
      rooms: ["1LDK〜2LDK", "全36戸", "南向き角部屋あり", "宅配ボックス直通"],
      description:
        "機能美を追求したスタンダードタイプ。米沢の四季を感じるバルコニーと開放的な間取りが特徴です。",
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
    },
    {
      range: "8F – 12F",
      label: "PREMIUM SUITE",
      labelJa: "プレミアムスイート",
      color: "#c9a84c",
      rooms: ["3LDK〜4LDK", "全14戸", "パノラマビュー", "露天風呂付きペントハウス"],
      description:
        "吾妻連峰を望む最上階スイート。吹き抜けの天井高と専用テラスが、特別な住環境を創出します。",
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800",
    },
  ],

  amenities: [
    {
      title: "コンシェルジュ",
      desc: "24時間対応",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400",
    },
    {
      title: "フィットネスジム",
      desc: "最新設備完備",
      image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400",
    },
    {
      title: "地下駐車場",
      desc: "全戸1台確保",
      image: "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?w=400",
    },
    {
      title: "全館Wi-Fi",
      desc: "1Gbps光回線",
      image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=400",
    },
    {
      title: "オートロック",
      desc: "顔認証対応",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400",
    },
    {
      title: "屋上庭園",
      desc: "季節の草花",
      image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400",
    },
    {
      title: "ワークラウンジ",
      desc: "個室あり",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400",
    },
    {
      title: "大浴場",
      desc: "温泉水使用",
      image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400",
    },
  ],

  location: [
    { name: "JR米沢駅", time: "徒歩5分", category: "交通" },
    { name: "上杉神社", time: "徒歩10分", category: "観光" },
    { name: "米沢市役所", time: "徒歩8分", category: "行政" },
    { name: "米沢中央病院", time: "徒歩12分", category: "医療" },
    { name: "イオン米沢店", time: "車5分", category: "商業" },
    { name: "山形大学工学部", time: "徒歩15分", category: "教育" },
  ],

  concept: {
    title: "上杉の城下町に、\n新たな住まいの形を。",
    body: `米沢は上杉謙信公の遺風を受け継ぐ城下町。
四季折々の美しさ——春の桜並木、夏の青田、秋の紅葉、冬の銀世界——が、
日常のすぐそこに広がります。
YONEZAWA RESIDENCEは、この豊かな自然と歴史の中に、
現代の上質な暮らしを実現します。`,
  },

  seo: {
    title: "YONEZAWA RESIDENCE | 山形県米沢市の高級マンション",
    description:
      "山形県米沢市に誕生する12階建て全50戸のプレミアムマンション。JR米沢駅徒歩5分、上杉神社も近い閑静な立地。コンシェルジュ・フィットネス・大浴場完備。",
    ogImage: "/og-image.jpg",
    canonical: "https://yonezawa-residence.com",
  },
};
