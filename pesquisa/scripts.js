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

const allItems = [
  {
    name: "TMP",
    icon: "../img/clock.svg",
    favorite: true,
  },
  {
    name: "TEPP",
    icon: "../img/train.svg",
  },
];

function createItems(categoryName) {
  const categoryList = document.getElementById(categoryName);

  let categoryItems = [];
  if (categoryName == "favorites") {
    categoryItems = allItems.filter((item) => item.favorite);
  } else {
    categoryItems = allItems;
  }

  for (let i = 0; i < categoryItems.length; i++) {
    const categoryItem = categoryItems[i];

    const item = document.createElement("div");
    item.className = "categoryItem";
    item.innerHTML = `
      <img src="${categoryItem.icon}" class="categoryIcon">
      <img class="star" src="${
        categoryItem.favorite ? "../img/star.svg" : "../img/star-disabled.svg"
      }" />
      <div class="categoryName"><a>${categoryItem.name}</a></div>
    `;

    categoryList.appendChild(item);
  }

  // Add item button
  if (categoryName == "all") {
    const addItem = document.createElement("div");
    addItem.className = "addItem shadow";
    addItem.innerHTML = `
    <a>+</a>
  `;
    categoryList.appendChild(addItem);
  }
}

createItems("all");
createItems("favorites");
