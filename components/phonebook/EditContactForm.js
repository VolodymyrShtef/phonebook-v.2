import React, { Component } from "react";
import { Link } from "react-router-dom";
import ContactInputForm from "./ContactInputForm";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

export default class EditContactForm extends Component {
  state = {
    name: "",
    tel: "",
    email: "",
  };
  componentDidMount() {
    if (!this.props.editID) {
      this.props.history.push("/");
    } else {
      const { name, tel, email } = this.props.contactProps;
      this.setState({
        name: name,
        tel: tel,
        email: email,
      });
    }
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.name && this.state.tel)
      this.props.onEditContact(this.state, this.props.history);
    else alert("Fields with * required");
  };

  render() {
    return (
      <>
        <Container className="flex_container">
          <h2 className="new_contact_title">Edit Contact</h2>
          <Link to="/" className="back_button">
            <Button variant="outline-primary" type="button">
              Back
            </Button>
          </Link>
        </Container>

        <ContactInputForm
          state={this.state}
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
        />
      </>
    );
  }
}
