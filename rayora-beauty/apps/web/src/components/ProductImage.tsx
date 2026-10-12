"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  name: string;
  category: string;
  imageUrl: string | null;
  priority?: boolean;
  /** Fill the parent box instead of using the standard 4:5 shape. */
  fill?: boolean;
  className?: string;
};

/** Shows the product photo, or a clean placeholder when there is no photo or it cannot be loaded. */
export default function ProductImage({ name, category, imageUrl, priority = false, fill = false, className = "" }: Props) {
  const [failed, setFailed] = useState(false);
  const ref = useRef<HTMLImageElement>(null);

  // Catches images that failed before the page finished loading
  useEffect(() => {
    const el = ref.current;
    if (el && el.complete && el.naturalWidth === 0) setFailed(true);
  }, [imageUrl]);

  const shape = fill ? "h-full w-full" : "aspect-[4/5] w-full rounded-2xl";
  return (
    <div className={`relative overflow-hidden bg-nude/70 ${shape} ${className}`}>
      {imageUrl && !failed ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          ref={ref}
          src={imageUrl}
          alt={`${name} by Rayora Beauty`}
          loading={priority ? "eager" : "lazy"}
          onError={() => setFailed(true)}
          className="h-full w-full object-cover"
        />
      ) : (
        <div
          role="img"
          aria-label={`${name}, product photo coming soon`}
          className="flex h-full flex-col items-center justify-center p-4 text-center"
        >
          <span className="font-serif text-lg leading-snug text-cocoa">{name}</span>
          <span className="mt-2 text-[10px] uppercase tracking-[0.3em] text-rose-dark">{category}</span>
        </div>
      )}
    </div>
  );
}
