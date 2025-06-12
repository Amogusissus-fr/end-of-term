// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
import {
  getDatabase,
  set,
  ref,
} from "https://www.gstatic.com/firebasejs/10.5.2/firebase-database.js";
import {
  getAuth,
  createpostsWithEmailAndPassword,
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
  measurementId: "G-6E82941PVL",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth();

let inputHeader = document.getElementsByClassName("inputHeader");
let inputImage = document.getElementsByClassName("inputImage");
let inputContent = document.getElementsByClassName("inputContent");
let submitBtn = document.querySelector(".submitBtn");

// // Lấy phần listPost ra trc
// let listPostLocalStorage = JSON.parse(localStorage.getItem("listPost"))
// // nếu chx có thì ta tạo mới
// if (listPostLocalStorage === null) {
//     localStorage.setItem("listPost", JSON.stringify([]))
//     window.location.reload()
// }

submitBtn.addEventListener("click", function () {
  let Header = inputHeader[0].value;
  let Image = inputImage[0].value;
  let Content = inputContent[0].value;

  if (Header === "" || Content === "") {
    alert("Vui lòng điền đầy đủ thông tin!");
    return;
  }
  listPostLocalStorage.push({
    Content: Content,
    Image: Image,
    Header: Header,
  });

  localStorage.setItem("listPost", JSON.stringify(listPostLocalStorage));

  inputHeader[0].value = "";
  inputImage[0].value = "";
  inputContent[0].value = "";

  alert("Bài đăng mới đã được thêm!");
  window.location.reload();
});

function Posts() {
  let postsContainer = document.querySelector(".posts");
  postsContainer.innerHTML = "";

  for (let i = 0; i < listPostLocalStorage.length; i++) {
    let post = listPostLocalStorage[i];

    // Tạo các phần tử HTML cho bài đăng
    let postDiv = document.createElement("div");
    postDiv.className = "card";

    let postHeader = document.createElement("h2");
    postHeader.innerText = post.Header;

    let postImageDiv = document.createElement("div");
    postImageDiv.className = "img";

    let postImage = document.createElement("img");
    postImage.src = post.Image;
    postImage.alt = "Image";
    postImage.width = 150;
    postImage.height = 200;

    let postContent = document.createElement("p");
    postContent.innerText = post.Content;

    let editBtn = document.createElement("button");
    editBtn.className = "editBtn";

    let deleteBtn = document.createElement("button");
    deleteBtn.className = "deleteBtn";

    // Thêm các phần tử vào bài đăng
    postImageDiv.appendChild(postImage);
    postDiv.appendChild(postHeader);
    postDiv.appendChild(postImageDiv);
    postDiv.appendChild(postContent);

    // Thêm bài đăng vào container
    postsContainer.appendChild(postDiv);
  }
}

Posts();

createposts(postsname, password)
  .then((postsCredential) => {
    const posts = postsCredential.posts;
    set(ref(database, "posts/" + posts.uid), {
      postsname: postsname,
      password: password,
    });

    alert("Tạo bài đăng thành công");
  })
  .catch((err) => {
    const errorCode = err.code;
    const errorMess = err.message;

    alert(errorMess);
  });
