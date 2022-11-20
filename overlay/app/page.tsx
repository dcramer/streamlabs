"use client";

import styles from "./styles/Index.module.css";
import { NinaSessionData } from "../types";
import Ecco from "./components/ecco";
import LatestImage from "./components/latestImage";
import QualityInfo from "./components/qualityInfo";
import SQM from "./components/sqm";
import TargetInfo from "./components/targetInfo";
import { NinaSessionContext } from "./components/useNinaSession";
import { usePolling } from "./components/usePolling";
import Stream from "./components/stream";

export default function Index() {
  const ninaSession = usePolling<NinaSessionData>(`/api/ninaSession`);

  return (
    <NinaSessionContext.Provider value={ninaSession}>
      <div className={styles.container}>
        <main className={styles.main}>
          <LatestImage style={{ width: 380 }} />
          <TargetInfo style={{ flex: 1 }} />
          <QualityInfo style={{ flex: 1 }} />
          <SQM eyeSensor={0} style={{ flex: 1 }} />
          <Ecco />
        </main>
        <section className={styles.stream} style={{ width: 380 }}>
          <Stream style={{ width: 380 }} />
        </section>
      </div>
    </NinaSessionContext.Provider>
  );
}
