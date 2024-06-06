let userName = document.getElementById("name") as HTMLInputElement;
let userEmail = document.getElementById("email") as HTMLInputElement;
let userPassword = document.getElementById("password") as HTMLInputElement;
let userPhone = document.getElementById("phone") as HTMLInputElement;
let signUp = document.getElementById("signUp") as HTMLButtonElement;
let popUp = document.querySelector(".popup") as HTMLElement;
let isUnique: boolean = false;
let usersData: user[] = [];

type user = {
  name: string;
  email: string;
  phone: string;
  password: string;
};

let validationStates = {
  name: false,
  email: false,
  password: false,
  phone: false,
};

let useName = /^[a-zA-Z0-9_ -]{3,15}$/;
let usePass = /^[a-zA-Z0-9_ -^]{8,20}$/;
let useEmail = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
let usePhone = /^(?:\+20|0)?1[0125]\d{8}$/;

// Validating functions
function validator(
  input: HTMLInputElement,
  reg: RegExp,
  type: keyof typeof validationStates
) {
  input.addEventListener("input", () => {
    let temp: string = input.value;
    if (temp.length < 3 || !reg.test(temp)) {
      input.parentElement?.classList.add("wrong-input");
      input.parentElement?.classList.remove("correct-input");
      validationStates[type] = false;
    } else {
      input.parentElement?.classList.remove("wrong-input");
      input.parentElement?.classList.add("correct-input");
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
  isUnique =
    !usersData.some((e) => e.email === userEmail.value) &&
    userEmail.value != "";
  return isUnique;
}

// Signup button actions
signUp.addEventListener("click", () => {
  signUp.innerHTML = `<img class="rotate" src="./assets/imgs/loading.png" alt="loading">`;
  signUp.toggleAttribute("disabled");

  // Validate unique email
  validateUniqueEmail();

  setTimeout(() => {
    const allValid =
      validationStates.name &&
      validationStates.password &&
      validationStates.phone &&
      validationStates.email &&
      isUnique;

    if (allValid) {
      popUp.style.top = "90%";
      popUp.innerHTML = `<p>Signed Up Successfully ✔</p>`;
      const newUser: user = {
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
      setTimeout(() => {
        popUp.style.top = "140%";
        window.location.href = "../login.html";
      }, 2000);
    } else {
      popUp.style.top = "90%";
      popUp.innerHTML = `<p>Failed to sign up ✖</p>`;
      validationStates.name == true
        ? null
        : userName.parentElement?.classList.add("wrong-input");
      validationStates.email == true
        ? null
        : userEmail.parentElement?.classList.add("wrong-input");
      validationStates.password == true
        ? null
        : userPassword.parentElement?.classList.add("wrong-input");
      validationStates.phone == true
        ? null
        : userPhone.parentElement?.classList.add("wrong-input");
      setTimeout(() => {
        popUp.style.top = "140%";
      }, 2000);
    }
    signUp.innerHTML = "Sign Up";
    signUp.toggleAttribute("disabled");
  }, 1500);
});

// Data fetching and saving
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
