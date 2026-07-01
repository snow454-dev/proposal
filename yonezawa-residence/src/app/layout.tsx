import type { Metadata } from "next";
import { Cinzel_Decorative, Noto_Serif_JP, Inter } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/site.config";

const cinzel = Cinzel_Decorative({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-cinzel",
  display: "swap",
});

const noto = Noto_Serif_JP({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-noto",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: siteConfig.seo.title,
  description: siteConfig.seo.description,
  metadataBase: new URL(siteConfig.seo.canonical),
  alternates: { canonical: "/" },
  openGraph: {
    title: siteConfig.seo.title,
    description: siteConfig.seo.description,
    url: siteConfig.seo.canonical,
    siteName: siteConfig.name,
    images: [{ url: siteConfig.seo.ogImage, width: 1200, height: 630 }],
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.seo.title,
    description: siteConfig.seo.description,
    images: [siteConfig.seo.ogImage],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja" className={`${cinzel.variable} ${noto.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "RealEstateAgent",
              name: siteConfig.name,
              description: siteConfig.description,
              address: {
                "@type": "PostalAddress",
                addressLocality: "米沢市",
                addressRegion: "山形県",
                addressCountry: "JP",
                streetAddress: siteConfig.address,
              },
              telephone: siteConfig.tel,
            }),
          }}
        />
      </head>
      <body className="font-inter antialiased bg-brand-black text-brand-ice">
        {children}
      </body>
    </html>
  );
}
