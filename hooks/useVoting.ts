import { nameToKey } from "@/lib/utils";
import { useState, useEffect } from "react";

interface VoteCount {
	[key: string]: number;
}

export function useVoting() {
	const [loading, setLoading] = useState<boolean>(false);
	const [votes, setVotes] = useState<VoteCount>(() => {
		if (typeof window !== "undefined") {
			const savedVotes = localStorage.getItem("puppyVotes");
			return savedVotes ? JSON.parse(savedVotes) : {};
		}
		return {};
	});

	useEffect(() => {
		async function fetchData() {
			setLoading(true);
			fetch("/api/data")
				.then(
					(res) =>
						res.json() as Promise<
							Readonly<{
								votesByName: Record<string, number>;
							}>
						>,
				)
				.then(({ votesByName }) => {
					setLoading(false);
					setVotes(votesByName);
				})
				.catch(console.error)
				.finally(() => setLoading(false));
		}

		fetchData();
	}, []);

	useEffect(() => {
		localStorage.setItem("puppyVotes", JSON.stringify(votes));
	}, [votes]);

	const getVotesForName = (name: string) => votes[nameToKey(name)] || 0;

	const getTotalVotes = () =>
		Object.values(votes).reduce((sum, count) => sum + count, 0);

	return {
		loading,
		getVotesForName,
		getTotalVotes,
	};
}
