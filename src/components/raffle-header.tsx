import Image from 'next/image'

interface RaffleHeaderProps {
  title: string
  description?: string
  prize?: string
  price?: string
}

export function RaffleHeader({
  title,
  description,
  prize,
  price
}: RaffleHeaderProps) {
  return (
    <header className="text-center space-y-4">
      <div className="inline-flex items-center justify-center w-fit h-fit rounded-full bg-white">
        <Image alt="Logo" height={130} src="/uploads/logo.png" width={130} />
      </div>
      <div className="space-y-2">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground text-balance">
          {title}
        </h1>
        {description && (
          <p className="text-muted-foreground max-w-md mx-auto text-balance">
            {description}
          </p>
        )}
      </div>
      {(prize || price) && (
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          {prize && (
            <div className="px-4 py-2 rounded-lg bg-card border border-border">
              <span className="text-xs text-muted-foreground uppercase tracking-wider">
                Premio
              </span>
              <p className="font-semibold text-foreground">{prize}</p>
            </div>
          )}
          {price && (
            <div className="px-4 py-2 rounded-lg bg-accent text-accent-foreground">
              <span className="text-xs uppercase tracking-wider opacity-80">
                Precio
              </span>
              <p className="font-semibold">{price}</p>
            </div>
          )}
        </div>
      )}
    </header>
  )
}
