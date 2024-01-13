const userID = localStorage.getItem("UserID");

function openFormAdd() {
  document.getElementById("myFormAdd").style.display = "flex";
}

function closeFormAdd() {
  document.getElementById("myFormAdd").style.display = "none";
}

async function add(event) {
  event.preventDefault();
  const isValid = true;
  const isi = document.getElementById("addcat").value;
  var texts = document.getElementById("messages");

  if (!isi) {
    setError(texts, "Category Name is Required");
    isValid = false;
  } else {
    await addFunction(userID, isi);
    window.location.replace("category.html");
  }
}

async function addFunction(UserID, categoryName) {
  const data = {
    CategoryName: categoryName,
  };
  const response = await fetch(
    `https://localhost:7001/api/Category/AddCategory${UserID}`,
    {
      method: "POST",
      headers: {
        accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(data),
    }
  );
}
