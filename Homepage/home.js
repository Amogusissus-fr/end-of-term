let SuccessUserLogin = localStorage.getItem("SuccessUserLogin");
let SuccessUser = document.getElementsByClassName("SuccessUser")
// console.log(SuccessUserLogin);
// if (SuccessUserLogin === null || SuccessUserLogin === '') {
if (SuccessUserLogin === null || SuccessUserLogin === '') {
    window.location.href = "/Login/login.html"
} else {
    SuccessUser[0].innerText = `Xin chào, ${SuccessUserLogin}`
}



let LogoutBtn = document.querySelector(".LogoutBtn")

LogoutBtn.addEventListener("click", function () {
    localStorage.removeItem("SuccessUserLogin");
    window.location.href = "/Login/login.html"

})
