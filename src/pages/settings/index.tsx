import Head from "next/head";
import styles from "./styles.module.css";
import Menu from "@/components/Menu";
import FormSettings from "@/components/FormSettings";
import { useEffect } from "react";
import { userOn } from "../api/utils";

export default function settings() {
  
  useEffect(() => {
    

    userOn();
  }, []);


  return (
    <div className={styles.container}>
      <Head>
        <title>Ajustes</title>
      </Head>
      <Menu />

      <div className={styles.containerRight + " containerRight"}>
        <div>
          <FormSettings />
        </div>
      </div>
    </div>
  );
}
