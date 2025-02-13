let inputHeader = document.getElementsByClassName("inputHeader");
let inputImage = document.getElementsByClassName("inputImage");
let inputContent = document.getElementsByClassName("inputContent");
let submitBtn = document.querySelector(".submitBtn");

// Lấy phần listdiscussion ra trc
let listDiscussionLocalStorage = JSON.parse(localStorage.getItem("listDiscussion"))
// nếu chx có thì ta tạo mới
if (listDiscussionLocalStorage === null) {
    localStorage.setItem("listDiscussion", JSON.stringify([]))
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
    listDiscussionLocalStorage.push({
        Content: Content,
        Image: Image,
        Header: Header

    })
    
    localStorage.setItem("listDiscussion", JSON.stringify(listDiscussionLocalStorage))



    inputHeader[0].value = "";
    inputImage[0].value = "";
    inputContent[0].value = "";

    alert("Bài đăng mới đã được thêm!");
    window.location.reload()
});

function Discussions() {
    let discussionsContainer = document.querySelector(".discussions");
    discussionsContainer.innerHTML = "";

    for (let i = 0; i < listDiscussionLocalStorage.length; i++) {
        let discussion = listDiscussionLocalStorage[i];

        // Tạo các phần tử HTML cho bài đăng
        let discussionDiv = document.createElement("div");
        discussionDiv.className = "card";

        let discussionHeader = document.createElement("h2");
        discussionHeader.innerText = discussion.Header;

        let discussionImageDiv = document.createElement("div");
        discussionImageDiv.className = "img";

        let discussionImage = document.createElement("img");
        discussionImage.src = discussion.Image || "default-image.png"; // Sử dụng ảnh mặc định nếu không có link
        discussionImage.alt = "Image";
        discussionImage.width = 300;
        discussionImage.height = 200;

        let discussionContent = document.createElement("p");
        discussionContent.innerText = discussion.Content;

        // Thêm các phần tử vào bài đăng
        discussionImageDiv.appendChild(discussionImage);
        discussionDiv.appendChild(discussionHeader);
        discussionDiv.appendChild(discussionImageDiv);
        discussionDiv.appendChild(discussionContent);

        // Thêm bài đăng vào container
        discussionsContainer.appendChild(discussionDiv);
    }
}

Discussions()