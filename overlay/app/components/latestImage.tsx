import styles from "../styles/Widget.module.css";
import useNinaSession from "./useNinaSession";

export default function LatestImage(props: React.HTMLProps<HTMLDivElement>) {
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
      <img
        src={`http://eagle4pro0329/sessions/${session.urlKey}/thumbnails/${currentImage.id}.jpg`}
        alt="preview"
        style={{ width: "100%" }}
      />
    </div>
  );
}
