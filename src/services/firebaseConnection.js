import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

let firebaseConfig = {
  apiKey: "AIzaSyBGC_adimJCs8e0CFgu-f13zKkNT19qVZ8",
  authDomain: "tanamesa-c2f02.firebaseapp.com",
  projectId: "tanamesa-c2f02",
  storageBucket: "tanamesa-c2f02.appspot.com",
  messagingSenderId: "219414530132",
  appId: "1:219414530132:web:f7c4dcb26100c62da305c1",
  measurementId: "G-2JG5D6JEZ0"
};




  if(firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
  }

  export default firebase;



