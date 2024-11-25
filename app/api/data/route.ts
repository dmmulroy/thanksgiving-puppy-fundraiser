export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";
import { nameToKey, puppyData, zrangeToObject } from "@/lib/utils";

const redis = Redis.fromEnv();

const puppyNames = puppyData.map(([name]) => name);

export async function GET(_req: Request) {
	try {
		const puppyVotesV2 = await redis
			.zrange("votes", 0, -1, {
				withScores: true,
			})
			.then(zrangeToObject)
			.catch(console.error);

		console.log({ puppyVotesV2 });
		const puppyVotes = await Promise.all(
			puppyNames.map(async (name) => {
				const key = nameToKey(name);
				const votes = (await redis.zscore("votes", key)) ?? 0;

				return [key, votes] as const;
			}),
		);

		const votesByName = Object.fromEntries(puppyVotes);

		console.log({ votesByName });

		return NextResponse.json({ votesByName });
	} catch (err) {
		console.error("Error fetching vote data:", err);
		return NextResponse.json(
			{ error: "Error fetching vote data" },
			{ status: 500 },
		);
	}
}
