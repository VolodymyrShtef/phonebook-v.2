import React from "react";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";

export default function ShowFav({ contacts }) {
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
      <h2>Favourite Contacts</h2>
      <Container className="flex_container_spased custom_wrapper">
        <Link to="/addnewcontact">
          <Button variant="primary" size="lg">
            Add new contact
          </Button>
        </Link>
        <Link to="/">
          <Button variant="primary" size="lg">
            Show all
          </Button>
        </Link>
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
