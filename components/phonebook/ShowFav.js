import React from "react";
import styles from "./phonebook.module.css";
import { v4 as uuidv4 } from "uuid";

export default function ShowFav({ contacts, onDisplayAll }) {
  const markup = contacts.map((contact) => (
    <TableItem key={uuidv4()} item={contact} />
  ));

  function TableItem({ item }) {
    const { Name, Phone, Email } = item;
    return (
      <tr>
        <td>{Name}</td>
        <td>{Phone}</td>
        <td>{Email}</td>
      </tr>
    );
  }

  return (
    <>
      <button
        className={styles.show_all_button}
        type="button"
        onClick={onDisplayAll}
      >
        Показати всі контакти
      </button>

      <table className={styles.transaction_history}>
        <thead>
          <tr>
            <th>Ім'я</th>
            <th>Номер телефону</th>
            <th>Ел. пошта</th>
          </tr>
        </thead>

        <tbody>{markup}</tbody>
      </table>
    </>
  );
}
