"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MobileNav() {
  const pathname = usePathname();
  const items = [
    { href: "/", icon: "🏠", label: "Home" },
    { href: "/stories", icon: "📚", label: "Stories" },
    { href: "/journal", icon: "🗂️", label: "Journal" },
    { href: "/pen", icon: "✏️", label: "Pen" },
    { href: "/about", icon: "🌱", label: "About" },
  ];
  return (
    <nav className="fixed bottom-3 left-1/2 -translate-x-1/2 z-50 sm:hidden">
      <ul className="glass rounded-full px-3 py-2 flex items-center gap-2">
        {items.map((it) => (
          <li key={it.href}>
            <Link
              href={it.href}
              className={`px-3 py-2 rounded-full ${
                pathname === it.href ? "active-nav" : ""
              }`}
              aria-label={it.label}
            >
              <span className="text-xl" title={it.label}>
                {it.icon}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
