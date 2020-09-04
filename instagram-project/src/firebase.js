import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyB1CuizJO6X2hpqeCYBVllYfvyZ7hIbAnI",
    authDomain: "instagram-project-b00b7.firebaseapp.com",
    databaseURL: "https://instagram-project-b00b7.firebaseio.com",
    projectId: "instagram-project-b00b7",
    storageBucket: "instagram-project-b00b7.appspot.com",
    messagingSenderId: "382081631981",
    appId: "1:382081631981:web:a415ba44a659aef881aee4",
    measurementId: "G-BJLS9ZVY05"
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };


// export default database;