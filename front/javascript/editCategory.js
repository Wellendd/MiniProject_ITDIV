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

var ID;
function openFormEdit(categoryID) {
  ID = categoryID;
  document.getElementById("myFormEdit").style.display = "flex";
}

function closeFormEdit() {
  document.getElementById("myFormEdit").style.display = "none";
}

async function edit(event) {
  event.preventDefault();
  const isValid = true;
  const isi = document.getElementById("editcat").value;
  var texts = document.getElementById("messages");
  console.log(isi);
  if (!isi) {
    console.log(isi);
    setError(texts, "Category Name is Required");
    isValid = false;
  } else {
    await editFunction(ID, isi);
    window.location.replace("category.html");
  }
}

async function editFunction(CategoryID, categoryName) {
  const data = {
    CategoryName: categoryName,
  };
  const response = await fetch(
    `https://localhost:7001/api/Category/UpdateCategory${CategoryID}`,
    {
      method: "PUT",
      headers: {
        accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(data),
    }
  );
}
