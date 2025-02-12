let usernameLogin = document.getElementById("usernameLogin");
let passwordLogin = document.getElementById("passwordLogin");
let LoginBtn = document.querySelector(".LoginBtn");
let RedirectRegister = document.querySelector(".RedirectRegister");

LoginBtn.addEventListener("click", function () {
    // Lấy danh sách người dùng từ localStorage
    let listUserLocalStorage = JSON.parse(localStorage.getItem("listUser"));
    
    if (listUserLocalStorage === null || listUserLocalStorage.length === 0) {
        alert("Không có tài khoản nào được đăng ký. Vui lòng đăng ký trước.");
        return;
    }

    // Kiểm tra thông tin đăng nhập
    let isExisted = checkLogin(listUserLocalStorage, usernameLogin.value, passwordLogin.value);

    if (isExisted) {
        // Đăng nhập thành công
        alert("Đăng nhập thành công!");
        localStorage.setItem("SuccessUserLogin", usernameLogin.value); // Lưu thông tin đăng nhập thành công
        window.location.href = "/Homepage/home.html"; // Chuyển hướng sang trang home
    } else {
        // Đăng nhập thất bại
        alert("Sai tên đăng nhập hoặc mật khẩu. Vui lòng thử lại.");
    }

    // Xóa thông tin nhập sau khi kiểm tra
    usernameLogin.value = "";
    passwordLogin.value = "";
});

RedirectRegister.addEventListener("click", function () { 
    window.location.href = "index.html";
});

// Hàm kiểm tra thông tin đăng nhập
function checkLogin(arrayUserFromLocal, inputUsername, inputPassword) {
    for (let i = 0; i < arrayUserFromLocal.length; i++) {
        if (
            arrayUserFromLocal[i].username === inputUsername &&
            arrayUserFromLocal[i].password === inputPassword
        ) {
            return true; // Đăng nhập thành công
        }
    }
    return false; // Đăng nhập thất bại
}
