"use client";
import { Skeleton } from "@mui/material";
import { useEffect, useRef, useState } from "react";

export default function Loading() {
  const divRef = useRef<HTMLDivElement>(null);

  const [numberOfSkeletons, setNumberOfSkeletons] = useState<number>(4);

  useEffect(() => {
    const divHeight = divRef.current?.clientHeight || 0;
    const calculatedSkeletons = Math.floor(divHeight / 60);
    setNumberOfSkeletons(calculatedSkeletons);
  }, []);

  const generateSkeletons = () => {
    const skeletons = [];

    for (let i = 0; i < numberOfSkeletons; i++) {
      skeletons.push(
        <div key={i} className="flex w-full">
          <div className="mr-2">
            <Skeleton variant="circular" width={50} height={50} />
          </div>
          <div>
            <Skeleton variant="text" width={200} />
            <Skeleton variant="text" width={250} />
          </div>
        </div>
      );
    }

    return skeletons;
  };

  return (
    <div className="flex flex-col h-full p-2 gap-y-2">
      <Skeleton variant="text" width="80%" height={32} />
      <Skeleton
        variant="rounded"
        height={34}
        className="rounded-full mt-1 px-1 flex items-center"
      />
      <div ref={divRef} className="h-full w-full flex flex-col gap-y-2">
        {generateSkeletons()}
      </div>
    </div>
  );
}
