import { initializeApp } from "firebase/app";

import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {

  apiKey: "AIzaSyCspF9w0Hh5qYugG41tQE_GWamr4PlIvf0",

  authDomain: "yk-project-5d31d.firebaseapp.com",

  databaseURL: "https://yk-project-5d31d-default-rtdb.firebaseio.com",

  projectId: "yk-project-5d31d",

  storageBucket: "yk-project-5d31d.appspot.com",

  messagingSenderId: "1048058550373",

  appId: "1:1048058550373:web:590ee1977a7a4d7ada8e8c",

  measurementId: "G-NBQK8CD9E7"

};

export default initializeApp(firebaseConfig);