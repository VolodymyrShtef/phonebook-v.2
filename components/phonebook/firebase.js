import firebase from "firebase/app";
import "firebase/firestore";

const config = {
  apiKey: "AIzaSyAPczfl0I4ymXkw8GaQ99EEXH3Ecx3r0JU",
  authDomain: "advphonebook.firebaseapp.com",
  projectId: "advphonebook",
  storageBucket: "gs://advphonebook.appspot.com",
  messagingSenderId: "414776138808",
  appId: "1:414776138808:web:13d7caa8a323762af35acd",
};

firebase.initializeApp(config);
const contacts = firebase.firestore();
export default contacts;
