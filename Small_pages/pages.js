
let commentContent = document.getElementsByClassName("commentContent");
let commentBtn = document.querySelector(".commentBtn");
let SuccessUserLogin = localStorage.getItem("SuccessUserLogin");

// Lấy phần listcomment ra trc
let listCommentLocalStorage = JSON.parse(localStorage.getItem("listComment"))
// nếu chx có thì ta tạo mới
if (listCommentLocalStorage === null) {
    localStorage.setItem("listComment", JSON.stringify([]))
}

commentBtn.addEventListener("click", function () {
    let Content = commentContent[0].value;

    if (Content === "") {
        alert("Vui lòng điền đầy đủ thông tin!");
        return;
    }
    listCommentLocalStorage.push({ 
        Content: Content,
        Username: SuccessUserLogin || "Ẩn danh"
    });
    
    localStorage.setItem("listComment", JSON.stringify(listCommentLocalStorage))

    commentContent[0].value = "";

    alert("Comment mới đã được thêm!");
    window.location.reload()
});

function comments() {
    let commentsContainer = document.querySelector(".comments");
    commentsContainer.innerHTML = "";

    for (let i = 0; i < listCommentLocalStorage.length; i++) {
        let comment = listCommentLocalStorage[i];

        let commentDiv = document.createElement("div");
        commentDiv.classList.add("comment-item");

        let usernameEl = document.createElement("strong");
        usernameEl.innerText = comment.Username + ": ";

        let commentContent = document.createElement("p");
        commentContent.innerText = comment.Content;

        commentDiv.appendChild(usernameEl);
        commentDiv.appendChild(commentContent);
        commentsContainer.appendChild(commentDiv);
    }
}


comments()