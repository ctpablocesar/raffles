export function RaffleLegend() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
      <div className="flex items-center gap-2">
        <span className="w-4 h-4 rounded bg-secondary border border-border" />
        <span className="text-muted-foreground">Disponible</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="w-4 h-4 rounded bg-selected" />
        <span className="text-muted-foreground">Seleccionado</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="w-4 h-4 rounded bg-sold opacity-60" />
        <span className="text-muted-foreground">Vendido</span>
      </div>
    </div>
  )
}
