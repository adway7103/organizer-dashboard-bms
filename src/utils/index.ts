import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const baseUrl = "kafsbackend-106f.onrender.com"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date) {
  return date.toLocaleDateString("en-US", { month: "short", day: "2-digit" });
}

export function formatCurrency(symbol: any): any {
  const formattedString = new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: symbol,
    minimumFractionDigits: 0,
  }).format(0);

  const currencySymbol = formattedString.replace(/0/g, "").trim();
  return currencySymbol;
}
