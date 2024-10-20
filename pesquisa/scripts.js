function exit() {
  window.location.href = "../index.html";
}

function search() {
  var search = document.getElementById("search").value;
  const items = document.getElementsByClassName("categoryItem");

  if (search !== "") {
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      const title = item.getElementsByClassName("categoryName")[0];
      const titleText = title.innerText;

      if (titleText.toLowerCase().includes(search.toLowerCase())) {
        item.style.display = "flex";
      } else {
        item.style.display = "none";
      }
    }
  } else {
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      item.style.display = "flex";
    }
  }
}
