// pages/api/postd.ts

import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // req.method === 'POST'
  let progress = 0;
  setInterval(() => {
    progress += 10;
    if (progress <= 100) {
      res.write(JSON.stringify({ progress }));
    } else {
      res.end();
    }
  }, 1000);
};
