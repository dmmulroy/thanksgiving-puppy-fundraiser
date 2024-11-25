import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";
import { nameToKey, puppyData } from "@/lib/utils";

const redis = Redis.fromEnv();

const puppyNames = puppyData.map(([name]) => name);

export async function GET(_req: Request) {
	try {
		const total = await redis.zscore("votes", "total");

		const puppyVotes = await Promise.all(
			puppyNames.map(async (name) => {
				const key = nameToKey(name);
				const votes = (await redis.zscore("votes", key)) ?? 0;

				return [key, votes] as const;
			}),
		);

		const votesByName = Object.fromEntries(puppyVotes);

		console.log({ total, votesByName });

		return NextResponse.json({ total, votesByName });
	} catch (err) {
		console.error("Error fetching vote data:", err);
		return NextResponse.json(
			{ error: "Error fetching vote data" },
			{ status: 500 },
		);
	}
}
