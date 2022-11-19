import Head from "next/head";
import styles from "../styles/Home.module.css";
import { NinaSessionData } from "../types";
import Ecco from "../widgets/ecco";
import LatestImage from "../widgets/latestImage";
import QualityInfo from "../widgets/qualityInfo";
import SQM from "../widgets/sqm";
import TargetInfo from "../widgets/targetInfo";
import { NinaSessionContext } from "../widgets/useNinaSession";
import { usePolling } from "../widgets/usePolling";

export default function Home() {
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
