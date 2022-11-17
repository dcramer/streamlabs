import { useState } from "react";
import { useInterval } from "usehooks-ts";

import styles from "../../styles/Widget.module.css";

// {"result":"OK","ecco":"Connected","temp":"9.5","hum":"59.1","dew":"1.9","pressure":"1018","temp5":"","temp6":"","temp7":"","auto5":0,"auto6":0,"auto7":2}

type Data = {
  temp: string;
  dewpoint: string;
  humidity: string;
  pressure: string;
};

export default function Ecco() {
  const [currentData, setData] = useState<Data | null>(null);

  useInterval(() => {
    fetch("/api/ecco").then(async (r) => {
      const data = await r.json();
      if (data.result === "OK") {
        setData({
          temp: data.temp,
          humidity: data.hum,
          dewpoint: data.dew,
          pressure: data.pressure,
        });
      }
    });
  }, 1000);

  if (!currentData) return null;

  // XXX: Ecco returns Farhenheit with a broken unicode character
  let temp = currentData.temp;
  let tempUnit = "C";
  if (temp.indexOf("�") !== -1) {
    temp = temp.split("�")[0];
    tempUnit = "F";
  }

  // TODO: can we determine Celsius or not?
  return (
    <div className={styles.container}>
      <div className={styles.subtext}>
        <strong className={styles.defn}>Temp</strong>
        {temp}°{tempUnit}
      </div>

      <div className={styles.subtext}>
        <strong className={styles.defn}>Humidity</strong> {currentData.humidity}
        %
      </div>
      <div className={styles.subtext}>
        <strong className={styles.defn}>Pressure</strong> {currentData.pressure}{" "}
        hPa
      </div>
    </div>
  );
}
