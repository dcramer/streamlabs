import styles from "../styles/Widget.module.css";
import { usePolling } from "./usePolling";

type Data = {
  result: string;
  value: number;
};

export default function SQM({ eyeSensor = 0 }: { eyeSensor?: number }) {
  const currentData = usePolling<Data>("/api/sqm");

  if (!currentData?.value) return <div className={styles.container} />;

  return (
    <div className={styles.container}>
      <div className={styles.subtext}>
        <strong className={styles.defn}>SQM</strong>
        {currentData.value}
      </div>
    </div>
  );
}
