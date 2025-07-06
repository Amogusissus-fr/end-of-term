// Import Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
import {
  getDatabase,
  set,
  ref,
  remove,
  update,
  get,
} from "https://www.gstatic.com/firebasejs/10.5.2/firebase-database.js";

// Firebase cấu hình
const firebaseConfig = {
  apiKey: "AIzaSyDnw_29_QGU6wmYNorqtOEupHjjCdur70k",
  authDomain: "jsi41-bea38.firebaseapp.com",
  databaseURL: "https://jsi41-bea38-default-rtdb.firebaseio.com",
  projectId: "jsi41-bea38",
  storageBucket: "jsi41-bea38.appspot.com",
  messagingSenderId: "451958885494",
  appId: "1:451958885494:web:e269c962c1a650f0576357",
  measurementId: "G-6E82941PVL",
};

// Khởi tạo Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Lấy phần tử HTML
let inputHeader = document.getElementById("inputHeader");
let inputImage = document.getElementById("inputImage");
let inputContent = document.getElementById("inputContent");
let submit_button = document.getElementById("submitPostBtn");
let my_content = document.querySelector(".my_content");
let SuccessUser = localStorage.getItem("SuccessUserLogin");

console.log("SuccessUser:", SuccessUser);

// Thêm bài viết
submit_button.addEventListener("click", function () {
  if (
    inputHeader.value === "" ||
    inputImage.value === "" ||
    inputContent.value === ""
  ) {
    alert("Vui lòng điền đầy đủ thông tin!");
  } else {
    const postId = Date.now();
    const postData = {
      header: inputHeader.value,
      image: inputImage.value,
      content: inputContent.value,
      createdAt: new Date().toISOString(),
      user: SuccessUser,
    };

    const postRef = ref(database, "posts/" + postId);
    set(postRef, postData)
      .then(() => {
        alert("Đăng bài thành công!");
        inputHeader.value = "";
        inputImage.value = "";
        inputContent.value = "";
        loadPosts();
      })
      .catch((err) => {
        alert("Lỗi khi lưu bài viết: " + err.message);
      });
  }
});

// Hàm tải bài viết
function loadPosts() {
  const postsRef = ref(database, "posts/");
  get(postsRef)
    .then((snapshot) => {
      my_content.innerHTML = "";

      if (snapshot.exists()) {
        const data = snapshot.val();
        const postList = Object.entries(data).sort((a, b) => b[0] - a[0]);

        postList.forEach(([id, post]) => {
          console.log(id);
          console.log(post);
          
          
          const div_content = document.createElement("div");
          div_content.className = "card";
          div_content.setAttribute("data-id", id);

          div_content.innerHTML = `
            <h2 class="post-header">${post.header}</h2>
            <h5>${new Date(post.createdAt).toLocaleDateString()}</h5>
            <div class="img">
              <img class="post-image" src="${
                post.image
              }" alt="Ảnh" height="200px" width="300px">
              <p class="post-content">${post.content}</p>
            </div>
            <h5>Author: ${post.user}</h5>
            <div class="post-buttons"></div>
            <input type="text" id="inputReply" placeholder="Reply ...">
            <button id="submitReplyBtn">Reply</button>
          `;

          const inputReply = div_content.querySelector("#inputReply");
          const submitReplyBtn = div_content.querySelector("#submitReplyBtn");

          const repliesWrapper = document.createElement("div");
          repliesWrapper.className = "replies-wrapper";
          repliesWrapper.style.display = "none";
          div_content.appendChild(repliesWrapper);

          const showBtn = document.createElement("button");
          showBtn.textContent = "Show Replies";
          showBtn.style.marginRight = "5px";

          const hideBtn = document.createElement("button");
          hideBtn.textContent = "Hide Replies";
          hideBtn.style.marginRight = "5px";

          div_content.appendChild(showBtn);
          div_content.appendChild(hideBtn);

          showBtn.addEventListener("click", () => {
            repliesWrapper.style.display = "block";
          });

          hideBtn.addEventListener("click", () => {
            repliesWrapper.style.display = "none";
          });

          submitReplyBtn.addEventListener("click", () => {
            const replyId = Date.now();
            const replyData = {
              content: inputReply.value,
              createdAt: new Date().toISOString(),
              user: SuccessUser,
            };

            const repliesRef = ref(database, `posts/${id}/replies/${replyId}`);
            set(repliesRef, replyData)
              .then(() => {
                loadPosts(); // reload lại sau khi thêm
              })
              .catch((err) => {
                alert("Lỗi khi lưu reply: " + err.message);
              });
          });

          // Load replies cũ
          const repliesRef = ref(database, `posts/${id}/replies`);
          get(repliesRef).then((snapshot) => {
            if (snapshot.exists()) {
              const replies = snapshot.val();
              const replyList = Object.values(replies);

              replyList.sort(
                (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
              );
              replyList.forEach((reply) => {
                const replyContainer = document.createElement("div");
                replyContainer.className = "reply-box";
                replyContainer.innerHTML = `
                  <h5>${new Date(reply.createdAt).toLocaleDateString()}</h5>
                  <h5>Author: ${reply.user}</h5>
                  <p>${reply.content}</p>
                `;
                repliesWrapper.appendChild(replyContainer);
              });
            }
          });

          // Chỉ người tạo mới được sửa / xoá
          if (post.user === SuccessUser) {
            const buttonContainer = div_content.querySelector(".post-buttons");

            const editBtn = document.createElement("button");
            editBtn.className = "edit_button";
            editBtn.textContent = "Edit";
            editBtn.style.marginLeft = "10px";

            const deleteBtn = document.createElement("button");
            deleteBtn.className = "delete_button";
            deleteBtn.textContent = "Delete";
            deleteBtn.style.marginLeft = "10px";

            // Sửa bài viết
            editBtn.addEventListener("click", () => {
              const headerElem = div_content.querySelector(".post-header");
              const imageElem = div_content.querySelector(".post-image");
              const contentElem = div_content.querySelector(".post-content");

              const newHeader = prompt("Sửa tiêu đề:", headerElem.innerText);
              const newImage = prompt("Sửa link ảnh:", imageElem.src);
              const newContent = prompt("Sửa nội dung:", contentElem.innerText);

              if (newHeader && newImage && newContent) {
                const updates = {
                  header: newHeader,
                  image: newImage,
                  content: newContent,
                  createdAt: post.createdAt,
                };

                update(ref(database, "posts/" + id), updates)
                  .then(() => {
                    alert("Cập nhật thành công");
                    loadPosts();
                  })
                  .catch((err) => alert("Lỗi cập nhật: " + err.message));
              }
            });

            // Xoá bài viết
            deleteBtn.addEventListener("click", () => {
              const confirmDelete = confirm(
                "Bạn có chắc chắn muốn xoá bài viết này?"
              );
              if (confirmDelete) {
                remove(ref(database, "posts/" + id))
                  .then(() => {
                    alert("Đã xoá bài viết");
                    loadPosts();
                  })
                  .catch((err) => alert("Lỗi xoá: " + err.message));
              }
            });

            buttonContainer.appendChild(editBtn);
            buttonContainer.appendChild(deleteBtn);
          }

          my_content.appendChild(div_content);
        });
      }
    })
    .catch((error) => {
      console.error("Lỗi khi tải bài viết:", error);
    });
}

// Gọi lần đầu khi trang vừa load
loadPosts();
