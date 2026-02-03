import dbConnect from '@/db/connect'
import Data from '@/model/DataModel'

export async function GET() {
  try {
    await dbConnect()

    const data = await Data.find()

    return Response.json(data[0])
  } catch (error) {
    console.error(error)
    return Response.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
