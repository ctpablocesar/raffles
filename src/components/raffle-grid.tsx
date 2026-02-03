'use client'

import { NumberStatus, RaffleNumber } from './raffle-number'

interface RaffleGridProps {
  numbers: { number: number; status: NumberStatus }[]
  onNumberClick?: (number: number) => void
}

export function RaffleGrid({ numbers, onNumberClick }: RaffleGridProps) {
  return (
    <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-2 sm:gap-3">
      {numbers.map(({ number, status }) => (
        <RaffleNumber
          key={number}
          number={number}
          status={status}
          onClick={onNumberClick}
        />
      ))}
    </div>
  )
}
