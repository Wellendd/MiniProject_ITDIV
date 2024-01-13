const isLoggedIn = localStorage.getItem("isLoggedIn");
const users = localStorage.getItem("UserName");
console.log(users);

if (isLoggedIn === "true") {
  const logregMenu = document.querySelector(".right");
  logregMenu.style.display = "none";

  const dropdownMenu = document.querySelector(".dropdown");
  dropdownMenu.style.display = "inline-block";

  const userNames = document.getElementById("username");
  userNames.innerHTML = users;
} else {
  const logregMenu = document.querySelector(".right");
  logregMenu.style.display = "block";

  const dropdownMenu = document.querySelector(".dropdown");
  dropdownMenu.style.display = "none";
}

function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

window.onclick = function (event) {
  if (!event.target.matches(".dropbtn")) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }
};

function logout() {
  localStorage.removeItem("isLoggedIn");
  localStorage.setItem("UserID", "null");
  window.location.replace("login.html");
}
