import Image from "next/image";
import { useState } from "react";
import { useInterval } from "usehooks-ts";

import styles from "../../styles/Widget.module.css";
import { NinaSessionData } from "../types";

export default function LatestImage() {
  const [currentSession, setSession] = useState<NinaSessionData | null>(null);

  function update() {
    fetch(`/api/ninaSession`)
      .then(async (r) => {
        const data = await r.json();
        setSession(data);
      })
      .catch((e) => {});
  }

  setTimeout(update);
  useInterval(update, 5000);

  if (!currentSession) return <div className={styles.container} />;

  const currentTarget = currentSession.targets.find(
    (t) => t.id === currentSession.activeTargetId
  );

  if (!currentTarget) return <div className={styles.container} />;

  const currentImage = currentTarget.imageRecords.length
    ? currentTarget.imageRecords[currentTarget.imageRecords.length - 1]
    : null;

  if (!currentImage) return <div className={styles.container} />;

  return (
    <div className={styles.container}>
      <img
        src={`http://eagle4pro0329/sessions/${currentSession.urlKey}/thumbnails/${currentImage.id}.jpg`}
        alt="preview"
      />
    </div>
  );
}
