"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useVoting } from "../hooks/useVoting";
import { v4 as uuidv4 } from "uuid";
import { puppyData } from "@/lib/utils";

export function PuppyVoting() {
	const { getVotesForName, getTotalVotes } = useVoting();
	const [showThankYou, setShowThankYou] = useState(false);

	useEffect(() => {
		const paymentId = localStorage.getItem("paymentId");
		if (paymentId) {
			setShowThankYou(true);
			localStorage.removeItem("paymentId");
			setTimeout(() => setShowThankYou(false), 3000);
		}
	}, []);

	const handleVote = (link: string) => {
		const paymentId = uuidv4();
		localStorage.setItem("paymentId", paymentId);
		window.open(
			`${link}?client_reference_id=${paymentId}`,
			"_blank",
			"noopener,noreferrer",
		);
	};

	const totalVotes = getTotalVotes();

	return (
		<>
			<div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
				<div className="space-y-8">
					<section>
						<h2 className="text-3xl font-semibold text-amber-800 mb-4">
							Fundraising Progress
						</h2>
						<div className="bg-white p-6 rounded-lg shadow-lg">
							<Progress
								value={Math.min((Math.min(totalVotes, 2000) / 2000) * 100, 100)}
								className="mb-4"
							/>
							<p className="text-center text-amber-700 mb-4">
								${totalVotes} raised of $2,500 goal
							</p>
						</div>
					</section>
				</div>

				<div>
					<section className="mb-12">
						<h2 className="text-3xl font-semibold text-amber-800 mb-4">
							Vote for Puppy Names
						</h2>
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
							{puppyData
								.toSorted(
									(a, b) => getVotesForName(b[0]) - getVotesForName(a[0]),
								)
								.map(([name, link]) => (
									<div key={name} className="bg-white p-6 rounded-lg shadow-lg">
										<h3 className="text-2xl font-semibold text-amber-800 mb-2">
											{name}
										</h3>
										<p className="text-amber-700 mb-4">
											Votes: {getVotesForName(name)}
										</p>
										<Button
											className="w-full bg-amber-600 hover:bg-amber-700 text-white"
											onClick={() => handleVote(link)}
										>
											Vote
										</Button>
									</div>
								))}
						</div>
					</section>
				</div>
			</div>

			{showThankYou && (
				<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
					<div className="bg-white p-6 rounded-lg shadow-lg">
						<h3 className="text-xl font-semibold text-amber-800 mb-2">
							Thank you for your vote!
						</h3>
						<p className="text-amber-700">
							Your support helps our rescue efforts.
						</p>
					</div>
				</div>
			)}
		</>
	);
}
