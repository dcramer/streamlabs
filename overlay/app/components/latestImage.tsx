import styles from "../styles/Widget.module.css";
import useNinaSession from "./useNinaSession";

export default function LatestImage() {
  const session = useNinaSession();

  if (!session) return <div className={styles.container} />;

  const currentTarget = session.targets.find(
    (t) => t.id === session.activeTargetId
  );

  if (!currentTarget) return <div className={styles.container} />;

  const currentImage = currentTarget.imageRecords.length
    ? currentTarget.imageRecords[currentTarget.imageRecords.length - 1]
    : null;

  if (!currentImage) return <div className={styles.container} />;

  return (
    <div className={styles.container}>
      <img
        src={`http://eagle4pro0329/sessions/${session.urlKey}/thumbnails/${currentImage.id}.jpg`}
        alt="preview"
      />
    </div>
  );
}
