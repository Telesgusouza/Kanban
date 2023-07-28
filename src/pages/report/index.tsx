import Menu from "@/components/Menu";
import Statistics from "@/components/Statistics";

import styles from "./styles.module.css";
import Head from "next/head";
import { useEffect } from "react";
import { userOn } from "../api/utils";

export default function report() {
  useEffect(() => {
    
    userOn();
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Relatório</title>
      </Head>
      <Menu />
      <div className={styles.containerRight + " containerRight"}>
        <Statistics />
      </div>
    </div>
  );
}
