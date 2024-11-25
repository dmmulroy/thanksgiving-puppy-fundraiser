'use client'

import { useVoting } from '../hooks/useVoting'

export function Leaderboard() {
  const { getTopNames, getVotesForName } = useVoting([])

  const topContributors = getTopNames(5)

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-amber-800 mb-4">Top Contributors</h2>
      <ul className="space-y-2">
        {topContributors.map((name, index) => (
          <li key={name} className="flex items-center justify-between">
            <span className="text-amber-700">
              {index + 1}. {name}
            </span>
            <span className="font-semibold text-amber-600">{getVotesForName(name)} votes</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

