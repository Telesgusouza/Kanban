import Menu from "@/components/Menu";
import styles from "./style.module.css";
import Head from "next/head";
import Header from "@/components/Header";
import SectionContent from "@/components/SectionContent";
import { ToastContainer } from "react-toastify";
import SearchFilter from "@/components/SearchFilter";
import { useEffect } from "react";
import { userOn } from "../api/utils";

export default function dashboard() {

  useEffect(() => {
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
