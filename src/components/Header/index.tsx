import styles from "./styles.module.css";

import editTitle from "../../../public/images/edit.png";

import imgNoUser from "../../../public/images/noUser.png";

import Image from "next/image";
import { useEffect, useState } from "react";
import { DocumentData, doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "@/pages/api/services/firebaseConfig";
import { User, onAuthStateChanged } from "firebase/auth";
import { toast } from "react-toastify";

export default function Header() {
  const [titleContent, setTitleContent] = useState<string>("");
  const [toggleTitle, setToggleTitle] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");

  const [avatar, setAvatar] = useState<string | null | undefined>(null);

  useEffect(() => {
    async function getPhoto() {
      const uid = await getUid();
      const data: DocumentData | undefined = (
        await getDoc(doc(db, `/dataUser/${uid}`))
      ).data();
      if (data) {
        setAvatar(data.avatar);
      } else {
        setAvatar(undefined);
      }
    }

    getPhoto();
  }, []);

  useEffect(() => {
    async function getTitle() {
      const userUid = await getUid();
      getDoc(doc(db, `dataUser/title-${userUid}`))
        .then((resp: DocumentData) => {
          if (resp.data().title) {
            setTitle(resp.data().title);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }

    getTitle();
  });

  function redirectPage() {
    window.location.replace("/settings");
  }

  async function getUid() {
    const userUid = await new Promise<User | null>((resolve) => {
      onAuthStateChanged(auth, (user) => {
        resolve(user);
      });
    });

    if (userUid) {
      return userUid.uid;
    } else {
      return new Error("Erro ao buscar uid");
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLElement>) {
    e.preventDefault();

    const userUid = await getUid();

    if (userUid && titleContent) {
      await setDoc(doc(db, `dataUser/title-${userUid}`), {
        title: titleContent,
      })
        .then(() => {
          setTitle(titleContent);
          toast.success("Nome alterado");
        })
        .catch((err) => {
          console.error(err);
        });
    }

    setToggleTitle(false);
  }

  return (
    <header className={styles.container}>
      <div>
        {toggleTitle ? (
          <form className={styles.formTitle} onSubmit={handleSubmit}>
            <span onClick={() => setToggleTitle(false)}>Voltar</span>
            <div>
              <input
                type="text"
                placeholder="Mudar titulo"
                value={titleContent}
                onChange={(e) => setTitleContent(e.target.value)}
              />
              <button type="submit">Mudar</button>
            </div>
          </form>
        ) : (
          <>
            {" "}
            <h1>{title ? title : "Meu kanban"}</h1>
            <Image
              loading="lazy"
              src={editTitle}
              alt="mudar nome"
              onClick={() => setToggleTitle(true)}
            />
          </>
        )}
      </div>

      <nav>
        {avatar === null ? (
          <>
            <div className={styles.loadingPhoto}></div>
          </>
        ) : (
          <>
            {avatar === undefined ? (
              <Image
                src={imgNoUser}
                alt="avatar"
                className={styles.logo}
                onClick={redirectPage}
              />
            ) : (
              <img
                src={avatar}
                alt="avatar"
                className={styles.logo}
                onClick={redirectPage}
              />
            )}
          </>
        )}
      </nav>
    </header>
  );
}
