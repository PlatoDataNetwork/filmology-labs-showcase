import hoodieBranded from "@/assets/merch/hoodie-branded.png";
import hatBranded from "@/assets/merch/crew-hat-branded.png";

const BRANDED_BY_HANDLE: Record<string, string> = {
  "filmology-labs-hoodie": hoodieBranded,
  "filmology-labs-baseball-cap": hatBranded,
};

export function BrandedMerchImage({
  handle,
  alt,
  fallbackSrc,
  className,
  imageClassName,
}: {
  handle?: string;
  alt: string;
  fallbackSrc?: string;
  size?: "card" | "detail" | "cart";
  className?: string;
  imageClassName?: string;
}) {
  const brandedSrc = handle ? BRANDED_BY_HANDLE[handle] : undefined;
  const src = brandedSrc || fallbackSrc;

  if (!src) return null;

  return (
    <img
      src={src}
      alt={alt}
      className={imageClassName ?? className}
      loading="lazy"
    />
  );
}
