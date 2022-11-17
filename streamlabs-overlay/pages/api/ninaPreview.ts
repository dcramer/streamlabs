// http://eagle4pro0329/sessions/sessions.json
// http://eagle4pro0329/sessions/20221116-193142/sessionHistory.json

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<void>
) {
  const r = await fetch("http://eagle4pro0329/api/1020/image/create", {
    method: "PUT",
    body: JSON.stringify({
      sessionName: "",
      id: "",
      imageScale: 0.75,
      qualityLeve: 100,
      fullPath: "",
      stretchOptions: {
        autoStretchFactor: 0.2,
        blackClipping: -2.8,
        unlinkedStretch: true,
      },
    }),
  });
  const data = await r.json();

  const currentSession = data.sessions[data.sessions.length - 1];
  if (!currentSession) res.status(200).json({});

  const rSession = await fetch(
    `http://eagle4pro0329/sessions/${currentSession.key}/sessionHistory.json`
  );
  const rData = await rSession.json();

  res.status(200).json(rData);
}
