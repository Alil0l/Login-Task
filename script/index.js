var userName = document.getElementById("name");
var userEmail = document.getElementById("email");
var userPassword = document.getElementById("password");
var userPhone = document.getElementById("phone");
var signUp = document.getElementById("signUp");
var popUp = document.querySelector(".popup");
var isUnique = false;
var usersData = [];
var validationStates = {
  name: false,
  email: false,
  password: false,
  phone: false,
};
var useName = /^[a-zA-Z0-9_ -]{3,15}$/;
var usePass = /^[a-zA-Z0-9_ -^]{8,20}$/;
var useEmail = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
var usePhone = /^(?:\+20|0)?1[0125]\d{8}$/;
// Validating functions
function validator(input, reg, type) {
  input.addEventListener("input", function () {
    var _a, _b, _c, _d;
    var temp = input.value;
    if (temp.length < 3 || !reg.test(temp)) {
      (_a = input.parentElement) === null || _a === void 0
        ? void 0
        : _a.classList.add("wrong-input");
      (_b = input.parentElement) === null || _b === void 0
        ? void 0
        : _b.classList.remove("correct-input");
      validationStates[type] = false;
    } else {
      (_c = input.parentElement) === null || _c === void 0
        ? void 0
        : _c.classList.remove("wrong-input");
      (_d = input.parentElement) === null || _d === void 0
        ? void 0
        : _d.classList.add("correct-input");
      validationStates[type] = true;
    }
  });
}
// Initializing validators
validator(userName, useName, "name");
validator(userPassword, usePass, "password");
validator(userPhone, usePhone, "phone");
validator(userEmail, useEmail, "email");
function validateUniqueEmail() {
  if (
    userEmail.value != "" &&
    !usersData.some(function (e) {
      return e.email === userEmail.value;
    })
  ) {
    isUnique = true;
  }
  return isUnique;
}
// Signup button actions
signUp.addEventListener("click", function () {
  signUp.innerHTML =
    '<img class="rotate" src="./assets/imgs/loading.png" alt="loading">';
  signUp.toggleAttribute("disabled");
  // Validate unique email
  validateUniqueEmail();
  setTimeout(function () {
    var _a, _b, _c, _d;
    var allValid =
      validationStates.name &&
      validationStates.password &&
      validationStates.phone &&
      validationStates.email &&
      isUnique;
    if (allValid) {
      popUp.style.top = "90%";
      popUp.innerHTML = "<p>Signed Up Successfully \u2714</p>";
      var newUser = {
        email: userEmail.value,
        name: userName.value,
        password: userPassword.value,
        phone: userPhone.value,
      };
      usersData.push(newUser);
      saveToLocalStorage();
      userEmail.value = "";
      userName.value = "";
      userPassword.value = "";
      userPhone.value = "";
      setTimeout(function () {
        popUp.style.top = "140%";
        window.location.href = "/Login-Task/login.html";
      }, 2000);
    } else {
      popUp.style.top = "90%";
      popUp.innerHTML = "<p>Failed to sign up \u2716</p>";
      validationStates.name == true
        ? null
        : userName.parentElement.classList.add("wrong-input");
      validationStates.email == true
        ? null
        : userEmail.parentElement.classList.add("wrong-input");
      validationStates.password == true
        ? null
        : userPassword.parentElement.classList.add("wrong-input");
      validationStates.phone == true
        ? null
        : userPhone.parentElement.classList.add("wrong-input");
      setTimeout(function () {
        popUp.style.top = "140%";
      }, 2000);
    }
    signUp.innerHTML = "Sign Up";
    signUp.toggleAttribute("disabled");
  }, 1500);
});
// Data fetching and saving
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
