const api_url = "https://localhost:7001/api/Users/Register";

async function addUser() {
  try {
    const name = document.getElementById("name");
    const email = document.getElementById("eAddress");
    const passwords = document.getElementById("pass");
    const confirmPasswords = document.getElementById("conpass");

    const user = {
      Name: name.value.trim(),
      Email: email.value.trim(),
      Passwords: passwords.value.trim(),
      ConfirmPasswords: confirmPasswords.value.trim(),
    };

    const response = await fetch(api_url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(user),
    });

    const result = await response.json();
    if (result === "User Successfully Added") {
      window.alert("User Successfully Registered");
      Name.value = "";
      Email.value = "";
      Password.value = "";
      Confirms.value = "";
    } else {
      window.alert("User Already Exists");
    }
  } catch (err) {
    console.log("An Error Occured: ", err);
  }
}
