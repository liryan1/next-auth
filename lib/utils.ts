import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function logStack(error: unknown) {
  console.error("Error:", (error as { stack: string }).stack);
}
