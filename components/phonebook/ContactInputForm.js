import React from "react";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";

export default function ContactInputForm({
  state,
  handleSubmit,
  handleChange,
}) {
  const { name, tel, email } = state;
  return (
    <Container className="add_contact_wrapper">
      <form onSubmit={handleSubmit}>
        <InputGroup type="text" className="mb-3" onChange={handleChange}>
          <InputGroup.Prepend>
            <InputGroup.Text className="input_label">Name *</InputGroup.Text>
          </InputGroup.Prepend>
          <Form.Control name="name" defaultValue={name} />
        </InputGroup>

        <InputGroup type="tel" className="mb-3" onChange={handleChange}>
          <InputGroup.Prepend>
            <InputGroup.Text className="input_label">Phone *</InputGroup.Text>
          </InputGroup.Prepend>
          <Form.Control name="tel" defaultValue={tel} />
        </InputGroup>

        <InputGroup type="email" className="mb-3" onChange={handleChange}>
          <InputGroup.Prepend>
            <InputGroup.Text className="input_label">Email</InputGroup.Text>
          </InputGroup.Prepend>
          <Form.Control name="email" defaultValue={email} />
        </InputGroup>
        <br />

        <Button variant="primary" size="lg" type="submit">
          Accept changes
        </Button>
      </form>
    </Container>
  );
}
