import { NextApiRequest, NextApiResponse } from "next/types"

 
type ResponseData = {
  message: string
}
 
export async function GET(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const { searchParams } = new URL(req.url || "http://localhost")
  const name = searchParams.get("name") || "World"
 
  return new Response(JSON.stringify({ message: `Hello, ${name}!` }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  })
}