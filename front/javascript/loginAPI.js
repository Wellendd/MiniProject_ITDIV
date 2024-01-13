const api_url = "https://localhost:7001/api/Users/Login";

async function basicLogin(email, passwords) {
  try {
    const user = {
      Email: email.value.trim(),
      Passwords: passwords.value.trim(),
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
    if (response.status == 200) {
      localStorage.setItem("UserID", result.userID.trim());
      localStorage.setItem("UserName", result.name.trim());
      localStorage.setItem("isLoggedIn", "true");
      window.alert("Login Successfull");
      window.location.replace("WearHouse.html");
    } else if (response.status === 404) {
      window.alert("Invalid Email Address or Wrong Password");
      localStorage.setItem("isLoggedIn", "false");
    } else {
      window.alert("An error occurred during login.");
      localStorage.setItem("isLoggedIn", "false");
    }
  } catch (err) {
    console.log("An Error Occured: ", err);
  }
}
