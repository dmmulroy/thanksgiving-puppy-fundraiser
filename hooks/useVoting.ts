import { useState, useEffect } from 'react'

interface VoteCount {
  [key: string]: number
}

export function useVoting(initialNames: string[]) {
  const [votes, setVotes] = useState<VoteCount>(() => {
    if (typeof window !== 'undefined') {
      const savedVotes = localStorage.getItem('puppyVotes')
      return savedVotes ? JSON.parse(savedVotes) : {}
    }
    return {}
  })

  useEffect(() => {
    localStorage.setItem('puppyVotes', JSON.stringify(votes))
  }, [votes])

  const voteForName = (name: string) => {
    setVotes(prevVotes => ({
      ...prevVotes,
      [name]: (prevVotes[name] || 0) + 1
    }))
  }

  const getVotesForName = (name: string) => votes[name] || 0

  const getTotalVotes = () => Object.values(votes).reduce((sum, count) => sum + count, 0)

  const getTopNames = (count: number) => {
    return Object.entries(votes)
      .sort(([, a], [, b]) => b - a)
      .slice(0, count)
      .map(([name]) => name)
  }

  return {
    voteForName,
    getVotesForName,
    getTotalVotes,
    getTopNames,
  }
}

