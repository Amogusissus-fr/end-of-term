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

// Firebase config
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

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// DOM
let inputHeader = document.getElementById("inputHeader");
let inputImage = document.getElementById("inputImage");
let inputContent = document.getElementById("inputContent");
let submit_button = document.getElementById("submitPostBtn");
let my_content = document.querySelector(".my_content");
let leaveBtn = document.getElementById("leaveBtn");
let SuccessUser = localStorage.getItem("SuccessUserLogin");

// Submit feedback
submit_button.addEventListener("click", function () {
  if (!inputHeader.value || !inputImage.value || !inputContent.value) {
    alert("Vui lòng điền đầy đủ thông tin!");
    return;
  }

  const feedbackId = Date.now();
  const feedbackData = {
    header: inputHeader.value,
    image: inputImage.value,
    content: inputContent.value,
    createdAt: new Date().toISOString(),
    user: SuccessUser,
  };

  set(ref(database, "feedbacks/" + feedbackId), feedbackData)
    .then(() => {
      alert("Gửi feedback thành công!");
      inputHeader.value = "";
      inputImage.value = "";
      inputContent.value = "";
      loadFeedbacks();
    })
    .catch((err) => {
      alert("Lỗi khi lưu bài viết: " + err.message);
    });
});

// Load feedbacks
function loadFeedbacks() {
  get(ref(database, "feedbacks/"))
    .then((snapshot) => {
      my_content.innerHTML = "";

      if (snapshot.exists()) {
        const data = snapshot.val();
        const feedbackList = Object.entries(data).sort((a, b) => b[0] - a[0]);

        feedbackList.forEach(([id, post]) => {
          const div_content = document.createElement("div");
          div_content.className = "card";
          div_content.setAttribute("data-id", id);

          div_content.innerHTML = `
            <h2 class="post-header">${post.header}</h2>
            <h5>${new Date(post.createdAt).toLocaleDateString()}</h5>
            <div class="img">
              <img class="post-image" src="${post.image}" height="200" width="300" alt="ảnh"/>
              <p class="post-content">${post.content}</p>
            </div>
            <h5>Author: ${post.user}</h5>
            <div class="post-buttons"></div>
            <input type="text" id="inputReply" placeholder="Reply ...">
            <button id="submitReplyBtn">Reply</button>
          `;

          const inputReply = div_content.querySelector("#inputReply");
          const submitReplyBtn = div_content.querySelector("#submitReplyBtn");

          // Reply display wrapper
          const repliesWrapper = document.createElement("div");
          repliesWrapper.className = "replies-wrapper";
          repliesWrapper.style.display = "none";
          div_content.appendChild(repliesWrapper);

          // Show/Hide buttons
          const showBtn = document.createElement("button");
          showBtn.textContent = "Show Replies";
          const hideBtn = document.createElement("button");
          hideBtn.textContent = "Hide Replies";

          div_content.appendChild(showBtn);
          div_content.appendChild(hideBtn);

          showBtn.addEventListener("click", () => {
            repliesWrapper.style.display = "block";
          });

          hideBtn.addEventListener("click", () => {
            repliesWrapper.style.display = "none";
          });

          // Gửi phản hồi mới
          submitReplyBtn.addEventListener("click", () => {
            const replyId = Date.now();
            const replyData = {
              content: inputReply.value,
              createdAt: new Date().toISOString(),
              user: SuccessUser,
            };

            const repliesRef = ref(database, `feedbacks/${id}/replies/${replyId}`);
            set(repliesRef, replyData)
              .then(() => loadFeedbacks())
              .catch((err) => alert("Lỗi khi lưu reply: " + err.message));
          });

          // Tải các phản hồi cũ
          const repliesRef = ref(database, `feedbacks/${id}/replies`);
          get(repliesRef).then((snapshot) => {
            if (snapshot.exists()) {
              const replies = Object.values(snapshot.val());
              replies.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

              replies.forEach((reply) => {
                const replyBox = document.createElement("div");
                replyBox.className = "reply-box";
                replyBox.innerHTML = `
                  <h5>${new Date(reply.createdAt).toLocaleDateString()}</h5>
                  <h5>Author: ${reply.user}</h5>
                  <p>${reply.content}</p>
                `;
                repliesWrapper.appendChild(replyBox);
              });
            }
          });

          // Quyền sửa/xoá nếu là người đăng
          if (post.user === SuccessUser) {
            const buttonContainer = div_content.querySelector(".post-buttons");

            const editBtn = document.createElement("button");
            editBtn.textContent = "Edit";

            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Delete";

            editBtn.addEventListener("click", () => {
              const newHeader = prompt("Sửa tiêu đề:", post.header);
              const newImage = prompt("Sửa link ảnh:", post.image);
              const newContent = prompt("Sửa nội dung:", post.content);

              if (newHeader && newImage && newContent) {
                const updates = {
                  header: newHeader,
                  image: newImage,
                  content: newContent,
                  createdAt: post.createdAt,
                };

                update(ref(database, "feedbacks/" + id), updates)
                  .then(() => {
                    alert("Cập nhật thành công!");
                    loadFeedbacks();
                  })
                  .catch((err) => alert("Lỗi cập nhật: " + err.message));
              }
            });

            deleteBtn.addEventListener("click", () => {
              const confirmDelete = confirm("Bạn có chắc chắn muốn xoá bài viết này?");
              if (confirmDelete) {
                remove(ref(database, "feedbacks/" + id))
                  .then(() => {
                    alert("Đã xoá bài viết");
                    loadFeedbacks();
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
    .catch((err) => console.error("Lỗi khi tải feedbacks:", err));
}

// Gọi khi trang load
loadFeedbacks();

// Nút rời khỏi trang
leaveBtn.addEventListener("click", () => {
  window.location.href = "/Contact-page/Contact/contact.html";
});
