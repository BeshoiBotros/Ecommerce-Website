import { toggleMobileMenu, renderCartCounter, renderFavCounter, removeFromCart } from "./utils.js";



document.querySelector("#menu-btn").addEventListener("click", () => {
  toggleMobileMenu();
});

document.querySelector("#x-mark").addEventListener("click", () => {
  toggleMobileMenu();
});

function renderCartPage() {
    let cartItems = document.querySelector(".cart-items");
    cartItems.replaceChildren();

    let cartProducts = JSON.parse(localStorage.getItem("cart")) || [];

    cartProducts.forEach((element) => {
        let cartItem = `
        <div class="cart-item">
          <img src="${element.thumbnail}" alt="Product" />
          <div class="item-info">
            <h4>${element.title}</h4>
            <p>${element.description.slice(0, 70)} ...</p>
          </div>
          <div class="item-quantity">
            <button data-products-id="${element.id}" class="decrease-quantity">-</button>
            <span>${element.quantity}</span>
            <button data-products-id="${element.id}" class="increase-quantity">+</button>
          </div>
          <div class="item-price"><span>$${element.price}</span></div>
          <button class="remove-btn" data-product-id-to-remove="${element.id}">Remove</button>
        </div>`;
        cartItems.insertAdjacentHTML("beforeend", cartItem);
    });

    let removeBtns = document.querySelectorAll('.remove-btn');
    removeBtns.forEach((btn)=>{
        btn.addEventListener('click', (e) => {
            removeFromCart(btn.dataset.productIdToRemove);
            renderCartPage();
            renderCartCounter();
        });
    });
}


renderCartPage();
renderCartCounter();
renderFavCounter();

let removeBtns = document.querySelectorAll('.remove-btn');

removeBtns.forEach((btn)=>{
    btn.addEventListener('click', (e) => {
        removeFromCart(btn.dataset.productIdToRemove);
        renderCartPage();
        renderCartCounter();
    });
});