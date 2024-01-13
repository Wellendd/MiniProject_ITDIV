// hide content
const Logs = localStorage.getItem("isLoggedIn");

if (Logs === "true") {
  const logs = document.querySelector(".contentp");
  logs.style.display = "flex";

  const foot = document.querySelector(".foots");
  foot.style.display = "block";
} else {
  const logs = document.querySelector(".contentp");
  logs.style.display = "none";

  const foot = document.querySelector(".foots");
  foot.style.display = "none";
}

// get category data
const getID = localStorage.getItem("UserID");
const api_url = `https://localhost:7001/api/Category/CategoryList${getID}`;

async function getapi(url) {
  if (getID === "null") {
    window.location.replace("login.html");
    return;
  }

  const response = await fetch(url, {
    method: "GET",
    headers: {
      accept: "application/json",
      "Access-Control-Allow-Origin": "*",
      ContentType: "application/json;charset=utf-8",
    },
  });

  const result = await response.json();
  console.log(result.payload);
  show(result.payload);
}

getapi(api_url);

function show(data) {
  let table =
    "<table><tr><th>No.</th><th>Category Name</th><th>Action</th></tr>";
  let number = 1;
  for (let r of data) {
    table += `
      <tr>
        <td>${number++}</td>
        <td>${r.categoryName}</td>
        <td class="editdel"><button class="edit" onclick="openFormEdit(${
          r.categoryID
        })">Edit</button><button class="delete" onclick="openFormDelete(${
      r.categoryID
    })">Delete</button></td>
      </tr>`;
  }

  table += "</table>";

  document.getElementById("categories").innerHTML = table;
}
