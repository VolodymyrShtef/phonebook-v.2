import React, { Component } from "react";

import ContactsList from "./phonebook/ContactsList";
import ShowFav from "./phonebook/ShowFav";
import AddContactForm from "./phonebook/AddContactForm";
import styles from "./phonebook/phonebook.module.css";
import contacts from "./phonebook/firebase";

import { v4 as uuidv4 } from "uuid";

import firebase from "firebase/app";
import "firebase/auth";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import "firebase/firestore";
import ListHeader from "./phonebook/ListHaeader";

export default class App extends Component {
  state = {
    contacts: [],
    isSignedIn: false,
    currentShowing: "list",
    editID: "",
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

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts === this.state.contacts) return;
    if (prevState.contacts.length > this.state.contacts.length) return;
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
  }

  resetToList = () => {
    this.setState({ currentShowing: "list", editID: "" });
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

  displayFavourite = () => {
    this.setState({ currentShowing: "fav" });
  };

  filterFavs = () => {
    const favContacts = this.state.contacts.filter(
      (contact) => contact.favourite
    );
    return favContacts;
  };

  handleNewContact = () => {
    this.setState({ currentShowing: "add" });
  };

  addContact = ({ name, tel, email }) => {
    if (this.state.contacts.find((contact) => contact.Phone === tel)) {
      alert("Контакт з таким номером телефону уже існує");
      return;
    }
    this.setState({
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
    this.resetToList();
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
    this.setState({ currentShowing: "edit", editID: e.target.id });
  };

  getPropsOfEditingContact = () => {
    let props = {};
    this.state.contacts.forEach((contact) => {
      if (contact.id === this.state.editID) {
        props = {
          name: contact.Name,
          tel: contact.Phone,
          email: contact.Email,
        };
      }
    });
    return props;
  };

  editContact = ({ name, tel, email }) => {
    const idUpdate = this.state.editID;
    if (
      this.state.contacts.find(
        (contact) => contact.Phone === tel && contact.id !== idUpdate
      )
    ) {
      alert("Контакт з таким номером телефону уже існує");
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
    this.setState({
      contacts: updatedContacts,
      editID: "",
    });
    this.resetToList();
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
    const { isSignedIn, currentShowing, contacts } = this.state;
    return (
      <div className={styles.all_wrapper}>
        {!isSignedIn ? (
          <StyledFirebaseAuth
            uiConfig={this.uiConfig}
            firebaseAuth={firebase.auth()}
          />
        ) : (
          <>
            <h2>Ви ввійшли як: {firebase.auth().currentUser.displayName}</h2>
            <button
              className={styles.managing_button}
              onClick={() => firebase.auth().signOut()}
            >
              Sign out!
            </button>

            {(currentShowing === "list" || currentShowing === "fav") && (
              <div className={styles.container}>
                <ListHeader
                  fav={this.state.currentShowing}
                  onHandleNewContact={this.handleNewContact}
                />

                {contacts.length > 0 && (
                  <>
                    {currentShowing === "list" && (
                      <ContactsList
                        contacts={contacts}
                        onDisplayFav={this.displayFavourite}
                        onAddToFavToggle={this.addToFavToggle}
                        onEditContact={this.handleEditContact}
                        onDeleteItem={this.deleteItem}
                      />
                    )}
                    {currentShowing === "fav" && (
                      <ShowFav
                        contacts={this.filterFavs()}
                        onDisplayAll={this.resetToList}
                      />
                    )}
                  </>
                )}
              </div>
            )}

            {(currentShowing === "add" || currentShowing === "edit") && (
              <div className={styles.container}>
                <AddContactForm
                  onBackward={this.resetToList}
                  onAddContact={this.addContact}
                  onEditContact={this.editContact}
                  addOrEdit={this.state.currentShowing}
                  editID={this.state.editID}
                  contactProps={this.getPropsOfEditingContact()}
                />
              </div>
            )}
          </>
        )}
      </div>
    );
  }
}
