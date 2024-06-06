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
  usersData.forEach((e) => {
    if (loginEmail.value === e.email && loginPassword.value === e.password) {
      popUp.style.top = "90%";
      popUp.innerHTML = `<p>Logging in now ✔</p>`;
      setTimeout(() => {
        popUp.style.top = "140%";
        window.location.href = "../login.html";
      }, 2000);
    } else {
      popUp.style.top = "90%";
      popUp.innerHTML = `<p>Email or Password isn't correct ✖</p>`;
      setTimeout(() => {
        popUp.style.top = "140%";
      }, 2000);
    }
  });
}

// Show popup with content
