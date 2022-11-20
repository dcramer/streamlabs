import styles from "../styles/Widget.module.css";
import formatDuration from "./formatDuration";
import useNinaSession from "./useNinaSession";

export default function TargetInfo(props: React.HTMLProps<HTMLDivElement>) {
  const session = useNinaSession();

  if (!session) return <div className={styles.container} {...props} />;

  const currentTarget = session.targets.find(
    (t) => t.id === session.activeTargetId
  );

  if (!currentTarget) return <div className={styles.container} {...props} />;

  const currentImage = currentTarget.imageRecords.length
    ? currentTarget.imageRecords[currentTarget.imageRecords.length - 1]
    : null;

  return (
    <div className={styles.container} {...props}>
      <div>
        <strong className={styles.defn}>Target</strong>
        {currentTarget.name}
      </div>
      {!!currentImage && (
        <div>
          <div className={styles.subtext}>
            <strong className={styles.defn}>Filter</strong>
            {currentImage.filterName || "n/a"}
          </div>
          <div className={styles.subtext}>
            <strong className={styles.defn}>Int. Time</strong>{" "}
            {formatDuration(
              currentTarget.imageRecords.reduce((a, b) => a + b.duration, 0)
            )}
          </div>
        </div>
      )}
    </div>
  );
}
