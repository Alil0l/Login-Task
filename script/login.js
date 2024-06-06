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
    usersData.forEach(function (e) {
        if (loginEmail.value === e.email && loginPassword.value === e.password) {
            popUp.style.top = "90%";
            popUp.innerHTML = "<p>Logging in now \u2714</p>";
            setTimeout(function () {
                popUp.style.top = "140%";
                window.location.href = "../login.html";
            }, 2000);
        }
        else {
            popUp.style.top = "90%";
            popUp.innerHTML = "<p>Email or Password isn't correct \u2716</p>";
            setTimeout(function () {
                popUp.style.top = "140%";
            }, 2000);
        }
    });
}
// Show popup with content
