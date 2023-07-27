import Head from "next/head";
import styles from "./styles.module.css";
import Menu from "@/components/Menu";
import FormSettings from "@/components/FormSettings";
import { GetServerSideProps } from "next";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../api/services/firebaseConfig";

export default function settings() {
  
  useEffect(() => {
    async function userOn() {
      onAuthStateChanged(auth, (user) => {
        if (!user) {
          window.location.replace("/");
        }
      });
    }

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
