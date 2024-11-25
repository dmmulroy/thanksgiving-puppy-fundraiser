import { NextResponse } from "next/server";
import { headers } from "next/headers";
import Stripe from "stripe";
import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
	apiVersion: "2024-11-20.acacia",
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: Request) {
	try {
		const body = await req.text();
		const headersList = headers();
		const signature = headersList.get("stripe-signature");

		let event: Stripe.Event;

		try {
			event = stripe.webhooks.constructEvent(body, signature!, webhookSecret);
		} catch (err) {
			console.error("Webhook signature verification failed.", err);
			return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
		}

		if (event.type === "checkout.session.completed") {
			const session = event.data.object as Stripe.Checkout.Session;

			if (session.payment_link) {
				const initalTotalVotes = await redis.zscore("votes", "votes");

				const puppyName = session.metadata?.name ?? "<unknown>";
				const votes = (session.amount_total ?? 0) / 100;

				if (puppyName === "<unknown>") {
					console.error("Puppy name was not included with the stripe metadata");
				}

				const initalPuppyVotes = await redis.zscore("votes", puppyName);
				const updatePuppyVotes = await redis.zincrby("votes", votes, puppyName);

				const updatedTotalVotes = await redis.zincrby("votes", votes, "total");

				console.log({
					puppyName,
					votes,
					initalTotalVotes,
					updatedTotalVotes,
					initalPuppyVotes,
					updatePuppyVotes,
				});
			}
		}

		return NextResponse.json({ received: true });
	} catch (err) {
		console.error("Error processing webhook:", err);
		return NextResponse.json(
			{ error: "Webhook handler failed" },
			{ status: 500 },
		);
	}
}
