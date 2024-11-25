import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function nameToKey(name: string): string {
	return name.toLowerCase().replaceAll(" ", ".");
}

export const puppyData = [
	["Green Bean", ""],
	["Yam", ""],
	["Mashed Potato", ""],
	["Mac and Cheese", "https://buy.stripe.com/test_dR68ydgey2049zycMU"],
	["Cranberry Sauce", ""],
	["Stuffing", ""],
	["Gobbler", ""],
	["Cornbread", ""],
	["Cider", ""],
	["Acorn", ""],
	["Wishbone", ""],
	["Gravy", "https://buy.stripe.com/test_fZe5m18M6awA6nmaEI"],
	["Pumpkin Pie", ""],
	["Clove", ""],
	["Sweet Potato", ""],
] as const;
