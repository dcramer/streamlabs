import Head from "next/head";
import styles from "../styles/Home.module.css";
import Ecco from "./widgets/ecco";
import QualityInfo from "./widgets/qualityInfo";
import SQM from "./widgets/sqm";
import TargetInfo from "./widgets/targetInfo";

export default function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <TargetInfo />
        <QualityInfo />
        <SQM eyeSensor={0} />
        <Ecco />
      </main>
    </div>
  );
}