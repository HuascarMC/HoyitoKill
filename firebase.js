const firebase = require("firebase");
require("firebase/firestore");

//Initializing firebase firestore
firebase.initializeApp({
    apiKey: "AIzaSyBzE4CZNzrwBqlztuwIc-5Vy3BXRbOHn3A",
    authDomain: "hoyito-bb6b6.firebaseapp.com",
    databaseURL: "https://hoyito-bb6b6.firebaseio.com",
    projectId: "hoyito-bb6b6",
    storageBucket: "hoyito-bb6b6.appspot.com",
    messagingSenderId: "1093861861407"
});

export default firebase;
