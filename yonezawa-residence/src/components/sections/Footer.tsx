import { siteConfig } from "@/config/site.config";

export default function Footer() {
  return (
    <footer className="bg-[#1a1a1a] border-t border-white/10 pt-16 pb-20 md:py-16 px-8 md:px-16">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-3 gap-10 mb-12">
          <div>
            <p className="font-cinzel text-brand-gold text-lg tracking-widest mb-3">
              YONEZAWA<br />RESIDENCE
            </p>
            <p className="font-noto text-white/50 text-xs leading-relaxed">
              {siteConfig.tagline}
            </p>
          </div>

          <div>
            <p className="font-cinzel text-white/40 text-xs tracking-widest mb-4">ACCESS</p>
            <p className="font-noto text-white/80 text-sm mb-1">{siteConfig.address}</p>
            <p className="font-inter text-white/40 text-xs">{siteConfig.access}</p>
          </div>

          <div>
            <p className="font-cinzel text-white/40 text-xs tracking-widest mb-4">CONTACT</p>
            <p className="font-noto text-brand-gold text-lg mb-1">{siteConfig.tel}</p>
            <p className="font-inter text-white/40 text-xs">受付時間: 平日 10:00 – 18:00</p>
            <a
              href="#contact"
              className="inline-block mt-4 px-5 py-2.5 border border-brand-gold text-brand-gold font-cinzel text-xs tracking-widest rounded-md hover:bg-brand-gold hover:text-[#1a1a1a] transition-all duration-300"
            >
              CONTACT US
            </a>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-inter text-white/30 text-xs">
            © 2026 YONEZAWA RESIDENCE. All rights reserved.
          </p>
          <p className="font-noto text-white/30 text-xs">
            {siteConfig.completion} · {siteConfig.floors}階建 · 全{siteConfig.units}戸
          </p>
        </div>
      </div>
    </footer>
  );
}
