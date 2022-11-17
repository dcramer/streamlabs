// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<void>
) {
  fetch("http://eagle4pro0329:1380/getecco").then(async (r) => {
    const data = await r.json();
    if (data.result === "OK") {
      res.status(200).json(data);
    }
  });
}
