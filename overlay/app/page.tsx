"use client";

import styles from "./styles/Home.module.css";
import { NinaSessionData } from "../types";
import Ecco from "./components/ecco";
import LatestImage from "./components/latestImage";
import QualityInfo from "./components/qualityInfo";
import SQM from "./components/sqm";
import TargetInfo from "./components/targetInfo";
import { NinaSessionContext } from "./components/useNinaSession";
import { usePolling } from "./components/usePolling";

export default function Index() {
  const ninaSession = usePolling<NinaSessionData>(`/api/ninaSession`);

  return (
    <NinaSessionContext.Provider value={ninaSession}>
      <div className={styles.container}>
        <main className={styles.main}>
          <LatestImage />
          <TargetInfo />
          <QualityInfo />
          <SQM eyeSensor={0} />
          <Ecco />
        </main>
      </div>
    </NinaSessionContext.Provider>
  );
}
