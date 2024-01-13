function openFormDelete(categoryID) {
  ID = categoryID;
  document.getElementById("myFormDelete").style.display = "flex";
}

function closeFormDelete() {
  document.getElementById("myFormDelete").style.display = "none";
}

async function deleteCat() {
  await deleteFunction(ID);
  window.location.replace("category.html");
}

async function deleteFunction(CategoryID) {
  const response = await fetch(
    `https://localhost:7001/api/Category/DeleteCategory${CategoryID}`,
    {
      method: "DELETE",
      headers: {
        accept: "application/json",
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json;charset=utf-8",
      },
    }
  );
}
