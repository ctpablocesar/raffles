'use client'

import { RaffleCountdown } from '@/components/raffle-countdown'
import { RaffleGrid } from '@/components/raffle-grid'
import { RaffleHeader } from '@/components/raffle-header'
import { RaffleLegend } from '@/components/raffle-legend'
import type { NumberStatus } from '@/components/raffle-number'
import { RaffleSummary } from '@/components/raffle-summary'
import { RaffleWinner } from '@/components/raffle-winner'
import Image from 'next/image'
import { useEffect, useMemo, useState } from 'react'

interface Data {
  SOLD_NUMBERS: Set<number>
  PRICE_PER_NUMBER: number
  DRAW_DATE: Date
  WINNING_NUMBER: number | null
  AWARD: string
  PHONE_NUMBER: string
}

export default function RafflePage() {
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([])
  const [data, setData] = useState<Data>({
    SOLD_NUMBERS: new Set([]),
    PRICE_PER_NUMBER: 0,
    DRAW_DATE: new Date(),
    WINNING_NUMBER: null,
    AWARD: '',
    PHONE_NUMBER: ''
  })
  const [loading, setLoading] = useState(true)

  const numbers = useMemo(() => {
    return Array.from({ length: 100 }, (_, i) => {
      let status: NumberStatus = 'available'
      if (data.SOLD_NUMBERS.has(i)) {
        status = 'sold'
      } else if (selectedNumbers.includes(i)) {
        status = 'selected'
      }
      return { number: i, status }
    })
  }, [selectedNumbers, data])

  const fetchData = async () => {
    setLoading(true)
    const response = await fetch('/api', {
      method: 'GET'
    })

    const data = await response.json()
    data.SOLD_NUMBERS = new Set(data.SOLD_NUMBERS)
    data.DRAW_DATE = new Date(data.DRAW_DATE)
    setData(data)
    setLoading(false)
  }

  const handleNumberClick = (number: number) => {
    if (data.SOLD_NUMBERS.has(number)) return

    setSelectedNumbers((prev) =>
      prev.includes(number)
        ? prev.filter((n) => n !== number)
        : [...prev, number].sort((a, b) => a - b)
    )
  }

  const handleRemove = (number: number) => {
    setSelectedNumbers((prev) => prev.filter((n) => n !== number))
  }

  const handleCheckout = () => {
    if (selectedNumbers.length === 0) return
    const message = `¡Hola! Quiero participar en la Gran Rifa 2026.\n\nHe seleccionado los siguientes números:\n${selectedNumbers
      .map((n) => `- ${n.toString().padStart(2, '0')}`)
      .join('\n')}\n\nEl total a pagar es de $${(
      selectedNumbers.length * data.PRICE_PER_NUMBER
    ).toLocaleString()} MXN.\n\n¿Podrían indicarme los pasos a seguir para completar mi compra? ¡Gracias!`

    const encodedMessage = encodeURIComponent(message)
    window.open(
      `https://wa.me/${data.PHONE_NUMBER}?text=${encodedMessage}`,
      '_blank'
    )
  }

  const availableCount = numbers.filter((n) => n.status === 'available').length
  const soldCount = numbers.filter((n) => n.status === 'sold').length

  useEffect(() => {
    ;(async () => {
      await fetchData()
    })()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
          <p className="mt-4">Cargando datos del sorteo...</p>
        </div>
      </div>
    )
  }

  if (data.WINNING_NUMBER !== null) {
    return (
      <RaffleWinner
        winningNumber={data.WINNING_NUMBER ?? 0}
        prize={data.AWARD}
        drawDate={data.DRAW_DATE}
      />
    )
  }

  return (
    <main className="min-h-screen bg-background pb-32">
      <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12 space-y-8">
        <RaffleHeader
          title="Gran Rifa 2026"
          description="Selecciona tus números de la suerte y participa por increíbles premios"
          prize={data.AWARD}
          price={`$${data.PRICE_PER_NUMBER} c/u`}
        />

        <div className="flex items-center justify-center gap-6 text-sm">
          <div className="px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground">
            <span className="font-mono">{availableCount}</span> disponibles
          </div>
          <div className="px-3 py-1.5 rounded-full bg-sold/60 text-sold-foreground">
            <span className="font-mono">{soldCount}</span> vendidos
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-4 sm:p-6">
          <RaffleGrid numbers={numbers} onNumberClick={handleNumberClick} />
        </div>

        <RaffleLegend />

        <RaffleCountdown targetDate={data.DRAW_DATE} />

        <div className="bg-card border border-border rounded-lg p-6 text-center text-muted-foreground">
          <Image
            alt="Sorteo image"
            className="m-auto"
            height={300}
            src="/uploads/sorteo.png"
            width={300}
          />
          El ganador es quien tenga el boleto con los mismos últimos 2 dígitos
          que el Premio Mayor del Sorteo Superior de la Lotería Nacional.
        </div>
      </div>

      <RaffleSummary
        selectedNumbers={selectedNumbers}
        pricePerNumber={data.PRICE_PER_NUMBER}
        onRemove={handleRemove}
        onCheckout={handleCheckout}
      />
    </main>
  )
}
