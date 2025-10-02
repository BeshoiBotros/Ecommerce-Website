import { toggleMobileMenu, renderCartCounter, renderFavCounter, removeFromFav } from "./utils.js";



document.querySelector("#menu-btn").addEventListener("click", () => {
  toggleMobileMenu();
});

document.querySelector("#x-mark").addEventListener("click", () => {
  toggleMobileMenu();
});


function renderFavPage() {

  let favItems = document.querySelector(".products-grid");
  favItems.replaceChildren();
  
  let favProducts = JSON.parse(localStorage.getItem("fav")) || [];

  favProducts.forEach((element) => {
    let favItem = `
        <div class="product-card">
          <div class="product-image">
            <img src="${element.thumbnail}" alt="Product 1" />
          </div>
          <div class="product-info">
            <h3>${element.title}</h3>
            <p>Short description of product 1.</p>
            <div class="price">$${element.price}</div>
            <button class="remove-btn" data-product-id=${element.id}>Remove</button>
          </div>
        </div>`;
    favItems.insertAdjacentHTML("beforeend", favItem);
  });

  let removeBtns = document.querySelectorAll(".remove-btn");
  removeBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      removeFromFav(Number(btn.dataset.productId));
      renderFavPage();
      renderFavCounter();
    });
  });
}

renderFavPage();
renderCartCounter();
renderFavCounter();

let removeBtns = document.querySelectorAll(".remove-btn");

removeBtns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    removeFromFav(btn.dataset.productIdToRemove);
    renderFavPage();
    renderFavCounter();
  });
});
