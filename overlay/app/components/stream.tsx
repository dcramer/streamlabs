import styles from "../styles/Widget.module.css";
import StreamPlayer from "./streamPlayer";

export default function Stream(props: React.HTMLProps<HTMLDivElement>) {
  return (
    <div className={styles.container} {...props}>
      <StreamPlayer
        style={{ width: "100%" }}
        url="ws://localhost:3333/api/stream"
      />
    </div>
  );
}
