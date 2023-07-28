import { useEffect, useState } from "react";
import Image from "next/image";

import styles from "./styles.module.css";

import imgNoUser from "../../../public/images/noUser.png";
import imgCamera from "../../../public/icons/camera.svg";
import { User, deleteUser, onAuthStateChanged, signOut } from "firebase/auth";
import { auth, db, storage } from "@/pages/api/services/firebaseConfig";
import { deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { IDataUser } from "@/pages/api/interface";

export default function FormSettings() {
  const [file, setFile] = useState<File | null>(null);
  const [photo, setPhoto] = useState<string | null | undefined>(null);

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const [toggleForm, setToggleForm] = useState<boolean>(false);
  const [btnToggle, setBtnToggle] = useState<boolean>(false);

  useEffect(() => {
    async function getData() {
      const uid = await getUid();

      const dataUser = await getDoc(doc(db, `/dataUser/${uid}`));
      const data = dataUser.data();

      if (data) {
        setName(data.name);
        setEmail(data.email);

        if (data.avatar) {
          setPhoto(data.avatar);
        } else {
          setPhoto(undefined);
        }
      }
    }

    getData();
  }, [toggleForm]);

  function handleFile(e: React.ChangeEvent<HTMLInputElement> | null) {
    if (e && e.target.files && e.target.files.length > 0) {
      const filePhoto = e?.target?.files[0];
      setFile(filePhoto);

      const reader = new FileReader();
      reader.readAsDataURL(filePhoto);
      reader.onload = () => {
        const imgUrl = reader.result as string;
        setPhoto(imgUrl);
      };
    }
  }

  async function getUid() {
    const user = await new Promise<User | null>((result) => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          result(user);
        }
      });
    });

    if (user) {
      return user.uid;
    } else {
      return new Error("Erro ao buscar usuario");
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLElement>) {
    e.preventDefault();
    setBtnToggle(true);

    try {
      const uid = await getUid();

      let data: IDataUser = {};

      if (name) {
        data["name"] = name;
        data["email"] = email;

        if (file) {
          const refStorage = ref(storage, `/avatarUser/${uid}`);
          await uploadBytes(refStorage, file);
          const getAvatar = await getDownloadURL(refStorage);

          data["avatar"] = getAvatar;
        } else {
          if (!!photo) {
            data["avatar"] = photo;
          } else {
            data["avatar"] = null;
          }
        }
      } else {
        toast.info("Preencha os campos.", { delay: 500 });
      }

      await setDoc(doc(db, `/dataUser/${uid}`), data);
      toast.success("Editado com sucesso");
      setToggleForm(false);
      setBtnToggle(false);
    } catch (err) {
      toast.error("Erro ao atualizar dados, tente novamente");
      console.error("Erro ao atualizar dados do usuario", err);
      setBtnToggle(false);
    }
  }

  async function logOutUser() {
    const conf = confirm("Deseja mesmo deslogar da sua conta?");

    if (conf) {
      signOut(auth).then(() => {
        toast.success("Deslogado", { delay: 350 });
        setTimeout(() => {
          window.location.replace("/");
        }, 500);
      });
    }
  }

  async function deleteAccount() {
    const conf = confirm("Deseja mesmo deletar sua conta?");
    const uid = await getUid();

    if (conf && auth.currentUser) {
      try {
        await deleteDoc(doc(db, `/dataUser/${uid}`));
        await deleteUser(auth.currentUser).then(() => {
          toast.success("Deslogado", { delay: 350 });
          setTimeout(() => {
            window.location.replace("/");
          }, 500);
        });
      } catch (err) {
        console.error(err);
        toast.error("Erro ao excluir conta, tente novamente");
      }
    }
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <h1>{toggleForm ? "Edite" : "Suas "} informações</h1>

        <label htmlFor="photo">
          <span>Foto</span>
          <div className={styles.photo}>

            {photo === null ? (
              <>
                <div className={styles.loadingPhoto}></div>
              </>
            ) : (
              <>
                {photo === undefined ? (
                  <>
                    <Image
                      src={imgNoUser}
                      loading="lazy"
                      alt="Avatar do usuario"
                    />
                  </>
                ) : (
                  <>
                    <img src={photo} loading="lazy" alt="Avatar do usuario" />
                  </>
                )}
              </>
            )}

            {toggleForm && (
              <>
                <Image src={imgCamera} loading="lazy" alt="Mude a foto" />
                <input onChange={(e) => handleFile(e)} type="file" />
              </>
            )}
          </div>
        </label>

        <label htmlFor="name">
          <span>Nome</span>
          {toggleForm ? (
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Digite seu nome"
            />
          ) : (
            <strong>{name}</strong>
          )}
        </label>

        <label htmlFor="email">
          <span>Email</span>
          {toggleForm ? (
            <input
              value={email}
              type="text"
              placeholder="Digite seu email"
              disabled
            />
          ) : (
            <strong>{email}</strong>
          )}
        </label>

        {toggleForm && (
          <button type="submit" disabled={btnToggle}>
            Editar
          </button>
        )}

        <p onClick={() => setToggleForm(!toggleForm)}>
          {toggleForm ? "Voltar" : "Deseja editar sua conta?"}
        </p>
      </form>

      <div className={styles.btnContainer}>
        <button onClick={logOutUser}>Deslogar</button>
        <button onClick={deleteAccount}>Excluir conta</button>
      </div>
    </div>
  );
}
