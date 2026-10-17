import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/** Merge Tailwind classes, the same helper Entr-Core uses. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
