// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<void>
) {
  const r = await fetch("http://eagle4pro0329:1380/getecco");
  const data = await r.json();
  if (data.result === "OK") {
    res.status(200).json(data);
  }
}
