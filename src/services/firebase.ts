import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import firebase from "firebase/compat/app";


const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const database = firebase.firestore();
export {firebase, auth, database}





// import firebase from 'firebase/compat/app';
// import 'firebase/compat/auth';
// import 'firebase/compat/firestore';
//
// const firebaseConfig = {
//   apiKey: "AIzaSyBOK7x5N5UnjY4TDqndzH7l5tvdNIsWFRc",
//   authDomain: "todo-app-e3cf0.firebaseapp.com",
//   projectId: "todo-app-e3cf0",
//   storageBucket: "todo-app-e3cf0.appspot.com",
//   messagingSenderId: "940016886081",
//   appId: "1:940016886081:web:91686613f16b1b1f8001c0",
//   measurementId: "G-JHPC7TP12K"
// };
//
// // Use this to initialize the firebase App
// const firebaseApp = firebase.initializeApp(firebaseConfig);
//
// // Use these for db & auth
// const db = firebaseApp.firestore();
// const auth = firebase.auth();
//
// export { auth, db };
