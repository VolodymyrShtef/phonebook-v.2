import React from "react";
import styles from "./phonebook.module.css";
export default function ListHeader({ fav, onHandleNewContact }) {
  return (
    <>
      {fav === "fav" ? <h2>Вибрані контакти</h2> : <h2>Список контактів</h2>}
      <button
        className={styles.newcontact_showfav_button}
        type="button"
        onClick={onHandleNewContact}
      >
        Новий контакт
      </button>
    </>
  );
}
