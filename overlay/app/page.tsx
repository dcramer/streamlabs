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
          <div style={{ width: 380 }}>
            <LatestImage />
          </div>
          <div>
            <TargetInfo />
          </div>
          <div>
            <QualityInfo />
          </div>
          <div>
            <Ecco />
          </div>
          <div>
            <SQM eyeSensor={0} />
          </div>
        </main>
        <section className={styles.sidebar} style={{ width: 380 }}>
          <div>
            <Stream style={{ width: 380 }} />
          </div>
        </section>
      </div>
    </NinaSessionContext.Provider>
  );
}
