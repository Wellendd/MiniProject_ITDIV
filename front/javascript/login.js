const form = document.getElementById("form");

const Email = document.getElementById("eAddress");
const Password = document.getElementById("pass");
const Remember = document.getElementById("remember");

const setError = (element, message) => {
  const input = element.parentElement;
  const errorDisplay = input.querySelector(".error");

  errorDisplay.innerText = message;
  input.classList.add("error");
  input.classList.remove("success");
};

const setSuccess = (element) => {
  const input = element.parentElement;
  const errorDisplay = input.querySelector(".error");

  errorDisplay.innerText = "";
  input.classList.add("success");
  input.classList.remove("error");
};

function isEmailValid(email) {
  var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  return mailformat.test(email);
}

function validateInputs(event) {
  event.preventDefault();

  var isValid = true;
  const emailValue = Email.value.trim();
  const passwordValue = Password.value.trim();

  if (emailValue == "") {
    setError(Email, "Email is Required");
    isValid = false;
  } else if (!isEmailValid(emailValue)) {
    setError(Email, "Email is not valid");
    isValid = false;
  } else {
    setSuccess(Email);
  }

  if (passwordValue == "") {
    setError(Password, "Password is Required");
    isValid = false;
  } else {
    setSuccess(Password);
  }

  if (isValid) {
    document.getElementById("form").onsubmit = basicLogin(Email, Password);
  }
}
