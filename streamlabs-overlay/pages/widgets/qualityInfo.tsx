import { useState } from "react";
import { useInterval } from "usehooks-ts";

import styles from "../../styles/Widget.module.css";
import { NinaSessionData } from "../types";

function round(value: number) {
  return Math.round(value * 100) / 100;
}

function formatDuration(seconds: number) {
  let res = [];
  let rem = seconds;

  if (seconds === 0) {
    return "now";
  }

  const duration: [string, number][] = [
    ["year", 60 * 60 * 24 * 365],
    ["day", 60 * 60 * 24],
    ["hour", 60 * 60],
    ["minute", 60],
    ["second", 1],
  ];
  for (let item of duration) {
    if (rem >= item[1]) {
      let unit = Math.floor(rem / item[1]);
      const text = unit === 1 ? `${unit} ${item[0]}` : `${unit} ${item[0]}s`;
      res.push(text);
      rem = rem % item[1];
    }
  }
  let resText = "";
  res.forEach((value, index) => {
    if (index > 0 && index < res.length - 1) {
      resText += ", ";
    } else if (index === res.length - 1 && res.length > 1) {
      resText += " and ";
    }
    resText += value;
  });
  return resText;
}

export default function QualityInfo() {
  const [currentSession, setSession] = useState<NinaSessionData | null>(null);

  useInterval(() => {
    fetch(`/api/ninaSession`).then(async (r) => {
      const data = await r.json();
      setSession(data);
    });
  }, 1000);

  if (!currentSession) return null;

  const currentTarget = currentSession.targets.find(
    (t) => t.id === currentSession.activeTargetId
  );

  if (!currentTarget) return null;

  const currentImage = currentTarget.imageRecords.length
    ? currentTarget.imageRecords[currentTarget.imageRecords.length - 1]
    : null;

  if (!currentImage) return null;

  return (
    <div className={styles.container}>
      <div className={styles.subtext}>
        <strong className={styles.defn}>Sub</strong>#{currentImage.index}
      </div>
      <div className={styles.subtext}>
        <strong className={styles.defn}>Int. Time</strong>{" "}
        {formatDuration(
          currentTarget.imageRecords.reduce((a, b) => a + b.duration, 0)
        )}
      </div>
      <div className={styles.subtext}>
        <strong className={styles.defn}>HFR</strong>
        {round(currentImage.HFR)} &ndash; {currentImage.detectedStars} stars
      </div>
    </div>
  );
}
