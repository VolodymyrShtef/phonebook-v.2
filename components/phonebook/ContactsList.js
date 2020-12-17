import React from "react";
import styles from "./phonebook.module.css";
import { v4 as uuidv4 } from "uuid";

export default function ContactsList({
  contacts,
  onDeleteItem,
  onEditContact,
  onAddToFavToggle,
  onDisplayFav,
}) {
  const markup = contacts.map((contact) => (
    <TableItem
      key={uuidv4()}
      item={contact}
      onDeleteItem={onDeleteItem}
      onEditContact={onEditContact}
      onAddToFavToggle={onAddToFavToggle}
    />
  ));

  function TableItem({ item, onDeleteItem, onEditContact, onAddToFavToggle }) {
    const { Name, Phone, Email, favourite } = item;
    return (
      <tr>
        <td>{Name}</td>
        <td>{Phone}</td>
        <td>{Email}</td>
        <td>
          <button
            className={
              favourite ? styles.fav_inverted_button : styles.managing_button
            }
            type="button"
            onClick={onAddToFavToggle}
            id={item.id}
          >
            {favourite ? "З обраних" : "В обрані"}
          </button>
        </td>
        <td>
          <button
            className={styles.managing_button}
            type="button"
            onClick={onEditContact}
            id={item.id}
          >
            Редагувати
          </button>
        </td>
        <td>
          <button
            className={styles.managing_button}
            type="button"
            onClick={onDeleteItem}
            id={item.id}
          >
            Видалити
          </button>
        </td>
      </tr>
    );
  }

  return (
    <>
      <button
        className={styles.newcontact_showfav_button}
        type="button"
        onClick={onDisplayFav}
      >
        Показати обрані контакти
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
