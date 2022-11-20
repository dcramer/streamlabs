import styles from "../styles/Widget.module.css";
import formatDuration from "./formatDuration";
import useNinaSession from "./useNinaSession";

function round(value: number) {
  return Math.round(value * 100) / 100;
}

export default function QualityInfo(props: React.HTMLProps<HTMLDivElement>) {
  const session = useNinaSession();

  if (!session) return <div className={styles.container} {...props} />;

  const currentTarget = session.targets.find(
    (t) => t.id === session.activeTargetId
  );

  if (!currentTarget) return <div className={styles.container} {...props} />;

  const currentImage = currentTarget.imageRecords.length
    ? currentTarget.imageRecords[currentTarget.imageRecords.length - 1]
    : null;

  if (!currentImage) return <div className={styles.container} {...props} />;

  return (
    <div className={styles.container} {...props}>
      <div className={styles.subtext}>
        <strong className={styles.defn}>Sub</strong>#{currentImage.index}
      </div>
      <div className={styles.subtext}>
        <strong className={styles.defn}>Exp</strong>{" "}
        {formatDuration(currentImage.duration)}
      </div>
      <div className={styles.subtext}>
        <strong className={styles.defn}>HFR</strong>
        {round(currentImage.HFR)} &ndash; {currentImage.detectedStars} stars
      </div>
    </div>
  );
}
