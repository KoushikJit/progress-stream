// pages/api/postdelay.ts

import { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // Simulating a long process
    const simulateLongProcess = async () => {
      const progressStream = new ReadableStream({
        start(controller) {
          let progress = 0;

          const sendProgress = () => {
            progress += 10;
            controller.enqueue(JSON.stringify({ progress }));
            if (progress < 100) {
              setTimeout(sendProgress, 1000); // Send progress every 3 seconds
            } else {
              controller.close(); // Close the stream when progress reaches 100%
            }
          };

          sendProgress();
        }
      });

      const response = new Response(progressStream);
      return response;
    };

    const longProcessResponse = await simulateLongProcess();

    // Convert NextApiResponse to a compatible WritableStream
    const writableStream = new WritableStream({
      write(chunk) {
        res.write(chunk.toString());
      },
      close() {
        res.end();
      }
    });

    // Pipe the long process response body to the writable stream
    await longProcessResponse.body?.pipeTo(writableStream);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
};
