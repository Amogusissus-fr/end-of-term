// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
import {
  getDatabase,
  set,
  ref,
  update,
} from "https://www.gstatic.com/firebasejs/10.5.2/firebase-database.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDnw_29_QGU6wmYNorqtOEupHjjCdur70k",
  authDomain: "jsi41-bea38.firebaseapp.com",
  databaseURL: "https://jsi41-bea38-default-rtdb.firebaseio.com",
  projectId: "jsi41-bea38",
  storageBucket: "jsi41-bea38.firebasestorage.app",
  messagingSenderId: "451958885494",
  appId: "1:451958885494:web:e269c962c1a650f0576357",
  measurementId: "G-6E82941PVL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth();

let username_login = document.getElementById("username_input_login");
let password_login = document.getElementById("password_input_login");
let login_btn = document.getElementById("login_btn");
let register_btn = document.getElementById("register_btn")

// Đăng nhập 1 tải khoản có sẵn
login_btn.addEventListener("click", function () {
  let username = username_login.value;
  let password = password_login.value;

  signInWithEmailAndPassword(auth, username, password)
    .then((userCredential) => {
      const user = userCredential.user;
      let date = new Date();
      update(ref(database, "user/" + user.uid), {
        lastLogin: date,
      });
      localStorage.setItem("SuccessUserLogin", user.email);
      alert("Đăng nhập thành công");
      window.location.href = "/Homepage/home.html"
    })
    .catch((err) => {
      const errorCode = err.code;
      const errorMess = err.message;

      alert(errorMess);
    });
});

register_btn.addEventListener("click", () => {
  window.location.href = "/Register/index.html"
})