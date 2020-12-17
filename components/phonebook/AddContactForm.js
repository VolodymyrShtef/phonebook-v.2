import React, { Component } from "react";
import styles from "./phonebook.module.css";

export default class AddContactForm extends Component {
  state = {
    name: "",
    tel: "",
    email: "",
  };
  componentDidMount() {
    const { name, tel, email } = this.props.contactProps;
    if (this.props.editID)
      this.setState({
        name: name,
        tel: tel,
        email: email,
      });
  }
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.name && this.state.tel) {
      if (this.props.addOrEdit === "add") this.props.onAddContact(this.state);
      else this.props.onEditContact(this.state);
    } else alert("Заповніть поля із *");
  };

  render() {
    return (
      <>
        {" "}
        <button
          className={styles.managing_button}
          type="button"
          onClick={this.props.onBackward}
        >
          Назад
        </button>
        {this.props.addOrEdit === "add" ? (
          <h2>Новий контакт</h2>
        ) : (
          <h2>Редагувати контакт</h2>
        )}
        <form onSubmit={this.handleSubmit}>
          <label>
            Ім'я *{" "}
            <input
              className={styles.input_field}
              type="text"
              value={this.state.name}
              onChange={this.handleChange}
              name="name"
            />
          </label>

          <label>
            Номер телефону *{" "}
            <input
              className={styles.input_field}
              type="tel"
              value={this.state.tel}
              onChange={this.handleChange}
              name="tel"
              // pattern="[0-9]{5}"
            />
          </label>

          <label>
            Електронна пошта{" "}
            <input
              className={styles.input_field}
              type="email"
              value={this.state.email}
              onChange={this.handleChange}
              name="email"
            />
          </label>
          <br />
          <button className={styles.add_edit_button} type="submit">
            {this.props.addOrEdit === "add"
              ? "Додати в контакти"
              : "Редагувати контакт"}
          </button>
        </form>
      </>
    );
  }
}
