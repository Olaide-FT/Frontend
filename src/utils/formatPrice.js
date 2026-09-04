export function formatPrice(price, options = {}) {
  const {
    currency = "NGN",
    locale = "en-NG",
    maximumFractionDigits = 0,
  } = options;

  if (price === null || price === undefined || price === "") {
    return "Price on request";
  }

  const numericPrice = Number(price);
  if (Number.isNaN(numericPrice)) return "Price on request";

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(numericPrice);
}
