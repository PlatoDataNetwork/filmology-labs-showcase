import { cn } from "@/lib/utils";

import hoodieBase from "@/assets/merch/hoodie.png";
import hatBase from "@/assets/merch/crew-hat.png";
import logoWhite from "@/assets/thin-logo-white.png";

type BrandedSize = "card" | "detail" | "cart";

type BrandingConfig = {
  baseSrc: string;
  logoSrc: string;
  logoAlt: string;
  logoClassBySize: Record<BrandedSize, string>;
};

const BRANDING_BY_HANDLE: Record<string, BrandingConfig> = {
  "filmology-labs-hoodie": {
    baseSrc: hoodieBase,
    logoSrc: logoWhite,
    logoAlt: "Filmology Labs logo",
    logoClassBySize: {
      // Center chest placement
      card: "left-1/2 top-[46%] w-[46%] -translate-x-1/2 -translate-y-1/2",
      detail: "left-1/2 top-[46%] w-[46%] -translate-x-1/2 -translate-y-1/2",
      cart: "left-1/2 top-[50%] w-[60%] -translate-x-1/2 -translate-y-1/2",
    },
  },
  "filmology-labs-baseball-cap": {
    baseSrc: hatBase,
    logoSrc: logoWhite,
    logoAlt: "Filmology Labs logo",
    logoClassBySize: {
      // Front panel placement
      card: "left-[56%] top-[54%] w-[52%] -translate-x-1/2 -translate-y-1/2",
      detail: "left-[56%] top-[54%] w-[52%] -translate-x-1/2 -translate-y-1/2",
      cart: "left-[56%] top-[54%] w-[62%] -translate-x-1/2 -translate-y-1/2",
    },
  },
};

export function BrandedMerchImage({
  handle,
  alt,
  fallbackSrc,
  size = "card",
  className,
  imageClassName,
}: {
  handle?: string;
  alt: string;
  fallbackSrc?: string;
  size?: BrandedSize;
  className?: string;
  imageClassName?: string;
}) {
  const cfg = handle ? BRANDING_BY_HANDLE[handle] : undefined;

  if (!cfg) {
    if (!fallbackSrc) return null;
    return (
      <img
        src={fallbackSrc}
        alt={alt}
        className={imageClassName}
        loading="lazy"
      />
    );
  }

  return (
    <div className={cn("relative w-full h-full", className)}>
      <img
        src={cfg.baseSrc}
        alt={alt}
        className={cn("w-full h-full object-contain", imageClassName)}
        loading="lazy"
      />
      <img
        src={cfg.logoSrc}
        alt={cfg.logoAlt}
        className={cn(
          "absolute pointer-events-none select-none transition-transform duration-300",
          cfg.logoClassBySize[size]
        )}
        loading="lazy"
      />
    </div>
  );
}
