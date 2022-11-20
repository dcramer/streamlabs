"use client";

import React, { useCallback, useRef } from "react";
import { loadPlayer } from "rtsp-relay/browser";

type Props = React.HTMLProps<HTMLCanvasElement> & {
  url: string;
};

export default function JsmpegPlayer({
  url,
  options,
  overlayOptions,
  ...props
}: Props) {
  const playerRef = useRef<any | null>(null);

  const handleRef = useCallback(
    async (node: HTMLCanvasElement) => {
      if (playerRef.current) playerRef.current.destroy();
      if (node) {
        playerRef.current = await loadPlayer({
          url,
          canvas: node,
        });
      }
    },
    [url]
  );

  return <canvas ref={handleRef} {...props} />;
}
