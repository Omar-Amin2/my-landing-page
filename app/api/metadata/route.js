import getMetaData from 'metadata-scraper'

export async function POST(req) {
  try {
    const { url } = await req.json()
    const metadata = await getMetaData(url)
    return Response.json(metadata)
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 })
  }
}
