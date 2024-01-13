//HAMBURGER MENU

// toggle class active
const navbarNav = document.querySelector(".navbarmenu");

//ketika hamburger menu di klik
document.querySelector("#hamburger-menu").onclick = () => {
  navbarNav.classList.toggle("active");
};
