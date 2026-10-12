"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const categories = [
  { href: "/skincare", label: "Skincare" },
  { href: "/makeup", label: "Makeup" },
  { href: "/body-care", label: "Body Care" },
  { href: "/fragrance", label: "Fragrance" },
];

const icon = "h-5 w-5";
const SearchIcon = () => (
  <svg className={icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
    <circle cx="11" cy="11" r="6.5" /><path d="m20 20-4-4" strokeLinecap="round" />
  </svg>
);
const UserIcon = () => (
  <svg className={icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
    <circle cx="12" cy="8.5" r="3.8" /><path d="M4.5 20c.8-3.6 3.7-5.5 7.5-5.5s6.7 1.9 7.5 5.5" strokeLinecap="round" />
  </svg>
);
const BagIcon = () => (
  <svg className={icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
    <path d="M5 8h14l-1 12H6L5 8Z" strokeLinejoin="round" /><path d="M9 8V6.5a3 3 0 0 1 6 0V8" strokeLinecap="round" />
  </svg>
);

export default function Header({ cartCount, userName }: { cartCount: number; userName: string | null }) {
  const [menu, setMenu] = useState(false);
  const [search, setSearch] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);
  const accountHref = userName ? "/account" : "/login";
  const accountLabel = userName ? `Account, ${userName.split(" ")[0]}` : "Log in";

  useEffect(() => {
    if (search) searchRef.current?.focus();
  }, [search]);

  const navLink = "text-[13px] uppercase tracking-[0.18em] transition hover:text-rose-dark";
  const iconBtn = "flex h-11 w-11 items-center justify-center rounded-full transition hover:bg-blush/60";

  return (
    <header className="sticky top-0 z-40 border-b border-nude bg-ivory/95 backdrop-blur" onKeyDown={(e) => e.key === "Escape" && setSearch(false)}>
      <div className="mx-auto grid max-w-7xl grid-cols-[1fr_auto_1fr] items-center gap-2 px-3 py-2 sm:px-6">
        <div className="flex items-center">
          <button
            type="button"
            className={`${iconBtn} md:hidden`}
            aria-label={menu ? "Close menu" : "Open menu"}
            aria-expanded={menu}
            aria-controls="mobile-menu"
            onClick={() => setMenu((v) => !v)}
          >
            <span className="relative block h-3.5 w-6" aria-hidden="true">
              <span className={`absolute left-0 h-px w-6 bg-charcoal transition-all ${menu ? "top-1.5 rotate-45" : "top-0"}`} />
              <span className={`absolute left-0 top-1.5 h-px w-6 bg-charcoal transition-opacity ${menu ? "opacity-0" : ""}`} />
              <span className={`absolute left-0 h-px w-6 bg-charcoal transition-all ${menu ? "top-1.5 -rotate-45" : "top-3"}`} />
            </span>
          </button>

          <nav aria-label="Main" className="hidden items-center gap-7 md:flex">
            <Link href="/" className={navLink}>Home</Link>
            <Link href="/shop" className={navLink}>Shop</Link>
            <div className="group relative">
              <Link href="/#collections" className={navLink}>Categories</Link>
              <ul className="invisible absolute left-0 top-full z-50 w-44 translate-y-1 rounded-2xl border border-nude bg-ivory p-2 opacity-0 shadow-lg transition group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                {categories.map((c) => (
                  <li key={c.href}>
                    <Link href={c.href} className="block rounded-xl px-3 py-2 text-sm hover:bg-blush/50">{c.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <Link href="/about" className={navLink}>About</Link>
            <Link href="/contact" className={navLink}>Contact</Link>
          </nav>
        </div>

        <Link href="/" aria-label="Rayora Beauty, home" className="px-1 text-center">
          <span className="block font-serif text-[1.65rem] font-semibold leading-none tracking-[0.3em] text-charcoal sm:text-3xl">
            RAYORA
          </span>
          <span className="mt-1 flex items-center justify-center gap-2 text-[9px] uppercase tracking-[0.55em] text-cocoa sm:text-[10px]">
            <span className="h-px w-3 bg-gold sm:w-5" aria-hidden="true" />
            Beauty
            <span className="h-px w-3 bg-gold sm:w-5" aria-hidden="true" />
          </span>
        </Link>

        <div className="flex items-center justify-end">
          <button type="button" className={iconBtn} aria-label="Search products" aria-expanded={search} onClick={() => setSearch((v) => !v)}>
            <SearchIcon />
          </button>
          <Link href={accountHref} className={iconBtn} aria-label={accountLabel}>
            <UserIcon />
          </Link>
          <Link href="/cart" className={`${iconBtn} relative`} aria-label={`Cart, ${cartCount} items`}>
            <BagIcon />
            {cartCount > 0 && (
              <span className="absolute right-0.5 top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-rose-dark px-1 text-[10px] text-ivory">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      {search && (
        <form action="/shop" method="get" role="search" className="border-t border-nude bg-ivory">
          <div className="mx-auto flex max-w-3xl items-center gap-2 px-4 py-3">
            <label htmlFor="site-search" className="sr-only">Search products</label>
            <input
              ref={searchRef}
              id="site-search"
              name="q"
              type="search"
              placeholder="Search serums, lipsticks, body butter..."
              className="h-11 w-full rounded-full border border-nude bg-cream px-5 text-sm placeholder:text-cocoa/60"
            />
            <button type="submit" className="btn-primary px-5">Search</button>
          </div>
        </form>
      )}

      {menu && (
        <nav id="mobile-menu" aria-label="Mobile" className="border-t border-nude bg-ivory md:hidden">
          <ul className="mx-auto max-w-7xl px-5 py-2">
            {[
              { href: "/", label: "Home" },
              { href: "/shop", label: "Shop" },
              ...categories,
              { href: "/about", label: "About" },
              { href: "/contact", label: "Contact" },
              { href: accountHref, label: userName ? "My account" : "Log in or create account" },
            ].map((l) => (
              <li key={l.href + l.label}>
                <Link href={l.href} onClick={() => setMenu(false)} className="block border-b border-nude/70 py-3.5 text-[15px] uppercase tracking-[0.14em]">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
