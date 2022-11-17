import { useState } from "react";
import { useInterval } from "usehooks-ts";

import styles from "../../styles/Widget.module.css";

export default function SQM({ eyeSensor = 0 }: { eyeSensor?: number }) {
  const [currentValue, setValue] = useState<number | null>(null);

  useInterval(() => {
    fetch(`/api/sqm?eyeSensor=${eyeSensor}`).then(async (r) => {
      const data = await r.json();
      if (data.result === "OK") {
        setValue(data.value);
      }
    });
  }, 1000);

  if (!currentValue) return null;

  return (
    <div className={styles.container}>
      <div className={styles.subtext}>
        <strong className={styles.defn}>SQM</strong>
        {currentValue}
      </div>
    </div>
  );
}
