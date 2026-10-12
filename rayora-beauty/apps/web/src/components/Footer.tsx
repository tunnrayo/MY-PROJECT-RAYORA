import Link from "next/link";

export default function Footer() {
  // Uses the WhatsApp number already configured for the shop. Nothing is invented here.
  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  const link = "transition hover:text-gold";

  return (
    <footer className="mt-20 bg-espresso text-ivory">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <p className="font-serif text-3xl font-semibold tracking-[0.28em]">RAYORA</p>
          <p className="mt-1 text-[10px] uppercase tracking-[0.55em] text-gold">Beauty</p>
          <p className="mt-4 max-w-xs font-serif text-xl italic text-ivory/90">Beauty that feels like you.</p>
          <p className="mt-3 max-w-xs text-sm text-ivory/70">
            Skincare, makeup, body care and fragrance, delivered across Nigeria.
          </p>
          {whatsapp && (
            <a
              href={`https://wa.me/${whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex min-h-11 items-center rounded-full border border-ivory/40 px-5 text-sm transition hover:bg-ivory hover:text-espresso"
            >
              Chat on WhatsApp
            </a>
          )}
        </div>

        <nav aria-label="Shop" className="text-sm">
          <p className="text-xs uppercase tracking-[0.3em] text-gold">Shop</p>
          <ul className="mt-4 space-y-2.5 text-ivory/80">
            <li><Link href="/shop" className={link}>Shop all</Link></li>
            <li><Link href="/skincare" className={link}>Skincare</Link></li>
            <li><Link href="/makeup" className={link}>Makeup</Link></li>
            <li><Link href="/body-care" className={link}>Body Care</Link></li>
            <li><Link href="/fragrance" className={link}>Fragrance</Link></li>
          </ul>
        </nav>

        <nav aria-label="Company" className="text-sm">
          <p className="text-xs uppercase tracking-[0.3em] text-gold">Rayora</p>
          <ul className="mt-4 space-y-2.5 text-ivory/80">
            <li><Link href="/#collections" className={link}>Categories</Link></li>
            <li><Link href="/about" className={link}>About</Link></li>
            <li><Link href="/contact" className={link}>Contact</Link></li>
            <li><Link href="/account" className={link}>My account</Link></li>
          </ul>
        </nav>

        <nav aria-label="Help" className="text-sm">
          <p className="text-xs uppercase tracking-[0.3em] text-gold">Help</p>
          <ul className="mt-4 space-y-2.5 text-ivory/80">
            <li><Link href="/faq" className={link}>FAQ</Link></li>
            <li><Link href="/privacy" className={link}>Privacy Policy</Link></li>
            <li><Link href="/terms" className={link}>Terms and Conditions</Link></li>
          </ul>
        </nav>
      </div>
      <p className="border-t border-ivory/15 px-4 py-5 text-center text-xs text-ivory/60">
        © {new Date().getFullYear()} Rayora Beauty. All rights reserved.
      </p>
    </footer>
  );
}
