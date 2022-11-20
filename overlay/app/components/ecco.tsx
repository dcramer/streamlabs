import styles from "../styles/Widget.module.css";
import { usePolling } from "./usePolling";

// {"result":"OK","ecco":"Connected","temp":"9.5","hum":"59.1","dew":"1.9","pressure":"1018","temp5":"","temp6":"","temp7":"","auto5":0,"auto6":0,"auto7":2}

type Data = {
  temp: string;
  dew: string;
  hum: string;
  pressure: string;
};

export default function Ecco() {
  const currentData = usePolling<Data>("/api/ecco");

  if (!currentData) return <div className={styles.container} />;

  // XXX: Ecco returns Farhenheit with a broken unicode character
  let temp = currentData.temp;
  let tempUnit = "C";
  if (temp.indexOf("�") !== -1) {
    temp = temp.split("�")[0];
    tempUnit = "F";
  }

  return (
    <div className={styles.container}>
      <div className={styles.subtext}>
        <strong className={styles.defn}>Temp</strong>
        {temp}°{tempUnit}
      </div>

      <div className={styles.subtext}>
        <strong className={styles.defn}>Humidity</strong> {currentData.hum}%
      </div>
      <div className={styles.subtext}>
        <strong className={styles.defn}>Pressure</strong> {currentData.pressure}{" "}
        hPa
      </div>
    </div>
  );
}
