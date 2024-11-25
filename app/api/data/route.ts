import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

const puppyNames = [
	"Green Bean",
	"Yam",
	"Mashed Potato",
	"Mac and Cheese",
	"Cranberry Sauce",
	"Stuffing",
	"Gobbler",
	"Cornbread",
	"Cider",
	"Acorn",
	"Wishbone",
	"Gravy",
	"Pumpkin Pie",
	"Clove",
	"Sweet Potato",
];

export async function GET(_req: Request) {
	try {
		const total = await redis.zscore("votes", "total");

		const puppyVotes = await Promise.all(
			puppyNames.map(async (name) => {
				const key = name.toLowerCase().replaceAll(" ", ".");
				const votes = (await redis.zscore("votes", key)) ?? 0;

				return [key, votes] as const;
			}),
		);

		const votesByName = Object.fromEntries(puppyVotes);

		return NextResponse.json({ total, votesByName });
	} catch (err) {
		console.error("Error processing webhook:", err);
		return NextResponse.json(
			{ error: "Webhook handler failed" },
			{ status: 500 },
		);
	}
}
