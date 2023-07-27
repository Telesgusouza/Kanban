import styles from "./style.module.css";
import Image from "next/image";

import logo from "../../../public/images/logo-2.png";

import tabletImg from "../../../public/images/tablet-portrait.png";
import documentImg from "../../../public/icons/doucment-text.svg";
import cogImg from "../../../public/icons/cog.svg";
import { useRouter } from "next/router";

export default function Menu() {
  const { asPath } = useRouter();

  function redirectPage(url: string) {
    window.location.replace(url);
  }

  return (
    <>
      <div className={styles.containerMenuMobile}>
        <div className={styles.menuHamburger}>
          <input type="checkbox" name="" id="" />

          <span></span>
          <span></span>
          <span></span>

          <menu>
            <ul>
              <li onClick={() => redirectPage("/dashboard")}>
                <Image
                  loading="lazy"
                  className=""
                  src={tabletImg}
                  alt="logo boards"
                />
                Boards
              </li>
              <li onClick={() => redirectPage("/report")}>
                <Image
                  loading="lazy"
                  className=""
                  src={documentImg}
                  alt="logo relatório"
                />
                Relatório
              </li>
              <li onClick={() => redirectPage("/settings")}>
                <Image
                  loading="lazy"
                  className=""
                  src={cogImg}
                  alt="logo Ajustes"
                />
                Ajustes
              </li>
            </ul>
          </menu>
        </div>
      </div>

      <div className={styles.container}>
        <menu>
          <Image
            loading="lazy"
            src={logo}
            alt="logo site"
            className={styles.logo}
            onClick={() => redirectPage("/dashboard")}
          />

          <ul>
            <li
              className={asPath === "/dashboard" ? styles.selectedOption : ""}
              onClick={() => redirectPage("/dashboard")}
            >
              <Image src={tabletImg} alt="logo tablet" />
              Boards
            </li>
            <li
              className={asPath === "/report" ? styles.selectedOption : ""}
              onClick={() => redirectPage("/report")}
            >
              <Image src={documentImg} alt="logo documento" />
              Relatórios
            </li>
            <li
              className={asPath === "/settings" ? styles.selectedOption : ""}
              onClick={() => redirectPage("/settings")}
            >
              <Image src={cogImg} alt="logo ajustes" />
              Ajustes
            </li>
          </ul>
        </menu>
      </div>
    </>
  );
}
