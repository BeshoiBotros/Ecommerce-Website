// imports all modules into main.js
import { getAllCategories, renderAllProducts } from "./controllersAndViews.js";
// -------------

function openCategoryList() {
  let dropNavMenu = document.querySelector(".category_nav_list");
  dropNavMenu.classList.toggle("enable");
}

document.getElementById("cat-btn").addEventListener("click", (e) => {
  openCategoryList();
});

function toggleMobileMenu() {
  let mobMenu = document.querySelector(".mobile-menu");
  mobMenu.classList.toggle("collapse");
}

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

const pageButtons = [page1Btn, page2Btn, page3Btn, page4Btn, page5Btn];

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
});
