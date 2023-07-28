import { useEffect, useState } from "react";

import dynamic from "next/dynamic";
import styles from "./style.module.css";
import { DocumentData, collection, doc, getDocs } from "firebase/firestore";
import { auth, db } from "@/pages/api/services/firebaseConfig";
import { User, onAuthStateChanged } from "firebase/auth";
import { toast } from "react-toastify";
import { IConfigChart, ITask } from "@/pages/api/interface";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

interface IListCurrent {
  chart: IConfigChart | null;
  content: DocumentData[];
}

export default function Statistics() {
  const [sizeAFazer, setSizeAFazer] = useState<number>(0);
  const [sizeFazendo, setSizeFazendo] = useState<number>(0);
  const [sizeFinalizado, setSizeFinalizado] = useState<number>(0);

  const [configAFazer, setConfigAFazer] = useState<IConfigChart | null>(null);
  const [configFazendo, setConfigFazendo] = useState<IConfigChart | null>(null);
  const [configFinalizado, setConfigFinalizado] = useState<IConfigChart | null>(
    null
  );

  const [listCurrent, setListCurrent] = useState<IListCurrent | null>(null);

  useEffect(() => {
    async function getData() {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          const uid = user.uid;

          const baseUrl = `/listTask/${uid}`;

          try {
            getDocs(collection(db, `${baseUrl}/a_fazer`)).then((resp) => {
              setSizeAFazer(resp.size);
            });
            getDocs(collection(db, `${baseUrl}/fazendo`)).then((resp) => {
              setSizeFazendo(resp.size);
            });
            getDocs(collection(db, `${baseUrl}/finalizado`)).then((resp) => {
              setSizeFinalizado(resp.size);
            });
          } catch (err) {
            console.error("Erro ao buscar dados >>> ", err);
            toast.error("Erro ao buscar dados tente novamente");
          }
        }
      });
    }

    getData();
  }, []);

  useEffect(() => {
    let totalSize = sizeAFazer + sizeFazendo + sizeFinalizado;

    if (totalSize <= 0) totalSize = 1;

    setConfigAFazer({
      series: [sizeAFazer, totalSize - sizeAFazer],
      options: {
        colors: ["#2a9d8f", "#c9c9c9"],
        labels: ["A Fazer", "Outros"],
        legend: {
          position: "bottom",
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
            },
          },
        ],
      },
    });

    setConfigFazendo({
      series: [sizeFazendo, totalSize - sizeFazendo],
      options: {
        colors: ["#e9c46a", "#c9c9c9"],
        labels: ["Fazendo", "Outros"],
        legend: {
          position: "bottom",
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
            },
          },
        ],
      },
    });

    setConfigFinalizado({
      series: [sizeFinalizado, totalSize - sizeFinalizado],
      options: {
        colors: ["#e76f51", "#c9c9c9"],
        labels: ["Finalizado", "Outros"],
        legend: {
          position: "bottom",
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
            },
          },
        ],
      },
    });
  }, [sizeAFazer, sizeFazendo, sizeFinalizado]);

  function redirectPage() {
    window.location.replace("/dashboard");
  }

  async function getUid() {
    const user = await new Promise<User | null>((resolve) => {
      onAuthStateChanged(auth, (user) => {
        resolve(user);
      });
    });

    if (user) {
      return user.uid;
    } else {
      return new Error("Erro ao buscar uid do usuario.");
    }
  }

  async function handleMoreInfo(info: string, config: IConfigChart | null) {
    const uid = await getUid();
    let list: DocumentData[] = [];

    const getDatas = await getDocs(collection(db, `/listTask/${uid}/${info}`));
    getDatas.docChanges().forEach((resp) => {
      const data = resp.doc.data();
      data["id"] = resp.doc.id;
      list.push(data);
    });

    const data = {
      chart: config,
      content: list,
    };

    setListCurrent(data);
  }

  return (
    <section className={styles.container}>
      <h1>Estátisticas</h1>

      <div className={styles.containerStatistics}>
        <article onClick={() => handleMoreInfo("a_fazer", configAFazer)}>
          <h2>A Fazer</h2>
          {configAFazer !== null ? (
            <>
              <ReactApexChart
                options={configAFazer.options}
                series={configAFazer.series}
                type="donut"
              />
            </>
          ) : (
            <div className={styles.loading} />
          )}
        </article>

        <article onClick={() => handleMoreInfo("fazendo", configFazendo)}>
          <h2>Fazendo</h2>

          {configFazendo !== null ? (
            <>
              <ReactApexChart
                options={configFazendo.options}
                series={configFazendo.series}
                type="donut"
              />
            </>
          ) : (
            <div className={styles.loading} />
          )}
        </article>

        <article onClick={() => handleMoreInfo("finalizado", configFinalizado)}>
          <h2>Finalizado</h2>

          {configFinalizado !== null ? (
            <>
              <ReactApexChart
                options={configFinalizado.options}
                series={configFinalizado.series}
                type="donut"
              />
            </>
          ) : (
            <div className={styles.loading} />
          )}
        </article>
      </div>

      {listCurrent ? (
        <div className={styles.ContainerMoreInformation}>
          <h2>Mais informações</h2>

          {listCurrent.chart && (
            <>
              <ReactApexChart
                className={styles.chart}
                options={listCurrent.chart.options}
                series={listCurrent.chart.series}
                type="donut"
              />
            </>
          )}

          {listCurrent.content.length > 0 && (
            <>
              <h3>Lista de tarefas</h3>

              <ul>
                {listCurrent.content &&
                  listCurrent.content.map((resp) => (
                    <li onClick={redirectPage} key={resp.id}>
                      <div>
                        <strong>{resp.title}</strong>
                        <p>{resp.content}</p>
                      </div>
                    </li>
                  ))}
              </ul>
            </>
          )}
        </div>
      ) : (
        <></>
      )}
    </section>
  );
}
