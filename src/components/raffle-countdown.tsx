'use client'

import dayjs from '@/services/dayjsConfig'
import { Calendar } from 'lucide-react'
import { useEffect, useState } from 'react'

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

interface RaffleCountdownProps {
  targetDate: Date
}

export function RaffleCountdown({ targetDate }: RaffleCountdownProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = targetDate.getTime() - new Date().getTime()

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-center gap-2 mb-4">
        <Calendar className="w-5 h-5 text-accent" />
        <h3 className="text-lg font-semibold text-foreground">
          Fecha del Sorteo
        </h3>
      </div>

      <p className="text-center text-muted-foreground mb-4">
        {dayjs(targetDate).format(
          'dddd, DD [de] MMMM [del] YYYY [a las] HH:mm a.'
        )}
      </p>

      <div className="grid grid-cols-4 gap-3">
        <TimeUnit value={timeLeft.days} label="Dias" />
        <TimeUnit value={timeLeft.hours} label="Horas" />
        <TimeUnit value={timeLeft.minutes} label="Min" />
        <TimeUnit value={timeLeft.seconds} label="Seg" />
      </div>
    </div>
  )
}

function TimeUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="bg-secondary border border-border rounded-lg w-full py-3 px-2">
        <span className="text-2xl md:text-3xl font-bold text-foreground font-mono block text-center">
          {value.toString().padStart(2, '0')}
        </span>
      </div>
      <span className="text-xs text-muted-foreground mt-2 uppercase tracking-wide">
        {label}
      </span>
    </div>
  )
}
