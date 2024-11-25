export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { Redis } from "@upstash/redis";
import { zrangeToObject } from "@/lib/utils";

const redis = Redis.fromEnv();

export async function GET(_req: Request) {
	try {
		const votesByName = await redis
			.zrange("votes", 0, -1, {
				withScores: true,
			})
			.then(zrangeToObject)
			.catch(console.error);

		delete votesByName.total;

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
