// pages/api/postd.ts

import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // req.method === 'POST'
  let readableStreamController: ReadableStreamDefaultController<any>;
  const progressStream = new ReadableStream({
    start(controller) {
      let progress = 100;
      readableStreamController = controller;
      // readableStreamController.enqueue(JSON.stringify({ progress }));
    },
  });

  const writableStream = new WritableStream({
    write(chunk) {
      res.write(chunk.toString());
    },
    close() {
      res.end();
    },
  });

  await progressStream.pipeTo(writableStream);
};
