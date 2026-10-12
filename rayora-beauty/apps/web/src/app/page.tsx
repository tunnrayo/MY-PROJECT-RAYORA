import type { Metadata } from "next";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import ProductImage from "@/components/ProductImage";
import { getBanners, getCategories, getProducts, type Product } from "@/lib/api";
import { formatKobo } from "@/lib/format";

export const metadata: Metadata = {
  title: { absolute: "Rayora Beauty | Beauty That Feels Like You" },
  description:
    "Discover skincare, makeup, body care and fragrance at Rayora Beauty. Find beauty essentials made for every skin tone and every kind of glow.",
  openGraph: {
    title: "Rayora Beauty | Beauty That Feels Like You",
    description: "Skincare, makeup, body care and fragrance made to celebrate every skin tone.",
    type: "website",
  },
};

const unique = (list: Product[]) => list.filter((p, i) => list.findIndex((x) => x.id === p.id) === i);

const benefits = [
  { title: "Quality", text: "Beauty products selected with quality and everyday use in mind." },
  { title: "Affordable", text: "Beautiful products without unnecessary luxury markups." },
  { title: "Easy ordering", text: "Shop online and order with ease." },
  { title: "Delivery", text: "Delivery across Nigeria. Your exact delivery fee is shown at checkout once you choose your state." },
];

const eyebrow = "text-xs font-medium uppercase tracking-[0.4em] text-rose-dark";

export default async function HomePage() {
  const [cats, featured, best, fresh, banners] = await Promise.all([
    getCategories(),
    getProducts({ flag: "featured", limit: 8 }),
    getProducts({ flag: "best", limit: 8 }),
    getProducts({ flag: "new", limit: 8 }),
    getBanners(),
  ]);

  // One real product photo per category, taken from the products already in that category
  const categoryList = cats.data ?? [];
  const categoryProducts = await Promise.all(
    categoryList.map((c) => getProducts({ category: c.slug, limit: 6, sort: "popular" }))
  );
  const categoryImage = (i: number) => categoryProducts[i]?.data?.items.find((p) => p.imageUrl)?.imageUrl ?? null;

  const pool = unique([...(featured.data?.items ?? []), ...(best.data?.items ?? []), ...(fresh.data?.items ?? [])]);
  // Products that have photos come first so the visuals use real imagery
  const ranked = [...pool.filter((p) => p.imageUrl), ...pool.filter((p) => !p.imageUrl)];
  const favourites = unique([...(featured.data?.items ?? []), ...(best.data?.items ?? []), ...(fresh.data?.items ?? [])]).slice(0, 4);

  const [heroA, heroB, heroC] = ranked;
  const editorial = ranked[3] ?? ranked[0];
  const promo = ranked[4] ?? ranked[1] ?? ranked[0];

  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  const whatsappHref = whatsapp
    ? `https://wa.me/${whatsapp}?text=${encodeURIComponent("Hello Rayora, I need help finding the right products.")}`
    : null;

  return (
    <>
      {banners[0] && (
        <Link href={banners[0].linkUrl} className="block bg-espresso px-4 py-2.5 text-center text-xs uppercase tracking-[0.18em] text-ivory">
          <strong className="font-medium">{banners[0].title}</strong>
          {banners[0].subtitle && <span className="hidden sm:inline"> · {banners[0].subtitle}</span>}
        </Link>
      )}

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-b from-nude/60 to-cream">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-12 sm:px-6 md:grid-cols-2 md:py-20 lg:gap-16">
          <div className="order-1">
            <p className={`${eyebrow} anim-fade-up`}>Rayora Beauty</p>
            <h1 className="anim-fade-up delay-1 mt-5 text-[2.9rem] font-semibold leading-[1.02] sm:text-6xl lg:text-7xl">
              Beauty That Feels <em className="font-serif italic text-rose-dark">Like You.</em>
            </h1>
            <p className="anim-fade-up delay-2 mt-6 max-w-md text-base leading-relaxed text-cocoa sm:text-lg">
              Skincare, makeup, body care and fragrance made to celebrate every skin tone, every mood and every kind of beauty.
            </p>
            <div className="anim-fade-up delay-3 mt-8 flex flex-wrap gap-3">
              <Link href="/shop" className="btn-primary">Shop Now</Link>
              <Link href="#collections" className="btn-secondary">Explore Collection</Link>
            </div>
          </div>

          <div className="order-2 relative mx-auto h-[26rem] w-full max-w-md sm:h-[32rem] md:max-w-none lg:h-[36rem]">
            <div className="anim-reveal absolute right-0 top-0 h-[82%] w-[64%] overflow-hidden rounded-t-[999px] rounded-b-3xl shadow-xl">
              {heroA ? (
                <ProductImage fill priority name={heroA.name} category={heroA.categoryName} imageUrl={heroA.imageUrl} />
              ) : (
                <div className="h-full w-full bg-blush" />
              )}
            </div>
            <div className="anim-reveal delay-2 absolute bottom-2 left-0 h-[46%] w-[44%] overflow-hidden rounded-3xl border-4 border-cream shadow-lg">
              {heroB ? (
                <ProductImage fill name={heroB.name} category={heroB.categoryName} imageUrl={heroB.imageUrl} />
              ) : (
                <div className="h-full w-full bg-nude" />
              )}
            </div>
            <div className="anim-reveal delay-3 absolute left-[6%] top-[6%] h-24 w-24 overflow-hidden rounded-full border-4 border-cream shadow-md sm:h-32 sm:w-32">
              {heroC ? (
                <ProductImage fill name={heroC.name} category={heroC.categoryName} imageUrl={heroC.imageUrl} />
              ) : (
                <div className="h-full w-full bg-blush" />
              )}
            </div>
            <span aria-hidden="true" className="absolute bottom-16 right-2 h-24 w-24 rounded-full border border-gold/70 sm:h-32 sm:w-32" />
            {heroA && (
              <Link
                href={`/product/${heroA.slug}`}
                className="anim-fade-up delay-4 absolute bottom-0 right-0 max-w-[60%] rounded-2xl bg-ivory/95 px-4 py-3 text-xs shadow-md transition hover:-translate-y-0.5"
              >
                <span className="block text-[10px] uppercase tracking-[0.25em] text-rose-dark">{heroA.categoryName}</span>
                <span className="mt-0.5 block font-medium">{heroA.name}</span>
                <span className="text-cocoa">{formatKobo(heroA.priceKobo)}</span>
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* BRAND INTRODUCTION */}
      <section className="mx-auto max-w-3xl px-5 py-20 text-center sm:py-28">
        <span aria-hidden="true" className="mx-auto block h-px w-14 bg-gold" />
        <h2 className="mt-8 text-3xl font-medium leading-snug sm:text-5xl">Colour, care and scent for every kind of beauty.</h2>
        <p className="mx-auto mt-6 max-w-xl leading-relaxed text-cocoa">
          Discover carefully selected beauty essentials made for your everyday glow, from skincare and body care to makeup and fragrance.
        </p>
      </section>

      {/* SHOP BY CATEGORY */}
      <section id="collections" className="mx-auto max-w-7xl scroll-mt-28 px-5 sm:px-6" aria-labelledby="cat-heading">
        <div className="text-center">
          <p className={eyebrow}>Collections</p>
          <h2 id="cat-heading" className="mt-3 text-4xl font-semibold sm:text-5xl">Shop By Category</h2>
        </div>
        {categoryList.length > 0 ? (
          <ul className="mt-10 grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
            {categoryList.map((c, i) => (
              <li key={c.slug}>
                <Link href={`/${c.slug}`} className="group block">
                  <div className="relative aspect-[3/4] overflow-hidden rounded-t-[999px] rounded-b-2xl bg-nude">
                    <div className="h-full w-full transition-transform duration-700 group-hover:scale-105">
                      <ProductImage fill name={c.name} category="Collection" imageUrl={categoryImage(i)} />
                    </div>
                    <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-espresso/60 to-transparent px-3 pb-4 pt-12 text-center text-xs uppercase tracking-[0.3em] text-ivory">
                      {c.productCount} {c.productCount === 1 ? "product" : "products"}
                    </span>
                  </div>
                  <h3 className="mt-4 text-center font-serif text-2xl font-semibold transition-colors group-hover:text-rose-dark">{c.name}</h3>
                  <p className="mx-auto mt-1 max-w-[16rem] text-center text-xs leading-relaxed text-cocoa sm:text-sm">{c.description}</p>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-6 text-center text-cocoa">Our categories are taking a moment to load. Please refresh the page.</p>
        )}
      </section>

      {/* BEAUTY FAVORITES */}
      {favourites.length > 0 && (
        <section className="mx-auto max-w-7xl px-5 pt-24 sm:px-6" aria-labelledby="fav-heading">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className={eyebrow}>Loved right now</p>
              <h2 id="fav-heading" className="mt-3 text-4xl font-semibold sm:text-5xl">Beauty Favorites</h2>
            </div>
            <Link href="/shop" className="btn-secondary">Shop All Products</Link>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4">
            {favourites.map((p) => (
              <ProductCard key={p.id} product={p} quickAdd />
            ))}
          </div>
        </section>
      )}

      {/* EDITORIAL */}
      <section className="mx-auto max-w-7xl px-5 pt-28 sm:px-6">
        <div className="grid items-center gap-10 md:grid-cols-2 lg:gap-20">
          <div className="relative mx-auto w-full max-w-md md:max-w-none">
            <div className="aspect-[4/5] overflow-hidden rounded-t-[999px] rounded-b-3xl bg-nude shadow-xl">
              {editorial ? (
                <ProductImage fill name={editorial.name} category={editorial.categoryName} imageUrl={editorial.imageUrl} />
              ) : (
                <div className="h-full w-full bg-blush" />
              )}
            </div>
            <span aria-hidden="true" className="absolute -bottom-4 -right-2 h-28 w-28 rounded-full border border-gold/70" />
          </div>
          <div>
            <p className={eyebrow}>The Rayora way</p>
            <h2 className="mt-4 text-4xl font-semibold leading-tight sm:text-6xl">
              Your Glow, <em className="font-serif italic text-rose-dark">Your Rules.</em>
            </h2>
            <p className="mt-6 max-w-md leading-relaxed text-cocoa">
              From everyday essentials to products for your special moments, Rayora brings beauty closer to you.
            </p>
            <Link href="/about" className="btn-primary mt-8">Discover Rayora</Link>
          </div>
        </div>
      </section>

      {/* WHY RAYORA */}
      <section className="mx-auto max-w-7xl px-5 pt-28 sm:px-6" aria-labelledby="why-heading">
        <div className="text-center">
          <p className={eyebrow}>Our promise</p>
          <h2 id="why-heading" className="mt-3 text-4xl font-semibold sm:text-5xl">Why Rayora?</h2>
        </div>
        <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((b, i) => (
            <li key={b.title} className="border-t border-gold/60 pt-5">
              <span className="font-serif text-3xl text-gold" aria-hidden="true">0{i + 1}</span>
              <h3 className="mt-2 font-sans text-sm font-semibold uppercase tracking-[0.25em]">{b.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-cocoa">{b.text}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* PROMOTIONAL BANNER */}
      <section className="mx-auto max-w-7xl px-5 pt-28 sm:px-6">
        <div className="relative overflow-hidden rounded-[2rem] bg-espresso text-ivory">
          <span aria-hidden="true" className="absolute -left-16 -top-16 h-56 w-56 rounded-full border border-gold/40" />
          <span aria-hidden="true" className="absolute -bottom-20 left-1/3 h-64 w-64 rounded-full bg-cocoa/40" />
          <div className="relative grid items-center gap-8 p-8 sm:p-12 md:grid-cols-[1.3fr_1fr] lg:p-16">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-gold">Rayora Beauty</p>
              <h2 className="mt-4 text-4xl font-semibold leading-tight text-ivory sm:text-5xl lg:text-6xl">
                Your Beauty. Your Glow. Your Rayora.
              </h2>
              <p className="mt-4 text-ivory/80">Find something made for you.</p>
              <Link href="/shop" className="mt-8 inline-flex min-h-11 items-center justify-center rounded-full bg-ivory px-7 text-sm font-medium uppercase tracking-wider text-espresso transition duration-300 hover:-translate-y-0.5 hover:bg-blush">
                Shop Rayora
              </Link>
            </div>
            <div className="mx-auto h-72 w-56 overflow-hidden rounded-t-[999px] rounded-b-3xl border border-gold/50 sm:h-80 sm:w-64">
              {promo ? (
                <ProductImage fill name={promo.name} category={promo.categoryName} imageUrl={promo.imageUrl} />
              ) : (
                <div className="h-full w-full bg-cocoa" />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* WHATSAPP */}
      <section className="mx-auto max-w-4xl px-5 pt-28 text-center sm:px-6">
        <h2 className="text-4xl font-semibold sm:text-5xl">Need Help Finding Your Glow?</h2>
        <p className="mx-auto mt-4 max-w-lg text-cocoa">Talk to Rayora and let us help you find what you are looking for.</p>
        {whatsappHref ? (
          <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="btn-primary mt-8">Chat With Rayora</a>
        ) : (
          <Link href="/contact" className="btn-primary mt-8">Chat With Rayora</Link>
        )}
      </section>
    </>
  );
}
