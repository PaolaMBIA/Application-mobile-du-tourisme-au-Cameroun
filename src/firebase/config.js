import  firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBCjkolsUcb6yW-Dw28nZ0xcdCujVakVhg",
    authDomain: "mboa237.firebaseapp.com",
    databaseURL: "https://mboa237-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "mboa237",
    storageBucket: "mboa237.appspot.com",
    messagingSenderId: "219871203275",
    appId: "1:219871203275:web:1468f3a0761f29f4f5304e",
    measurementId: "G-3SW73LR19Q"
};


firebase.initializeApp(firebaseConfig);



export { firebase };