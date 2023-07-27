import { useState } from "react";
import {useDispatch} from 'react-redux';

import actionsTypes from "@/pages/api/services/redux/actionsTypes";
import Image from "next/image";

import styles from "./style.module.css";
import imgFilter from "../../../public/icons/filter.png";
import imgSearch from "../../../public/icons/search.png";


export default function SearchFilter() {
  const [search, setSearch] = useState<string>("");

  const dispatch = useDispatch()

  function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch({
      type: actionsTypes.FILTER_SEARCH,
      payload: search
    });
  }

  return (
    <form onSubmit={handleSearch} className={styles.container}>
      <button type="submit" >
        <Image loading="lazy" src={imgFilter} alt="filtrar" /> Filtrar
      </button>

      <div>
        <Image loading="lazy" src={imgSearch} alt="campo de pesquisa" />
        <input type="text" value={search} onChange={e=>setSearch(e.target.value)} placeholder="Busque por cards" />
      </div>
    </form>
  );
}
