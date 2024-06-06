var loginEmail = document.getElementById("email");
var loginPassword = document.getElementById("password");
var logIn = document.getElementById("logIn");
var popUp = document.querySelector(".popup");
var usersData = [];
(function loadSaved() {
    document.addEventListener("DOMContentLoaded", function () {
        var storedItems = localStorage.getItem("usersData");
        if (storedItems) {
            usersData = JSON.parse(storedItems);
        }
    });
})();
// Validate login cerdintials
logIn.addEventListener("click", validateLogIn);
function validateLogIn() {
    var correctLogin = { isOk: false };
    usersData.forEach(function (e) {
        if (loginEmail.value === e.email && loginPassword.value === e.password) {
            correctLogin.isOk = true;
        }
    });
    if (correctLogin.isOk == true) {
        popUp.innerHTML = "<p>Welcome back \u2714</p>";
        popUp.style.top = "90%";
        setTimeout(function () {
            popUp.style.top = "140%";
            window.location.href = "../login.html";
        }, 2000);
    }
    else {
        popUp.innerHTML = "<p>Email or Password isn't correct \u2716</p>";
        popUp.style.top = "90%";
        setTimeout(function () {
            popUp.style.top = "140%";
        }, 2000);
    }
}
// Show popup with content
