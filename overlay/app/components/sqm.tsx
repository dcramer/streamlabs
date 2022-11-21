import styles from "../styles/Widget.module.css";
import { usePolling } from "./usePolling";

type Data = {
  result: string;
  value: number;
};

// only an estimate
// https://en.wikipedia.org/wiki/Bortle_scale
function sqmToBortle(value: number): string {
  if (value > 21.99) return "B1";
  else if (value > 21.89) return "B2";
  else if (value > 21.69) return "B3";
  else if (value > 20.49) return "B4";
  else if (value > 19.5) return "B5";
  else if (value > 18.94) return "B6";
  else if (value > 18.38) return "B7";
  else if (value > 17.8) return "B8";
  else return "B9";
}

function bortleToName(value: string) {
  switch (value) {
    case "B1":
      return "Excellent dark-sky site";
    case "B2":
      return "Typical truly dark site";
    case "B3":
      return "Rural sky";
    case "B4":
      return "Rural/suburban transition";
    case "B5":
      return "Suburban sky";
    case "B6":
      return "Bright suburban sky";
    case "B7":
      return "Suburban/city transition";
    case "B8":
      return "City sky";
    case "B9":
      return "Inner-city sky";
  }
}

type Props = React.HTMLProps<HTMLDivElement> & {
  eyeSensor: number;
};

export default function SQM({ eyeSensor = 0, ...props }: Props) {
  const currentData = usePolling<Data>("/api/sqm");

  if (!currentData?.value)
    return <div className={styles.container} {...props} />;

  const bortleScale = sqmToBortle(currentData.value);

  return (
    <div className={styles.container} {...props}>
      <div className={styles.subtext}>
        <strong className={styles.defn}>SQM</strong>
        <div style={{ display: "inline-block" }}>
          <div>{currentData.value}</div>
          <div className={styles[`bortle-${bortleScale}`]}>
            {bortleToName(bortleScale)}
          </div>
          <div>(approx {bortleScale})</div>
        </div>
      </div>
    </div>
  );
}
