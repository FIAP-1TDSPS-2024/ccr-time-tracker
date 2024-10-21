function navigate(path) {
  window.location.href = path;
}

function exit() {
  navigate("../index.html");
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
    url: "../tmp/index.html",
    favorite: true,
  },
  {
    name: "TEPP",
    icon: "../img/train.svg",
    url: "./index.html",
    favorite: false,
  },
];

function createItems(categoryName) {
  const categoryList = document.getElementById(categoryName);

  while (categoryList.firstChild) {
    categoryList.removeChild(categoryList.firstChild);
  }

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
    item.onclick = function () {
      navigate(categoryItem.url);
    };
    item.innerHTML = `
      <img src="${categoryItem.icon}" class="categoryIcon">
      <img onclick="setFavorite(this)" value="${
        categoryItem.name
      }" class="star" src="${
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
    addItem.onclick = showAddItemPopUp;
    addItem.innerHTML = `
    <a>+</a>
  `;
    categoryList.appendChild(addItem);
  }
}

function showAddItemPopUp() {
  const addItemPopUp = document.getElementById("addItemPopUp");
  addItemPopUp.style.display = "flex";
}

function closeAddItemPopUp() {
  const addItemPopUp = document.getElementById("addItemPopUp");
  addItemPopUp.style.display = "none";
}

function addItem() {
  const itemSlug = document.getElementById("itemSlug");
  const itemURL = document.getElementById("itemURL");

  allItems.push({
    name: itemSlug.value,
    icon: "../img/train.svg",
    url: itemURL.value,
    favorite: false,
  });

  createItems("all");
  createItems("favorites");

  closeAddItemPopUp();
}

function setFavorite(element) {
  const itemName = element.getAttribute("value");
  const index = allItems.findIndex((item) => item.name === itemName);

  allItems[index].favorite = !allItems[index].favorite;

  createItems("all");
  createItems("favorites");
}

createItems("all");
createItems("favorites");
