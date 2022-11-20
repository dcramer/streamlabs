import type { NextApiRequest, NextApiResponse } from "next";

import { EAGLE_HOST } from "../../config";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<void>
) {
  const r = await fetch(`http://${EAGLE_HOST}/getecco`);
  const data = await r.json();
  if (data.result === "OK" && data.ecco === "Connected") {
    res.status(200).json(data);
  }
}
