'use client'

export type NumberStatus = 'available' | 'sold' | 'selected'

interface RaffleNumberProps {
  number: number
  status: NumberStatus
  onClick?: (number: number) => void
}

export function RaffleNumber({ number, status, onClick }: RaffleNumberProps) {
  const formattedNumber = number.toString().padStart(2, '0')

  return (
    <button
      type="button"
      onClick={() => onClick?.(number)}
      disabled={status === 'sold'}
      className={`
        relative flex items-center justify-center aspect-square rounded-lg font-mono text-lg font-semibold transition-all duration-200
        border border-border hover:scale-105 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background
        ${status === 'available' && 'bg-secondary text-secondary-foreground hover:bg-secondary/80 cursor-pointer'}
        ${status === 'sold' && 'bg-sold text-sold-foreground cursor-not-allowed opacity-60'}
        ${status === 'selected' && 'bg-selected text-selected-foreground ring-2 ring-selected cursor-pointer'}
      `}
      aria-label={`Número ${formattedNumber} - ${status === 'available' ? 'disponible' : status === 'sold' ? 'vendido' : 'seleccionado'}`}
    >
      {formattedNumber}
      {status === 'sold' && (
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="w-full h-0.5 bg-sold-foreground/50 rotate-45 absolute" />
        </span>
      )}
    </button>
  )
}
