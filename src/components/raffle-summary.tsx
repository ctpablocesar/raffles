'use client'

import { ShoppingCart, X } from 'lucide-react'

interface RaffleSummaryProps {
  selectedNumbers: number[]
  pricePerNumber: number
  onRemove: (number: number) => void
  onCheckout: () => void
}

export function RaffleSummary({
  selectedNumbers,
  pricePerNumber,
  onRemove,
  onCheckout
}: RaffleSummaryProps) {
  const total = selectedNumbers.length * pricePerNumber

  if (selectedNumbers.length === 0) {
    return null
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 bg-card border-t border-border">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between gap-4 w-full">
          <div className="flex-1 w-full sm:w-auto">
            <p className="text-sm text-muted-foreground mb-2">
              Números seleccionados ({selectedNumbers.length})
            </p>
            <div className="flex flex-wrap gap-2">
              {selectedNumbers.map((num) => (
                <span
                  key={num}
                  className="inline-flex items-center gap-1 px-2 py-1 rounded bg-selected text-selected-foreground text-sm font-mono"
                >
                  {num.toString().padStart(2, '0')}
                  <button
                    type="button"
                    onClick={() => onRemove(num)}
                    className="hover:bg-selected-foreground/10 rounded p-0.5"
                    aria-label={`Remover número ${num}`}
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-xs text-muted-foreground uppercase tracking-wider">
                Total
              </p>
              <p className="text-xl font-bold text-foreground">
                ${total.toLocaleString()}
              </p>
            </div>
            <button
              onClick={onCheckout}
              className="gap-2 bg-selected p-2 rounded-lg flex flex-col justify-center items-center"
            >
              <ShoppingCart className="w-4 h-4" />
              Comprar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
