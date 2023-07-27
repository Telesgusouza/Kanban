import Menu from "@/components/Menu";
import styles from "./style.module.css";
import Head from "next/head";
import Header from "@/components/Header";
import SectionContent from "@/components/SectionContent";
import { ToastContainer } from "react-toastify";
import SearchFilter from "@/components/SearchFilter";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../api/services/firebaseConfig";

export default function dashboard() {

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
        <title>Dashboard</title>
      </Head>
      <ToastContainer autoClose={2500} />

      <Menu />
      <div className={styles.containerRight}>
        <div className={styles.delimitArea} >
          <Header />
          <SearchFilter />
          <SectionContent />
        </div>
      </div>
    </div>
  );
}
