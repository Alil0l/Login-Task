var userName = document.getElementById("name");
var userEmail = document.getElementById("email");
var userPassword = document.getElementById("password");
var userPhone = document.getElementById("phone");
var signUp = document.getElementById("signUp");
var usersData = [];
var user = { name: "", email: "", phone: 0, password: "" };
var useName = /^[a-zA-Z0-9_ -]{3,15}$/;
var usePass = /^[a-zA-Z0-9_ -^]{8,20}$/;
var useEamil = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
var usePhone = /^(?:\+20|0)?1[0125]\d{8}$/;
// Validate Data
// validate on type
// visual updates
function validator(input, reg) {
    input.addEventListener("input", function () {
        var _a, _b, _c, _d;
        var temp;
        temp = input.value;
        if (temp.length < 3 || !reg.test(temp)) {
            (_a = input.parentElement) === null || _a === void 0 ? void 0 : _a.classList.add("wrong-input");
            (_b = input.parentElement) === null || _b === void 0 ? void 0 : _b.classList.remove("correct-input");
        }
        else {
            (_c = input.parentElement) === null || _c === void 0 ? void 0 : _c.classList.remove("wrong-input");
            (_d = input.parentElement) === null || _d === void 0 ? void 0 : _d.classList.add("correct-input");
        }
    });
}
validator(userName, useName);
validator(userPassword, usePass);
validator(userPhone, usePhone);
validator(userEmail, useEamil);
userEmail.addEventListener("blur", validateUniqueEmail);
function validateUniqueEmail() {
    usersData.forEach(function (e) {
        var _a, _b;
        if (e.email == userEmail.value) {
            (_a = userEmail.parentElement) === null || _a === void 0 ? void 0 : _a.classList.add("wrong-input");
            (_b = userEmail.parentElement) === null || _b === void 0 ? void 0 : _b.classList.remove("correct-input");
            alert("this email is already registerd!");
        }
    });
}
// Store Data
// store in database
// unique values
signUp.addEventListener("click", function () {
    user.email = userEmail.value;
    user.name = userName.value;
    user.password = userPassword.value;
    user.phone = Number(userPhone.value);
    usersData.push(user);
    saveToLocalStorage();
});
// Restore Data
// from database in login
// if it is stored
(function loadSaved() {
    document.addEventListener("DOMContentLoaded", function () {
        var storedItems = localStorage.getItem("usersData");
        if (storedItems) {
            usersData = JSON.parse(storedItems);
        }
    });
})();
function saveToLocalStorage() {
    localStorage.setItem("usersData", JSON.stringify(usersData));
}
