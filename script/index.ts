let userName = document.getElementById("name") as HTMLInputElement;
let userEmail = document.getElementById("email") as HTMLInputElement;
let userPassword = document.getElementById("password") as HTMLInputElement;
let userPhone = document.getElementById("phone") as HTMLInputElement;
let signUp = document.getElementById("signUp") as HTMLButtonElement;
let usersData: user[] = [];
type user = {
  name: string;
  email: string;
  phone: number;
  password: string;
};
let user: user = { name: "", email: "", phone: 0, password: "" };
let useName = /^[a-zA-Z0-9_ -]{3,15}$/;
let usePass = /^[a-zA-Z0-9_ -^]{8,20}$/;
let useEamil = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
let usePhone = /^(?:\+20|0)?1[0125]\d{8}$/;
// Validate Data
// validate on type
// visual updates
function validator(input: HTMLInputElement, reg: RegExp) {
  input.addEventListener("input", () => {
    let temp: string;
    temp = input.value;
    if (temp.length < 3 || !reg.test(temp)) {
      input.parentElement?.classList.add("wrong-input");
      input.parentElement?.classList.remove("correct-input");
    } else {
      input.parentElement?.classList.remove("wrong-input");
      input.parentElement?.classList.add("correct-input");
    }
  });
}
validator(userName, useName);
validator(userPassword, usePass);
validator(userPhone, usePhone);
validator(userEmail, useEamil);
userEmail.addEventListener("blur", validateUniqueEmail);
function validateUniqueEmail() {
  usersData.forEach((e) => {
    if (e.email == userEmail.value) {
      userEmail.parentElement?.classList.add("wrong-input");
      userEmail.parentElement?.classList.remove("correct-input");
      alert("this email is already registerd!");
    }
  });
}

// Store Data
// store in database
// unique values
signUp.addEventListener("click", () => {
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
  document.addEventListener("DOMContentLoaded", () => {
    const storedItems = localStorage.getItem("usersData");
    if (storedItems) {
      usersData = JSON.parse(storedItems);
    }
  });
})();

function saveToLocalStorage() {
  localStorage.setItem("usersData", JSON.stringify(usersData));
}
