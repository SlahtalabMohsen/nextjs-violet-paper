"use client";
import { useLang } from "../ui/LangContext";
export default function AboutPage() {
  const { lang } = useLang();
  return (
    <div className="min-h-screen p-6 sm:p-10">
      <div className="max-w-5xl mx-auto glass rounded-2xl p-6 text-center">
        <h1 className="text-3xl font-semibold mb-3">
          {lang === "fa" ? "درباره" : "About"}
        </h1>
        <p className="opacity-85 mb-6">
          {lang === "fa"
            ? "ویولت پیپر یک میکروبلاگ الهام‌گرفته از کاغذ با رنگ‌های بنفش و زرد است."
            : "Violet Paper is a purple-and-yellow, paper-inspired micro blog."}
        </p>
        <p className="opacity-90">
          {lang === "fa"
            ? "ساخته شده با 💜 توسط سلاحتالب محسن"
            : "Made with 💜 by Slahtalab Mohsen"}
        </p>
      </div>
    </div>
  );
}
