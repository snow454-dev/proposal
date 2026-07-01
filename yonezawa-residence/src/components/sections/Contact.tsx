"use client";
import { useRef, useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, useInView, AnimatePresence } from "framer-motion";
import SectionLabel from "@/components/ui/SectionLabel";

const schema = z.object({
  name: z.string().min(1, "お名前を入力してください"),
  furigana: z.string().min(1, "フリガナを入力してください"),
  email: z.string().email("正しいメールアドレスを入力してください"),
  tel: z.string().optional(),
  floor: z.string().min(1, "希望フロアを選択してください"),
  type: z.string().min(1, "問い合わせ種別を選択してください"),
  message: z.string().min(10, "10文字以上入力してください"),
  consent: z.literal(true, { error: () => ({ message: "同意が必要です" }) }),
});

type FormData = z.infer<typeof schema>;

interface Toast {
  message: string;
  variant: "success" | "error";
}

function ToastNotification({ toast, onClose }: { toast: Toast; onClose: () => void }) {
  return (
    <motion.div
      className={`fixed bottom-6 right-6 z-[9990] flex items-start gap-3 px-5 py-4 rounded-lg max-w-sm shadow-2xl ${
        toast.variant === "success"
          ? "bg-white border border-[#c9a84c]/60 text-[#c9a84c]"
          : "bg-white border border-red-400/60 text-red-500"
      }`}
      initial={{ opacity: 0, y: 24, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 16, scale: 0.95 }}
      transition={{ duration: 0.3 }}
    >
      <span className="mt-px text-base flex-shrink-0">
        {toast.variant === "success" ? "✓" : "✕"}
      </span>
      <div className="flex-1">
        <p className="font-noto text-sm leading-relaxed text-[#1a1a1a]">{toast.message}</p>
      </div>
      <button
        onClick={onClose}
        className="ml-2 opacity-50 hover:opacity-100 transition-opacity text-current font-inter text-xs flex-shrink-0"
      >
        ✕
      </button>
    </motion.div>
  );
}

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState<Toast | null>(null);
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = useCallback((message: string, variant: "success" | "error") => {
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    setToast({ message, variant });
    toastTimerRef.current = setTimeout(() => setToast(null), 5000);
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(`status ${res.status}`);
      reset();
      showToast("お問い合わせを受け付けました。2営業日以内にご連絡いたします。", "success");
    } catch (err) {
      console.error("Contact submit error:", err);
      showToast("送信に失敗しました。時間をおいて再度お試しください。", "error");
    } finally {
      setSubmitting(false);
    }
  };

  const inputCls =
    "w-full bg-white border border-[#e8e3db] rounded-md px-4 py-3 font-inter text-sm text-[#1a1a1a] placeholder-[#4a4a4a]/30 focus:outline-none focus:border-[#c9a84c]/60 transition-colors";
  const labelCls = "block font-noto text-[#1a1a1a] text-xs mb-1.5";
  const errorCls = "mt-1 text-[11px] text-red-500 font-inter";

  return (
    <>
      <AnimatePresence>
        {toast && (
          <ToastNotification toast={toast} onClose={() => setToast(null)} />
        )}
      </AnimatePresence>

      <section ref={ref} id="contact" className="py-32 px-8 md:px-16 bg-[#f8f6f2]">
        <div className="max-w-3xl mx-auto">
          <SectionLabel en="CONTACT" ja="お問い合わせ" light />

          <motion.h2
            className="font-noto text-[#1a1a1a] text-3xl md:text-4xl mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            資料請求・見学のご予約
          </motion.h2>
          <motion.p
            className="font-noto text-[#4a4a4a] mb-12"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            お気軽にお問い合わせください。担当者より2営業日以内にご連絡いたします。
          </motion.p>

          <motion.form
            onSubmit={handleSubmit(onSubmit)}
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-6"
          >
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className={labelCls}>お名前 <span className="text-[#c9a84c]">*</span></label>
                <input {...register("name")} placeholder="山田 太郎" className={inputCls} />
                {errors.name && <p className={errorCls}>{errors.name.message}</p>}
              </div>
              <div>
                <label className={labelCls}>フリガナ <span className="text-[#c9a84c]">*</span></label>
                <input {...register("furigana")} placeholder="ヤマダ タロウ" className={inputCls} />
                {errors.furigana && <p className={errorCls}>{errors.furigana.message}</p>}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className={labelCls}>メールアドレス <span className="text-[#c9a84c]">*</span></label>
                <input {...register("email")} type="email" placeholder="example@mail.com" className={inputCls} />
                {errors.email && <p className={errorCls}>{errors.email.message}</p>}
              </div>
              <div>
                <label className={labelCls}>電話番号 <span className="text-[#4a4a4a]/50">(任意)</span></label>
                <input {...register("tel")} type="tel" placeholder="0238-00-0000" className={inputCls} />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className={labelCls}>希望フロア <span className="text-[#c9a84c]">*</span></label>
                <select {...register("floor")} className={inputCls}>
                  <option value="">選択してください</option>
                  <option value="1-3F">1F – 3F（ロビー・アメニティ）</option>
                  <option value="4-7F">4F – 7F（スタンダード）</option>
                  <option value="8-12F">8F – 12F（プレミアム）</option>
                  <option value="未定">未定</option>
                </select>
                {errors.floor && <p className={errorCls}>{errors.floor.message}</p>}
              </div>
              <div>
                <label className={labelCls}>問い合わせ種別 <span className="text-[#c9a84c]">*</span></label>
                <select {...register("type")} className={inputCls}>
                  <option value="">選択してください</option>
                  <option value="資料請求">資料請求</option>
                  <option value="見学予約">見学予約</option>
                  <option value="価格帯について">価格帯について</option>
                  <option value="その他">その他</option>
                </select>
                {errors.type && <p className={errorCls}>{errors.type.message}</p>}
              </div>
            </div>

            <div>
              <label className={labelCls}>メッセージ <span className="text-[#c9a84c]">*</span></label>
              <textarea
                {...register("message")}
                rows={5}
                placeholder="ご質問・ご要望をご記入ください"
                className={`${inputCls} resize-none`}
              />
              {errors.message && <p className={errorCls}>{errors.message.message}</p>}
            </div>

            <div>
              <label className="flex items-start gap-3 cursor-pointer">
                <input type="checkbox" {...register("consent")} className="mt-1 accent-[#c9a84c]" />
                <span className="font-inter text-xs text-[#4a4a4a] leading-relaxed">
                  個人情報の取り扱いについて同意します。収集した情報はお問い合わせへの返答・資料送付のみに使用し、第三者に提供することはありません。
                </span>
              </label>
              {errors.consent && <p className={errorCls}>{errors.consent.message}</p>}
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-4 rounded-md font-cinzel text-sm tracking-widest text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 hover:opacity-90"
              style={{ backgroundColor: "#c9a84c" }}
            >
              {submitting ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  SENDING...
                </>
              ) : (
                "SEND MESSAGE"
              )}
            </button>
          </motion.form>
        </div>
      </section>
    </>
  );
}
