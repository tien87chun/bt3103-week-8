import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyB-BvxIk8zBz3vWnx6mbEu7l8XqrEHv69g",
    authDomain: "bt3103-week-6-c968d.firebaseapp.com",
    projectId: "bt3103-week-6-c968d",
    storageBucket: "bt3103-week-6-c968d.appspot.com",
    messagingSenderId: "844943339030",
    appId: "1:844943339030:web:f599d4fe561ec7dbe48f37",
    measurementId: "G-YHH99FPSJQ"
};

firebase.initializeApp(firebaseConfig);
var database = firebase.firestore();
export default database;