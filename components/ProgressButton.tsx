// components/ProgressButton.tsx
"use client";
import { Dispatch, SetStateAction, useState } from "react";

const ProgressButton = () => {
  const [progress, setProgress] = useState<number | null>(null);

  const handleClick = async () => {
    const response = await fetch("/api/pstd", { method: "POST" }); // send response
    console.log(response);
    await processResponseStream(response);
  };

  async function processResponseStream(
    response: Response
  ) {
    const reader = response.body?.getReader(); // get reader
    if (!reader) {
      throw new Error("Invalid response");
    }

    while (true) {
      // infinite loop
      const { done, value } = await reader.read(); // condition for break
      if (done) {
        break; // with conditional break
      }
      const data = new TextDecoder().decode(value);
      const obj = JSON.parse(data);
      console.log(obj);
      const { progress } = obj;
      setProgress(progress);
    }
  }

  return (
    <div>
      <button onClick={handleClick}>Start Long Process</button>
      {progress !== null && <p>Progress: {progress}%</p>}
    </div>
  );
};

export default ProgressButton;
