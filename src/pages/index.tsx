import Head from "next/head";
import { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import styles from "@/styles/Home.module.css";

import logo from "../../public/images/logo.png";
import Image from "next/image";
import cameraImg from "../../public/images/camera.svg";
import eye from "../../public/images/eye.png";
import eyeOff from "../../public/images/eye-off.png";

import bgRight from "../../public/images/bgLogin.png";

import { auth, db, storage } from "./api/services/firebaseConfig";
import { getUserOn } from "./api/utils";

export default function Home() {
  const [file, setFile] = useState<any | null>(null);
  const [documentFile, setDocumentFile] = useState<any | null>(null);

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [togglePassword, setTogglePassword] = useState<boolean>(false);

  const [toggle, setToggle] = useState<boolean>(false);
  const [errorInput, setErrorInput] = useState<string | null>(null);

  const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);

  useEffect(() => {
    getUserOn();
  });

  useEffect(() => {
    setErrorInput(null);
  }, [file, name, email, password]);

  function handleToggleLogin() {
    setToggle(!toggle);
  }

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const getFile = e.target.files?.[0];
    setDocumentFile(getFile);

    if (getFile) {
      const reader = new FileReader();
      reader.readAsDataURL(getFile);
      reader.onload = () => {
        const imageUrl = reader.result as string;
        setFile(imageUrl);
      };
    }
  }

  async function newUser() {
    try {
      const registerUser = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const userUid = registerUser.user.uid;

      if (!!documentFile) {
        const refAvatar = ref(storage, `avatarUser/${userUid}`);
        await uploadBytes(refAvatar, documentFile);
        const avatarUrl = await getDownloadURL(refAvatar);

        await setDoc(doc(db, `dataUser/${userUid}`), {
          avatar: avatarUrl,
          name,
          email,
        });
      } else {
        await setDoc(doc(db, `dataUser/${userUid}`), {
          avatar: null,
          name,
          email,
        });
      }
    } catch (err: any | unknown) {
      if (err.message === "Firebase: Error (auth/email-already-in-use).")
        toast.error("Usuário já existe");
      toast.error("erro ao criar usuário tente novamente");
      console.error(err);
    }
  }

  async function loginUser() {
    await signInWithEmailAndPassword(auth, email, password).catch((err) => {
      console.error(err);
      toast.error("erro ao fazer login tente novamente mais tarde");
    });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setLoadingSubmit(true);

    if (email && password && password.length >= 6) {
      if (toggle) {
        if (name) {
          await newUser();
        } else {
          const errInput = "nameErr";
          setErrorInput(errInput);
        }
      } else {
        await loginUser();
      }
    } else {
      const errInput = !email ? "emailErr" : "passwordErr";
      setErrorInput(errInput);
    }

    setLoadingSubmit(false);
  }

  async function redefinePassword() {
    toast.info("Será enviado um E-mail para redefinir a senha");

    await sendPasswordResetEmail(auth, email)
      .then(() => {
        toast.success("Email para redefinir senha enviado com sucesso!");
      })
      .catch((err) => {
        console.error(err);
        if (err.message === "Firebase: Error (auth/user-not-found).") {
          toast.error("Email não existe");
        } else {
          toast.error("Erro ao redefinir senha");
        }
      });
  }

  return (
    <>
      <Head>
        <title>Login</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <section className={styles.containerSection}>
          <article>
            <Image src={logo} alt="logo do site" />

            <div className={styles.form}>
              <h1>Acesse a plataforma</h1>

              <p>
                Faça login ou registre-se para começar a construir seus projetos
                ainda hoje.
              </p>

              <form onSubmit={handleSubmit}>
                {toggle && (
                  <>
                    <label htmlFor="nome">
                      <div className={styles.containerPhoto}>
                        <input type="file" onChange={(e) => handleFile(e)} />
                        <Image loading="lazy" src={cameraImg} alt="" />
                        {!!file && (
                          <img
                            src={file}
                            loading="lazy"
                            alt=""
                            className={styles.imgAvatar}
                          />
                        )}
                      </div>
                    </label>

                    <label htmlFor="nome">
                      Nome
                      <input
                        type="text"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        placeholder="Digite seu nome"
                        className={
                          errorInput === "nameErr" ? styles.errorInput : ""
                        }
                      />
                      {errorInput === "nameErr" && (
                        <div className={styles.errorContent}>
                          Digite seu nome
                        </div>
                      )}
                    </label>
                  </>
                )}
                <label htmlFor="Email">
                  E-mail
                  <input
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    placeholder="Digite seu e-mail"
                    className={
                      errorInput === "emailErr" ? styles.errorInput : ""
                    }
                  />
                  {errorInput === "emailErr" && (
                    <div className={styles.errorContent}>
                      Digite um email válido
                    </div>
                  )}
                </label>

                <label htmlFor="password">
                  <div>
                    Senha{" "}
                    {!toggle && (
                      <span onClick={redefinePassword}>Esqueceu a senha?</span>
                    )}
                  </div>

                  <div className={styles.containerPassword}>
                    <input
                      type={togglePassword ? "text" : "password"}
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                      placeholder="Digite seu e-mail"
                      className={
                        errorInput === "passwordErr" ? styles.errorInput : ""
                      }
                    />

                    <Image
                      src={togglePassword ? eye : eyeOff}
                      alt="logo password"
                      onClick={() => setTogglePassword(!togglePassword)}
                    />
                  </div>

                  {errorInput === "passwordErr" && (
                    <div className={styles.errorContent}>
                      Digite um senha válido
                    </div>
                  )}
                </label>

                <button type="submit" disabled={loadingSubmit}>
                  {toggle ? "Cadastrar" : "Entrar"}
                </button>
              </form>

              {toggle ? (
                <p>
                  já tem conta? <span onClick={handleToggleLogin}> entre</span>{" "}
                </p>
              ) : (
                <p>
                  Ainda nâo tem conta?
                  <span onClick={handleToggleLogin}> Inscreva-se</span>{" "}
                </p>
              )}
            </div>
          </article>
        </section>

        <div className={styles.containerRight}>
          <Image src={bgRight} alt="Imagem a direita da tela" />
        </div>
      </main>
    </>
  );
}
