// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import { EAGLE_HOST } from "../../config";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<void>
) {
  const { eyeSensor } = req.query;

  const r = await fetch(`http://${EAGLE_HOST}/geteye?idx=${eyeSensor || 0}`);

  const data = await r.json();
  if (data.result === "OK") {
    res.status(200).json(data);
  }
}
