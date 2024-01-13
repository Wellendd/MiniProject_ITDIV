const form = document.getElementById("form");

const Name = document.getElementById("name");
const Email = document.getElementById("eAddress");
const Password = document.getElementById("pass");
const Confirms = document.getElementById("conpass");
var checkbox = document.getElementById("checkbox");


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
  const nameValue = Name.value.trim();
  const emailValue = Email.value.trim();
  const passwordValue = Password.value.trim();
  const confirmsValue = Confirms.value.trim();
  var texts = document.getElementById("messages");

  if (nameValue == "") {
    setError(Name, "Name is Required");
    isValid = false;
  } else {
    setSuccess(Name);
  }

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
  } else if (passwordValue.length < 8) {
    setError(Password, "Password must be at least 8 characters");
    isValid = false;
  } else if (!/[A-Z]/.test(passwordValue)) {
    setError(Password, "Password must be at least one uppercase letter");
    isValid = false;
  } else if (!/[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(passwordValue)) {
    setError(Password, "Password must be at least one symbol");
    isValid = false;
  } else if (!/\d/.test(passwordValue)) {
    setError(Password, "Password must be at least one number digit");
    isValid = false;
  } else {
    setSuccess(Password);
  }

  if (confirmsValue == "") {
    setError(Confirms, "Please confirm your password");
    isValid = false;
  } else if (passwordValue != confirmsValue) {
    setError(Confirms, "Password doesn't match");
    isValid = false;
  } else {
    setSuccess(Confirms);
  }

  if (!checkbox.checked == true) {
    texts.style.display = "block";
    isValid = false;
  } else {
    texts.style.display = "none";
  }

  if (isValid) {
    document.getElementById("form").onsubmit = addUser();
  }
}
