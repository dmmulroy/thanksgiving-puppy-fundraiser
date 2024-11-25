import { NextResponse } from "next/server";
import { headers } from "next/headers";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
	apiVersion: "2024-11-20.acacia",
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: Request) {
	try {
		const body = await req.text();
		const headers = new Headers(req.headers);
		const signature = headers.get("x-stripe-signature") ?? "";
		//const signature = headers().get("stripe-signature") as string;

		let event: Stripe.Event;

		try {
			event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
		} catch (err) {
			console.error("Webhook signature verification failed.", err);
			return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
		}

		// Handle the checkout.session.completed event
		if (event.type === "checkout.session.completed") {
			const session = event.data.object as Stripe.Checkout.Session;

			// Check if this is a payment link by verifying the payment_link property
			if (session.payment_link) {
				console.log(
					"Payment link was successfully paid:",
					session.payment_link,
				);

				console.log("puppy name", session.metadata!.name!);
				console.log("Amount paid:", session.amount_total);
				console.log("Currency:", session.currency);
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
