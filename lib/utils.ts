import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function nameToKey(name: string): string {
	return name.toLowerCase().replaceAll(" ", ".");
}
