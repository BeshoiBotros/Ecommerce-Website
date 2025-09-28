// imports all modules into main.js
import {
  getAllCategories,
  renderAllProducts,
  productsOfCategory,
  renderProductsBySearch,
} from "./controllersAndViews.js";

import {
  toggleMobileMenu,
  openCategoryList,
  addToCart,
  removeFromCart,
  renderCartCounter,
  addToFav,
  removeFromFav,
  renderFavCounter,
} from "./utils.js";
// -------------

document.getElementById("cat-btn").addEventListener("click", (e) => {
  openCategoryList();
});

document.getElementById("menu-btn").addEventListener("click", (e) => {
  toggleMobileMenu();
});

document.getElementById("x-mark").addEventListener("click", (e) => {
  toggleMobileMenu();
});

let carosalCounter = 0;

const carosalImages = ["./img/banner_home1.png", "./img/banner_home2.png"];

function carosalSlideRight() {
  if (carosalCounter == carosalImages.length - 1) {
    carosalCounter = 0;
    return carosalImages[carosalCounter];
  }

  carosalCounter += 1;
  return carosalImages[carosalCounter];
}

function carosalSlideLeft() {
  if (carosalCounter == 0) {
    carosalCounter = carosalImages.length - 1;
    return carosalImages[carosalCounter];
  }

  carosalCounter -= 1;
  return carosalImages[carosalCounter];
}

function changeImage(newSrc) {
  carosalCurrentImage.classList.add("fade-out");

  setTimeout(() => {
    carosalCurrentImage.src = newSrc;
    carosalCurrentImage.classList.remove("fade-out");
  }, 300);
}

document.getElementById("prevImg").addEventListener("click", () => {
  changeImage(carosalSlideLeft());
});

document.getElementById("nxtImg").addEventListener("click", () => {
  changeImage(carosalSlideRight());
});

getAllCategories();

// ------------------------------------------------------------------

let page1Btn = document.getElementById("page-1");
let page2Btn = document.getElementById("page-2");
let page3Btn = document.getElementById("page-3");
let page4Btn = document.getElementById("page-4");
let page5Btn = document.getElementById("page-5");
let prevPage = document.getElementById("prevPage");
let nextPage = document.getElementById("nextPage");
let allProducts = document.getElementById("allProducts");
let currentPage = 1;

async function checkValidateOfPrevButton() {
  document.getElementById("pagination").classList.remove("disable");
  await new Promise((r) => setTimeout(r, 0));

  const firstChild = allProducts.firstElementChild;

  if (!firstChild) {
    prevPage.classList.remove("active");
    prevPage.classList.add("disable");
    return false;
  }

  if (Number(allProducts.firstElementChild.id) < 20) {
    prevPage.classList.remove("active");
    prevPage.classList.add("disable");
    return false;
  } else {
    prevPage.classList.remove("disable");
    prevPage.classList.add("active");
    return true;
  }
}

async function checkValidateOfNextButton() {
  document.getElementById("pagination").classList.remove("disable");
  await new Promise((r) => setTimeout(r, 0));

  const firstChild = allProducts.firstElementChild;

  if (!firstChild) {
    nextPage.classList.remove("active");
    nextPage.classList.add("disable");
    return false;
  }

  const firstId = Number(firstChild.id);

  if (firstId >= 188) {
    nextPage.classList.remove("active");
    nextPage.classList.add("disable");
    return false;
  } else {
    nextPage.classList.remove("disable");
    nextPage.classList.add("active");
    return true;
  }
}

export const pageButtons = [page1Btn, page2Btn, page3Btn, page4Btn, page5Btn];

pageButtons.forEach((btn) => {
  btn.addEventListener("click", async () => {
    pageButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    await renderAllProducts((+btn.dataset.pageId - 1) * 20);
    await checkValidateOfPrevButton();
    await checkValidateOfNextButton();
    currentPage = +btn.dataset.pageId;
  });
});

checkValidateOfPrevButton();
checkValidateOfNextButton();

prevPage.addEventListener("click", async () => {
  const firstId = Number(allProducts.firstElementChild.id);

  if (firstId >= 20) {
    const newOffset = firstId - 20;
    await renderAllProducts(newOffset);
    console.log("New first product id:", newOffset);
  }

  await checkValidateOfPrevButton();
  await checkValidateOfNextButton();
  currentPage -= 1;

  const currentPageBtn = document.querySelector(
    `[data-page-id="${currentPage}"]`
  );
  const lastPageBtn = document.querySelector(
    `[data-page-id="${currentPage + 1}"]`
  );

  if (lastPageBtn) lastPageBtn.classList.remove("active");
  if (currentPageBtn) currentPageBtn.classList.add("active");
  document.getElementById("pagination").classList.remove("disable");
});

nextPage.addEventListener("click", async () => {
  if (allProducts.firstElementChild) {
    const firstId = Number(allProducts.firstElementChild.id);

    if (firstId < 194) {
      const newOffset = firstId + 20;
      await renderAllProducts(newOffset);
      console.log("New first product id:", newOffset);
    }

    await checkValidateOfPrevButton();
    await checkValidateOfNextButton();

    currentPage += 1;

    const currentPageBtn = document.querySelector(
      `[data-page-id="${currentPage}"]`
    );
    const lastPageBtn = document.querySelector(
      `[data-page-id="${currentPage - 1}"]`
    );

    if (lastPageBtn) lastPageBtn.classList.remove("active");
    if (currentPageBtn) currentPageBtn.classList.add("active");
  } else {
    await checkValidateOfNextButton();
  }
  document.getElementById("pagination").classList.remove("disable");
});

// --------------------------------------------
// handle category links

const categoriesItemsLinks = document.querySelectorAll("[data-category-name]");

categoriesItemsLinks.forEach((element) => {
  element.addEventListener("click", async (e) => {
    e.preventDefault();
    let catName = element.innerHTML;
    await productsOfCategory(catName);
  });
});

// ---------------------------------------
// Handle search

let searchForm = document.getElementById("search-form");

searchForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  let searchQuery = document.getElementById("search-input").value;
  await renderProductsBySearch(searchQuery);
  await checkValidateOfPrevButton();
  await checkValidateOfNextButton();
});

renderCartCounter();

let addToCartBtns = document.querySelectorAll("[data-product-id]");
addToCartBtns.forEach((element) => {
  element.addEventListener("click", async () => {
    if (element.classList.contains("cart-btn-clicked")) {
      await removeFromCart(+element.dataset.productId);
    } else {
      await addToCart(+element.dataset.productId);
    }
    renderCartCounter();
    element.classList.toggle("cart-btn-clicked");
    element.classList.toggle("add-to-cart");
    element.innerText = element.classList.contains("cart-btn-clicked")
      ? "Remove from Cart"
      : "Add to Cart";
  });
});
renderFavCounter();
let addToFavBtns = document.querySelectorAll("[data-fav-product-id]");
addToFavBtns.forEach((element) => {
  element.addEventListener("click", async () => {
    if (element.classList.contains("fav-btn-clicked")) {
      await removeFromFav(+element.dataset.favProductId);
    } else {
      await addToFav(+element.dataset.favProductId);
    }
    renderFavCounter();
    element.classList.toggle("fav-btn-clicked");
    element.classList.toggle("like-btn");
  });
});
