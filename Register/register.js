let usernamelRegister = document.getElementById("usernameRegister")
let passwordRegister = document.getElementById("passwordRegister")
let registerBtn = document.querySelector(".registerBtn")

// Lấy phần listUser ra trc
let listUserLocalStorage = JSON.parse(localStorage.getItem("listUser"))
// nếu chx có thì ta tạo mới
if (listUserLocalStorage === null) {
    localStorage.setItem("listUser", JSON.stringify([]))
    window.location.reload()
}

console.log(listUserLocalStorage);


registerBtn.addEventListener("click", function () {
    console.log(usernamelRegister.value);
    console.log(passwordRegister.value);

    if (checkExistedUser(listUserLocalStorage, usernamelRegister.value) === true) {
        alert("Tài khoản này đã tồn tại, vui lòng tạo tài khoản khac")
        window.location.href = "/Register/index.html";
        return
    } else {
        listUserLocalStorage.push({
            username: usernamelRegister.value,
            password: passwordRegister.value
        })
    }

    
    localStorage.setItem("listUser", JSON.stringify(listUserLocalStorage))

    localStorage.setItem("SuccessUserLogin",usernamelRegister.value)

    alert("Tạo tài khoản thành công") 

    usernamelRegister.value = "";
    passwordRegister.value = "";
})

function checkExistedUser(arrayUserFromLocal, inputUsernameRegister) {
    for (let i = 0; i < arrayUserFromLocal.length; i++) {
        if (arrayUserFromLocal[i].username === inputUsernameRegister) {
            return true
        }
    }

    return false
}

