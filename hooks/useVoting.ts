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
			fetch("/data")
				.then(
					(res) =>
						res.json() as Promise<
							Readonly<{
								total: number;
								votesByName: Record<string, number>;
							}>
						>,
				)
				.then(({ votesByName }) => {
					setLoading(false);
					setVotes(votesByName);
				})
				.finally(() => setLoading(false));
		}

		fetchData();

		const interval = setInterval(() => fetchData(), 5000);
		return () => clearInterval(interval);
	}, []);

	useEffect(() => {
		localStorage.setItem("puppyVotes", JSON.stringify(votes));
	}, [votes]);

	const getVotesForName = (name: string) =>
		votes[name.toLowerCase().replaceAll(" ", ".")] || 0;

	const getTotalVotes = () =>
		Object.values(votes).reduce((sum, count) => sum + count, 0);

	return {
		loading,
		getVotesForName,
		getTotalVotes,
	};
}
