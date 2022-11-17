import { useState } from "react";
import { useInterval } from "usehooks-ts";

import styles from "../../styles/Widget.module.css";
import { NinaSessionData } from "../types";

export default function TargetInfo() {
  const [currentSession, setSession] = useState<NinaSessionData | null>(null);

  useInterval(() => {
    fetch(`/api/ninaSession`).then(async (r) => {
      const data = await r.json();
      setSession(data);
    });
  }, 1000);

  console.log(currentSession);
  if (!currentSession) return null;

  const currentTarget = currentSession.targets.find(
    (t) => t.id === currentSession.activeTargetId
  );

  if (!currentTarget) return null;

  const currentImage = currentTarget.imageRecords.length
    ? currentTarget.imageRecords[currentTarget.imageRecords.length - 1]
    : null;

  return (
    <div className={styles.container}>
      <div>
        <strong className={styles.defn}>Target</strong>
        {currentTarget.name}
      </div>
      {!!currentImage && (
        <div>
          <div className={styles.subtext}>
            <strong className={styles.defn}>Filter</strong>
            {currentImage.filterName}
          </div>
          <div className={styles.subtext}>
            <strong className={styles.defn}>Exp</strong> {currentImage.duration}
            s
          </div>
        </div>
      )}
    </div>
  );
}
