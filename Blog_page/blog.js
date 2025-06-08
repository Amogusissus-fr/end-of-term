let inputHeader = document.getElementsByClassName("inputHeader");
let inputImage = document.getElementsByClassName("inputImage");
let inputContent = document.getElementsByClassName("inputContent");
let submitBtn = document.querySelector(".submitBtn");

// Lấy phần listPost ra trc
let listPostLocalStorage = JSON.parse(localStorage.getItem("listPost"))
// nếu chx có thì ta tạo mới
if (listPostLocalStorage === null) {
    localStorage.setItem("listPost", JSON.stringify([]))
    window.location.reload()
}

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
        Header: Header

    })
    
    localStorage.setItem("listPost", JSON.stringify(listPostLocalStorage))



    inputHeader[0].value = "";
    inputImage[0].value = "";
    inputContent[0].value = "";

    alert("Bài đăng mới đã được thêm!");
    window.location.reload()
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
        postImage.src = post.Image 
        postImage.alt = "Image";
        postImage.width = 150;
        postImage.height = 200;

        let postContent = document.createElement("p");
        postContent.innerText = post.Content;

        // Thêm các phần tử vào bài đăng
        postImageDiv.appendChild(postImage);
        postDiv.appendChild(postHeader);
        postDiv.appendChild(postImageDiv);
        postDiv.appendChild(postContent);

        // Thêm bài đăng vào container
        postsContainer.appendChild(postDiv);
    }
}

Posts()