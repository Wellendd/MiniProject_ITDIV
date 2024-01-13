async function checkLogin() {
  const Logins = localStorage.getItem("UserID");
  console.log(Logins);
  if (Logins === null) {
    window.location.location("login.html");
  }
}
