import React from "react";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Smile from "../../images/winking-face.png";

export default function ContactsList({
  contacts,
  onDeleteItem,
  onEditContact,
  onAddToFavToggle,
  onAddTestContacts,
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
          <Container className="flex_container_spased">
            <Button
              variant={favourite ? "light" : "secondary"}
              className="manage_fav_button"
              size="sm"
              type="button"
              onClick={onAddToFavToggle}
              id={item.id}
            >
              {favourite ? "Out of favourites" : "Add to favourites"}
            </Button>

            <Link to="/editcontact">
              <Button
                variant="secondary"
                type="button"
                onClick={onEditContact}
                id={item.id}
              >
                Edit
              </Button>
            </Link>

            <Button
              variant="secondary"
              type="button"
              onClick={onDeleteItem}
              id={item.id}
            >
              Delete
            </Button>
          </Container>
        </td>
      </tr>
    );
  }

  return (
    <>
      <h2>Contacts List</h2>
      <Container className="flex_container_spased custom_wrapper">
        <Link to="/addnewcontact">
          <Button variant="primary" size="lg">
            Add new contact
          </Button>{" "}
        </Link>
        <Link to="/showfavourites">
          <Button variant="primary" size="lg">
            Show favourites
          </Button>{" "}
        </Link>
        <Button variant="outline-primary" size="lg" onClick={onAddTestContacts}>
          <img src={Smile} alt="" width="40" /> Boring manual adding?
        </Button>{" "}
      </Container>

      <Table responsive striped bordered hover size="sm" variant="dark">
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>
          </tr>
        </thead>

        <tbody>{markup}</tbody>
      </Table>
    </>
  );
}
