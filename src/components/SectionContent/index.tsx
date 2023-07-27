import { useEffect, useState } from "react";

import { useSelector } from "react-redux";

import styles from "./styles.module.css";
import plusImg from "../../../public/icons/plus.svg";
import Image from "next/image";
import { ICardView, IRootReducer, ITask } from "@/pages/api/interface";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth, db } from "@/pages/api/services/firebaseConfig";
import { toast } from "react-toastify";
import {
  DocumentData,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  setDoc,
  
  where,
} from "firebase/firestore";

export default function SectionContent() {
 
  const [toggleForm, setToggleForm] = useState<boolean[]>([false, false]);
  const [toggleViewCard, setToggleViewCard] = useState<boolean>(false);
  const [btnForm, setBtnForm] = useState<boolean>(false);
  const [btnDelete, setBtnDelete] = useState<boolean>(false);
  const [toggleTypeTask, setToggleTypeTask] = useState<ICardView>({ view: "" });

  const [currentTask, setCurrentTask] = useState<ITask | null>(null);

  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [contentTag, setContentTag] = useState<string>();
  const [listTags, setListTags] = useState<string[]>([]);

  const [listTaskAFazer, setListTaskAFazer] = useState<ITask[] | null>(null);
  const [listTaskFazendo, setListTaskFazendo] = useState<ITask[] | null>(null);
  const [listTaskFinalizado, setListTaskFinalizado] = useState<ITask[] | null>(
    null
  );

  const { currentFilter } = useSelector(
    (rootReducer: IRootReducer) => rootReducer.useFilterSearch
  );

  useEffect(() => {
    async function getDataTasks() {
      const uid = await getUid();

      const qAFazer = query(
        collection(db, `/listTask/${uid}/a_fazer`),
        where("title", ">=", currentFilter)
      );
      const qFazendo = query(
        collection(db, `/listTask/${uid}/fazendo`),
        where("title", ">=", currentFilter)
      );
      const qFinalizado = query(
        collection(db, `/listTask/${uid}/finalizado`),
        where("title", ">=", currentFilter)
      );

      const arrayAFazer: ITask[] = [];
      const arrayFazendo: ITask[] = [];
      const arrayFinalizado: ITask[] = [];

      getDocs(qAFazer).then((doc: DocumentData) => {
        doc.docChanges().forEach((element: DocumentData) => {
          const data = element.doc.data();
          data["id"] = element.doc.id;
          data["list"] = "A fazer";
          arrayAFazer.push(data);
        });

        setListTaskAFazer(arrayAFazer);
      });

      getDocs(qFazendo).then((doc) => {
        doc.docChanges().forEach((element: DocumentData) => {
          const data = element.doc.data();
          data["id"] = element.doc.id;
          data["list"] = "Fazendo";
          arrayFazendo.push(data);
        });

        setListTaskFazendo(arrayFazendo);
      });

      getDocs(qFinalizado).then((doc) => {
        doc.docChanges().forEach((element: DocumentData) => {
          const data = element.doc.data();
          data["id"] = element.doc.id;
          data["list"] = "Finalizado";
          arrayFinalizado.push(data);
        });

        setListTaskFinalizado(arrayFinalizado);
      });
    }

    getDataTasks();
  }, [btnForm, toggleForm, currentFilter]);

  function handleTrashTag(index: number) {
    const array = listTags;
    array.splice(index, 1);
    setListTags([...array]);
  }

  function handleCardview(toggle: ICardView, toggleFm: boolean) {
    setToggleTypeTask(toggle);
    setToggleForm([true, toggleFm]);
  }

  function clearForm() {
    setTitle("");
    setContent("");
    setContentTag("");
    setListTags([]);
    setToggleForm([false, false]);
    setToggleViewCard(false);
  }

  function handleAddListTag() {
    if (contentTag) {
      setContentTag("");
      setListTags((p) => [...p, contentTag]);
    } else {
      toast.error("Digite algo na caixa para adicionar.");
    }
  }

  async function getUid() {
    const user = new Promise<string | null>((resolve) => {
      onAuthStateChanged(auth, (user: User | null) => {
        if (user) {
          resolve(user.uid);
        } else {
          return null;
        }
      });
    });

    if (user !== null) {
      return user;
    } else {
      return new Error("Erro ao buscar uid de usuario");
    }
  }

  async function addTask(baseUrl: string) {
    addDoc(collection(db, baseUrl), {
      title,
      content,
      date: new Date(),
      listTags,
    })
      .then(() => {
        toast.success("Adicionado com sucesso", { delay: 500 });
        setTimeout(() => {
          clearForm();
        }, 1200);
        setBtnForm(false);
      })
      .catch((err) => {
        console.error("erro ao adicionar >>> " + err);
        toast.error("Erro ao adicionar tarefa", { delay: 500 });
      });
  }

  async function editTask(baseUrl: string) {
    if (currentTask) {
      const data = {
        title,
        content,
        listTags,
        date: currentTask.date,
      };

      setDoc(doc(db, baseUrl + "/" + currentTask.id), data)
        .then(() => {
          toast.success("Editada com sucesso", { delay: 500 });
          setTimeout(() => {
            clearForm();
          }, 1200);
          setBtnForm(false);
        })
        .catch((err) => {
          console.error("erro ao adicionar >>> " + err);
          toast.error("Erro ao editar tarefa", { delay: 500 });
        });
    }
  }

  async function handleSubmitTask(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBtnForm(true);

    const uid = await getUid();

    if (uid && title && content) {
      let baseUrl = `/listTask/${uid}/`;

      if (toggleTypeTask.view === "A fazer") {
        baseUrl += "a_fazer";
      } else {
        baseUrl += "fazendo";
      }

      if (toggleForm[1]) {
        await editTask(baseUrl);
      } else {
        await addTask(baseUrl);
      }
    } else {
      toast.info("Preencha os campos");
    }
  }

  async function handleEditTask(task: ITask) {
    if (task.list !== undefined) {
      handleCardview({ view: task.list }, true);
      setCurrentTask(task);

      setTitle(task.title);
      setContent(task.content);
      setListTags(task.listTags);
    }
  }

  async function handleViewCardDone(task: ITask) {
    setCurrentTask(task);

    setToggleViewCard(true);
    setTitle(task.title);
    setContent(task.content);
    setListTags(task.listTags);
  }

  async function changePlaces(toggle: boolean) {
    if (currentTask) {
      const uid = await getUid();
      let currentName;
      let oldName;
      const saveData = {
        content: currentTask.content,
        date: currentTask.date,
        listTags: currentTask.listTags,
        title: currentTask.title,
      };

      if (toggle) {
        oldName = currentTask.list === "A fazer" ? "a_fazer" : "fazendo";
        currentName = currentTask.list === "A fazer" ? "fazendo" : "finalizado";
      } else {
        oldName = currentTask.list === "Finalizado" ? "finalizado" : "fazendo";
        currentName = currentTask.list === "Finalizado" ? "fazendo" : "a_fazer";
      }

      const baseUrlNew = `/listTask/${uid}/${currentName}/${currentTask.id}`;
      const baseUrlOld = `/listTask/${uid}/${oldName}/${currentTask.id}`;

      await deleteDoc(doc(db, baseUrlOld)).catch((err) => {
        console.error("Erro >>> " + err);
        toast.error("Erro ao atualizar posição da tarefa, tente novamente.");
      });

      await setDoc(doc(db, baseUrlNew), saveData)
        .then(() => {
          toast.success(
            `Tarefa ${toggle ? "avançada" : "retrocedida"} com sucesso.`,
            { delay: 500 }
          );
          setTimeout(() => {
            setToggleForm([false, false]);
            setCurrentTask(null);
            clearForm();
            setToggleTypeTask({ view: "" });
          }, 1200);
        })
        .catch((err) => {
          console.error("Erro ao mudar a tarefa >>> " + err);
          toast.error("Erro ao atualizar posição da tarefa, tente novamente.");
        });
    }
  }

  async function deleteTask() {
    if (currentTask) {
      setBtnDelete(true);
      const uid = await getUid();

      let name;

      if (currentTask.list === "Finalizado") name = "finalizado";
      if (currentTask.list === "Fazendo") name = "fazendo";
      if (currentTask.list === "A fazer") name = "a_fazer";

      const confim = confirm("tem certeza que deseja deletar tarefa ?");
      if (confim) {
        await deleteDoc(doc(db, `/listTask/${uid}/${name}/${currentTask.id}`))
          .then(() => {
            toast.success("Tarefa deletada com sucesso.", { delay: 500 });

            setTimeout(() => {
              clearForm();
              setBtnDelete(false);
            }, 1200);
          })
          .catch((err) => {
            toast.error("Erro ao deletar tarefa");
            console.error("Erro ao deletar tarefa >>> " + err);
            setBtnDelete(false);
          });
      }
    }
  }

  return (
    <>
      {toggleForm[0] && (
        <div className={styles.containerTask}>
          <div>
            <div className={styles.containerBtn}>
              <button className={styles.btnClosed} onClick={() => clearForm()}>
                Voltar
              </button>

              {toggleForm[1] && (
                <ul>
                  {toggleTypeTask.view !== "A fazer" && (
                    <li onClick={() => changePlaces(false)}>Retroceder</li>
                  )}
                  {toggleTypeTask.view !== "Finalizado" && (
                    <li onClick={() => changePlaces(true)}>Avançar</li>
                  )}
                </ul>
              )}
            </div>

            <form onSubmit={handleSubmitTask}>
              <h3>{toggleForm[1] ? "Editar" : "Adicionar"} tarefa </h3>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Titulo"
              />
              <input
                type="text"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Conteudo"
              />

              <div className={styles.addTag}>
                <div>
                  <input
                    type="text"
                    value={contentTag}
                    onChange={(e) => setContentTag(e.target.value)}
                    placeholder="Adiciona uma tag"
                  />
                  <button type="button" onClick={handleAddListTag}>
                    Add
                  </button>
                </div>

                <ul className={styles.listTags}>
                  {listTags.map((resp, index) => (
                    <li key={resp}>
                      {resp}
                      <strong onClick={() => handleTrashTag(index)}>X</strong>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                disabled={btnForm}
                type="submit"
                className={styles.addBtnTask}
              >
                {toggleForm[1] ? "Editar" : "Adicionar"}
              </button>
            </form>

            <button
              disabled={btnDelete}
              className={styles.btnClosed}
              onClick={deleteTask}
            >
              Deletar
            </button>
          </div>
        </div>
      )}

      {toggleViewCard && (
        <div className={styles.containerTask}>
          <div>
            <div className={styles.containerBtn}>
              <button className={styles.btnClosed} onClick={() => clearForm()}>
                Voltar
              </button>

              <ul>
                <li onClick={() => changePlaces(false)}>Retroceder</li>
              </ul>
            </div>

            <div className={styles.containerDone}>
              <div>
                <span>Titulo</span>
                <strong>Lorem ipsum dolor sit amet.</strong>
              </div>

              <div>
                <span>Conteudo</span>
                <strong>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero
                  dolor sed blanditiis quae repellendus eius!
                </strong>
              </div>

              <div>
                <span>tags</span>

                <ul className={styles.listTags}>
                  <li>tag</li>
                  <li>tag</li>
                  <li>tag</li>
                </ul>
              </div>
            </div>

            <button
              disabled={btnDelete}
              className={styles.btnClosed}
              onClick={deleteTask}
            >
              Deletar
            </button>
          </div>
        </div>
      )}

      <section className={styles.container}>
        <article>
          <div className={styles.title}>
            <h2>A fazer</h2>
            <Image
              src={plusImg}
              alt="Adicionar nova tarefa"
              onClick={() => handleCardview({ view: "A fazer" }, false)}
            />
          </div>

          <ul>
            {listTaskAFazer !== null ? (
              <>
                {listTaskAFazer.length > 0 ? (
                  listTaskAFazer.map((resp: ITask) => (
                    <li key={resp.id} onClick={() => handleEditTask(resp)}>
                      <strong>{resp.title}</strong>
                      <p>{resp.content}</p>
                      <div className={styles.containerTags}>
                        {resp.listTags.map((tag, index) => (
                          <div key={tag + index}>{tag}</div>
                        ))}
                      </div>
                    </li>
                  ))
                ) : (
                  <div className={styles.noTasks}>
                    Não a tarefas para fazer...
                  </div>
                )}
              </>
            ) : (
              <div className={styles.loadingTask} />
            )}
          </ul>
        </article>

        <article>
          <div className={styles.title}>
            <h2>Fazendo</h2>
            <Image
              src={plusImg}
              alt="Adicionar nova tarefa"
              onClick={() => handleCardview({ view: "Fazendo" }, false)}
            />
          </div>

          <ul>
            {listTaskFazendo !== null ? (
              <>
                {listTaskFazendo.length > 0 ? (
                  listTaskFazendo.map((resp: ITask) => (
                    <li key={resp.id} onClick={() => handleEditTask(resp)}>
                      <strong>{resp.title}</strong>
                      <p>{resp.content}</p>
                      <div className={styles.containerTags}>
                        {resp.listTags.map((tag, index) => (
                          <div key={tag + index}>{tag}</div>
                        ))}
                      </div>
                    </li>
                  ))
                ) : (
                  <div className={styles.noTasks}>Não a tarefas fazendo...</div>
                )}
              </>
            ) : (
              <div className={styles.loadingTask} />
            )}
          </ul>
        </article>

        <article>
          <div className={styles.title}>
            <h2>Feito</h2>
          </div>
          <ul>
            {listTaskFinalizado !== null ? (
              <>
                {listTaskFinalizado.length > 0 ? (
                  listTaskFinalizado.map((resp: ITask) => (
                    <li key={resp.id} onClick={() => handleViewCardDone(resp)}>
                      <strong>{resp.title}</strong>
                      <p>{resp.content}</p>
                      <div className={styles.containerTags}>
                        {resp.listTags.map((tag, index) => (
                          <div key={tag + index}>{tag}</div>
                        ))}
                      </div>
                    </li>
                  ))
                ) : (
                  <div className={styles.noTasks}>Não a tarefas feitas...</div>
                )}
              </>
            ) : (
              <div className={styles.loadingTask} />
            )}
          </ul>
        </article>
      </section>
    </>
  );
}
