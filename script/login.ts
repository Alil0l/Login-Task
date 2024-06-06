let loginEmail = document.getElementById("email") as HTMLInputElement;
let loginPassword = document.getElementById("password") as HTMLInputElement;
let logIn = document.getElementById("logIn") as HTMLButtonElement;
let popUp = document.querySelector(".popup") as HTMLElement;
let usersData: user[] = [];
type user = {
  name: string;
  email: string;
  phone: string;
  password: string;
};
(function loadSaved() {
  document.addEventListener("DOMContentLoaded", () => {
    const storedItems = localStorage.getItem("usersData");
    if (storedItems) {
      usersData = JSON.parse(storedItems);
    }
  });
})();

// Validate login cerdintials

logIn.addEventListener("click", validateLogIn);
function validateLogIn() {
  let correctLogin = { isOk: false };
  usersData.forEach((e) => {
    if (loginEmail.value === e.email && loginPassword.value === e.password) {
      correctLogin.isOk = true;
    }
  });
  if (correctLogin.isOk == true) {
    popUp.innerHTML = `<p>Welcome back ✔</p>`;
    popUp.style.top = "90%";
    setTimeout(() => {
      popUp.style.top = "140%";
      window.location.href = "../login.html";
    }, 2000);
  } else {
    popUp.innerHTML = `<p>Email or Password isn't correct ✖</p>`;
    popUp.style.top = "90%";
    setTimeout(() => {
      popUp.style.top = "140%";
    }, 2000);
  }
}

// Show popup with content
