'use client'

import { PartyPopper, Sparkles, Trophy } from 'lucide-react'
import { useEffect, useState } from 'react'

interface RaffleWinnerProps {
  winningNumber: number
  prize: string
  drawDate: Date
}

export function RaffleWinner({
  winningNumber,
  prize,
  drawDate
}: RaffleWinnerProps) {
  const [isRevealed, setIsRevealed] = useState(false)
  const [displayNumber, setDisplayNumber] = useState(0)

  useEffect(() => {
    const interval: NodeJS.Timeout = setInterval(() => {
      setDisplayNumber(Math.floor(Math.random() * 100))
    }, 50)

    const timeout: NodeJS.Timeout = setTimeout(() => {
      clearInterval(interval)
      setDisplayNumber(winningNumber)
      setIsRevealed(true)
    }, 2000)

    return () => {
      clearInterval(interval)
      clearTimeout(timeout)
    }
  }, [winningNumber])

  const formattedDate = drawDate.toLocaleDateString('es-MX', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 py-12">
      <div className="max-w-lg w-full text-center space-y-8">
        {/* Encabezado */}
        <div className="space-y-2">
          <div className="flex items-center justify-center gap-2 text-accent">
            <PartyPopper className="w-6 h-6" />
            <span className="text-sm font-medium uppercase tracking-widest">
              Sorteo Realizado
            </span>
            <PartyPopper className="w-6 h-6" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
            Gran Rifa 2026
          </h1>
          <p className="text-muted-foreground">{formattedDate}</p>
        </div>

        {/* Número ganador */}
        <div className="relative">
          <div
            className={`
              relative mx-auto w-40 h-40 sm:w-48 sm:h-48 rounded-2xl flex items-center justify-center transition-all duration-500 
              ${
                isRevealed
                  ? 'bg-accent shadow-[0_0_60px_rgba(74,222,128,0.4)]'
                  : 'bg-secondary'
              }
            `}
          >
            {isRevealed && (
              <Sparkles className="absolute -top-3 -right-3 w-8 h-8 text-accent animate-pulse" />
            )}
            <span
              className={`
                font-mono text-6xl sm:text-7xl font-bold transition-colors duration-500 
                ${isRevealed ? 'text-accent-foreground' : 'text-foreground'}
              `}
            >
              {displayNumber.toString().padStart(2, '0')}
            </span>
            {isRevealed && (
              <Sparkles className="absolute -bottom-3 -left-3 w-8 h-8 text-accent animate-pulse" />
            )}
          </div>

          {!isRevealed && (
            <p className="mt-4 text-muted-foreground text-sm animate-pulse">
              Revelando número ganador...
            </p>
          )}
        </div>

        {/* Premio */}
        {isRevealed && (
          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 border border-accent/30 rounded-full">
              <Trophy className="w-5 h-5 text-accent" />
              <span className="text-accent font-medium">Número Ganador</span>
            </div>

            <div className="bg-card border border-border rounded-xl p-6 space-y-4">
              <p className="text-muted-foreground text-sm">Premio</p>
              <p className="text-2xl sm:text-3xl font-bold text-foreground">
                {prize}
              </p>
              <div className="pt-4 border-t border-border">
                <p className="text-sm text-muted-foreground">
                  El ganador será contactado en las próximas 24 horas para
                  coordinar la entrega del premio.
                </p>
              </div>
            </div>

            <p className="text-muted-foreground text-sm">
              Gracias a todos los participantes
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
