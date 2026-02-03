import dayjs from 'dayjs'
import 'dayjs/locale/es'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(localizedFormat)

dayjs.locale('es')
dayjs.tz.setDefault('America/Mexico_City')

type TipoFecha = 'numero' | 'minuscula' | 'mayuscula'

interface Fecha {
  dia: number
  mes: string | number
  anio: number
  nombreDia: string | number
}

export const obtenerFechaActual = (tipo: TipoFecha = 'numero'): Fecha => {
  const fecha: Fecha = {
    dia: dayjs().date(),
    mes: tipo === 'numero' ? dayjs().month() : dayjs().format('MMMM'),
    anio: dayjs().year(),
    nombreDia: tipo === 'numero' ? dayjs().day() : dayjs().format('dddd')
  }

  const formatearTexto = (texto: string, formato: TipoFecha): string => {
    return formato === 'mayuscula' ? texto.toUpperCase() : texto.toLowerCase()
  }

  if (typeof fecha.nombreDia === 'string' && typeof fecha.mes === 'string') {
    fecha.nombreDia = formatearTexto(fecha.nombreDia, tipo)
    fecha.mes = formatearTexto(fecha.mes, tipo)
  }

  return fecha
}

export default dayjs
