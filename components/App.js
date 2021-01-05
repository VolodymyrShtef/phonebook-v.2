import React, { Component } from "react";

import ContactsList from "./phonebook/ContactsList";
import ShowFav from "./phonebook/ShowFav";
import AddContactForm from "./phonebook/AddContactForm";
import EditContactForm from "./phonebook/EditContactForm";

import contacts from "./phonebook/firebase";
import testData from "../components/testData";

import { v4 as uuidv4 } from "uuid";

import firebase from "firebase/app";
import "firebase/auth";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import "firebase/firestore";

import { Route, Switch } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

import "./styles.css";
import Logo from "../images/phone-book.svg";

export default class App extends Component {
  state = {
    contacts: [],
    isSignedIn: false,
    editID: "",
  };

  addTestContacts = () => {
    const test = async () => {
      await this.setState({
        contacts: testData(),
      });
    };
    test().then(() => {
      this.storeInDB();
      this.showContacts(firebase.auth().currentUser.displayName);
    });
  };

  uiConfig = {
    signInFlow: "popup",
    signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
    callbacks: {
      signInSuccessWithAuthResult: () => false,
    },
  };

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      this.setState({ isSignedIn: !!user });
      if (this.state.isSignedIn) {
        this.showContacts(firebase.auth().currentUser.displayName);
      }
    });
  }

  // componentDidUpdate => storeInDB(), який викликається з addContact
  // i editContact з async-await
  storeInDB = () => {
    this.state.contacts.forEach((contact) => {
      contacts
        .collection(firebase.auth().currentUser.displayName)
        .doc(contact.id)
        .set(
          {
            id: contact.id,
            Name: contact.Name,
            Phone: contact.Phone,
            Email: contact.Email,
            favourite: contact.favourite,
          },
          { merge: true }
        )
        .then(function () {
          console.log("Stored in DB");
        })
        .catch(function (error) {
          console.error("Error adding ", error);
        });
    });
  };

  showContacts = (name) => {
    let allContacts = [];
    contacts
      .collection(name)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          allContacts.push(doc.data());
        });
        this.setState({ contacts: allContacts });
      });
  };

  filterFavs = () => {
    const favContacts = this.state.contacts.filter(
      (contact) => contact.favourite
    );
    return favContacts;
  };

  addContact = ({ name, tel, email }, history) => {
    if (this.state.contacts.find((contact) => contact.Phone === tel)) {
      alert("Contact with entered phone number already exists");
      return;
    }
    const newState = async () => {
      await this.setState({
        contacts: [
          ...this.state.contacts,
          {
            id: uuidv4(),
            Name: name,
            Phone: tel,
            Email: email,
            favourite: false,
          },
        ],
      });
    };
    newState().then(() => this.storeInDB());
    history.push("/");
  };

  addToFavToggle = (e) => {
    const idFavToggle = e.target.id;
    const updatedContacts = this.state.contacts.map((contact) =>
      contact.id === idFavToggle
        ? {
            ...contact,
            favourite: !contact.favourite,
          }
        : { ...contact }
    );
    this.setState({ contacts: updatedContacts });
  };

  handleEditContact = (e) => {
    this.setState({ editID: e.target.id });
  };

  // forEach -> find
  getPropsOfEditingContact = () => {
    if (!this.state.editID) return;
    const editingContact = this.state.contacts.find(
      (contact) => contact.id === this.state.editID
    );
    return {
      name: editingContact.Name,
      tel: editingContact.Phone,
      email: editingContact.Email,
    };
  };

  editContact = ({ name, tel, email }, history) => {
    const idUpdate = this.state.editID;
    if (
      this.state.contacts.find(
        (contact) => contact.Phone === tel && contact.id !== idUpdate
      )
    ) {
      alert("Contact with entered phone number already exists");
      return;
    }
    const updatedContacts = this.state.contacts.map((contact) =>
      contact.id === idUpdate
        ? {
            Name: name,
            Phone: tel,
            Email: email,
            id: contact.id,
            favourite: contact.favourite,
          }
        : { ...contact }
    );

    const newState = async () => {
      await this.setState({
        contacts: updatedContacts,
        editID: "",
      });
    };
    newState().then(() => this.storeInDB());
    history.push("/");
  };

  deleteItem = (e) => {
    const idDelete = e.target.id;
    const updatedContacts = this.state.contacts.filter(
      (contact) => contact.id !== idDelete
    );
    this.setState({ contacts: updatedContacts });

    contacts
      .collection(firebase.auth().currentUser.displayName)
      .doc(idDelete)
      .delete()
      .then(function () {
        console.log("Document successfully deleted!");
      })
      .catch(function (error) {
        console.error("Error removing document: ", error);
      });
  };

  render() {
    const { isSignedIn, contacts } = this.state;
    return (
      <>
        {!isSignedIn ? (
          <>
            <h2>Sign in, please</h2>
            <Route
              path="/"
              render={(props) => (
                <StyledFirebaseAuth
                  {...props}
                  uiConfig={this.uiConfig}
                  firebaseAuth={firebase.auth()}
                />
              )}
            />
          </>
        ) : (
          <>
            <Container className="custom_wrapper">
              <Container className="flex_container">
                <img className="img_main" src={Logo} alt="" width="50" />
                <h2>
                  Welcome to Phonebook App,{" "}
                  {firebase.auth().currentUser.displayName}
                </h2>
              </Container>
              <Button variant="dark" onClick={() => firebase.auth().signOut()}>
                Sign out!
              </Button>
            </Container>

            <Container fluid className="backgr_wrapper">
              <Container className="content_wrapper">
                <Switch>
                  <Route
                    exact
                    path="/"
                    render={(props) => (
                      <ContactsList
                        {...props}
                        contacts={contacts}
                        onAddToFavToggle={this.addToFavToggle}
                        onEditContact={this.handleEditContact}
                        onDeleteItem={this.deleteItem}
                        onAddTestContacts={this.addTestContacts}
                      />
                    )}
                  />

                  <Route
                    path="/addnewcontact"
                    render={(props) => (
                      <AddContactForm
                        {...props}
                        onAddContact={this.addContact}
                      />
                    )}
                  />

                  <Route
                    path="/editcontact"
                    render={(props) => (
                      <EditContactForm
                        {...props}
                        onEditContact={this.editContact}
                        editID={this.state.editID}
                        contactProps={this.getPropsOfEditingContact()}
                      />
                    )}
                  />

                  <Route
                    path="/showfavourites"
                    render={(props) => <ShowFav contacts={this.filterFavs()} />}
                  />
                </Switch>
              </Container>
            </Container>
          </>
        )}
      </>
    );
  }
}
