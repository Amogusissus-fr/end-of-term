let inputHeader = document.getElementsByClassName("inputHeader");
let inputImage = document.getElementsByClassName("inputImage");
let inputContent = document.getElementsByClassName("inputContent");
let submitBtn = document.querySelector(".submitBtn");

submitBtn.addEventListener("click", function () {
    let Header = inputHeader[0].value;
    let Image = inputImage[0].value;
    let Content = inputContent[0].value;

    // Kiểm tra dữ liệu hợp lệ
    if (Header === "" || Image === "" || Content === "") {
        alert("Vui lòng điền đầy đủ thông tin!");
        return;
    }

    // Tạo một bài đăng mới
    let postContainer = document.getElementById("post-container");

    // Tạo cấu trúc bài đăng
    let newPost = document.createElement("div");
    newPost.classList.add("card");

    let newHeader = document.createElement("h2");
    newHeader.innerText = Header;

    let newImageContainer = document.createElement("div");
    newImageContainer.classList.add("img");

    let newImage = document.createElement("img");
    newImage.src = Image;
    newImage.alt = "Image";
    newImage.style.height = "200px";
    newImage.style.width = "300px";

    let newContent = document.createElement("p");
    newContent.innerText = Content;

    // Gắn các phần tử con vào bài đăng mới
    newImageContainer.appendChild(newImage);
    newPost.appendChild(newHeader);
    newPost.appendChild(newImageContainer);
    newPost.appendChild(newContent);

    // Thêm bài đăng mới vào container
    postContainer.appendChild(newPost);

    // Xóa nội dung trong các trường input
    inputHeader[0].value = "";
    inputImage[0].value = "";
    inputContent[0].value = "";

    // Hiển thị thông báo
    alert("Bài đăng mới đã được thêm!");
});
