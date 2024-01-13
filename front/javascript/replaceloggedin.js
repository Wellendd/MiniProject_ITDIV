const isLogged = localStorage.getItem("isLoggedIn");

if (isLogged === "true") {
  const replaceText = document.getElementById("replace");
  replaceText.textContent = "You are logged in!";
} else {
  const replaceText = document.getElementById("replace");
  replaceText.textContent = "You are not logged in";
}
