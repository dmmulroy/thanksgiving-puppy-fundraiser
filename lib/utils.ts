import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function nameToKey(name: string): string {
	return name.toLowerCase().replaceAll(" ", ".");
}

export const fakeData = [
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

export const puppyData = [
	["Sweet Potato", "https://donate.stripe.com/cN2aERclh2pn0Te5ky"],
	["Clove", "https://donate.stripe.com/7sI14hbhd3tr6dybIV"],
	["Pumpkin Pie", "https://donate.stripe.com/aEU28lbhd3trbxS28k"],
	["Wishbone", "https://donate.stripe.com/5kAaER70X7JH6dydR1"],
	["Acorn", "https://donate.stripe.com/bIYfZbbhde85cBW8wG"],
	["Cider", "https://donate.stripe.com/fZefZbdplggddG07sB"],
	["Cornbread", "https://donate.stripe.com/5kA5kxclhd416dydQY"],
	["Gobbler", "https://donate.stripe.com/dR65kx2KHd416dy6ov"],
	["Stuffing", "https://donate.stripe.com/bIYbIV1GD5BzfO86ou"],
	["Cranberry Sauce", "https://donate.stripe.com/fZefZb3OL3tr6dy7sx"],
	["Mac and Cheese", "https://donate.stripe.com/cN25kxetpbZXfO86os"],
	["Mashed Potato", "https://donate.stripe.com/14k28lad9fc945q5kn"],
	["Yam", "https://donate.stripe.com/5kAfZb5WTfc98lGfZ0"],
	["Green Bean", "https://donate.stripe.com/dR6dR3dpld41bxS9AB"],
	["Gravy", "https://donate.stripe.com/cN28wJbhdggdcBW5kk"],
];

export function zrangeToObject(zrangeOutput: unknown[]) {
	// Ensure the array has even length
	if (zrangeOutput.length % 2 !== 0) {
		throw new Error("The input array must have an even number of elements.");
	}

	// Pair keys and values, then convert to an object
	const result = Object.fromEntries(
		Array.from({ length: zrangeOutput.length / 2 }, (_, i) => {
			const key = zrangeOutput[i * 2];
			const value = zrangeOutput[i * 2 + 1];
			return [key, value];
		}),
	);

	return result;
}
