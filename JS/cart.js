import {
  toggleMobileMenu,
  renderCartCounter,
  renderFavCounter,
  removeFromCart,
} from "./utils.js";

document.querySelector("#menu-btn").addEventListener("click", () => {
  toggleMobileMenu();
});

document.querySelector("#x-mark").addEventListener("click", () => {
  toggleMobileMenu();
});

function renderCheckoutSummary() {
  let checkoutSummary = document.querySelector(".cart-summary");
  checkoutSummary.replaceChildren();
  let cartProducts = JSON.parse(localStorage.getItem("cart")) || [];
  if (cartProducts.length === 0) {
    checkoutSummary.innerHTML = "<h3>Your cart is Empty</h3>";
    return;
  }

  let subTotal = cartProducts.reduce(
    (acc, item) => acc + item.price * (item.quantity || 1),
    0
  );
  let subTotalFixed = Number(subTotal).toFixed(2);
  let shipping = 5;
  let total = Number(subTotalFixed + shipping).toFixed(2);

  subTotal.toFixed(2);
  let checkoutBody = `
        <h3>Order Summary</h3>
        <div class="summary-row">
          <span>Subtotal</span>
          <span>$${subTotalFixed}</span>
        </div>
        <div class="summary-row">
          <span>Shipping</span>
          <span>$5.00</span>
        </div>
        <div class="summary-row total">
          <span>Total</span>
          <span>$${total}</span>
        </div>
        <button class="checkout-btn">Proceed to Checkout</button>
  `;
  checkoutSummary.insertAdjacentHTML("beforeend", checkoutBody);
  let checkoutBtn = document.querySelector(".checkout-btn");
  checkoutBtn.addEventListener("click", (e) => {
    let popup = document.querySelector(".checkout-popup");
    popup.classList.toggle("popup-toggle");
  });
}

function renderCartPage() {
  let cartItems = document.querySelector(".cart-items");
  cartItems.replaceChildren();
  renderCheckoutSummary();

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
            <button data-product-id="${
              element.id
            }" class="decrease-quantity">-</button>
            <span>${element.quantity}</span>
            <button data-product-id="${
              element.id
            }" class="increase-quantity">+</button>
          </div>
          <div class="item-price"><span>$${element.price}</span></div>
          <button class="remove-btn" data-product-id="${
            element.id
          }">Remove</button>
        </div>`;
    cartItems.insertAdjacentHTML("beforeend", cartItem);
  });
}

function attachCartEvents() {
  let cartItems = document.querySelector(".cart-items");

  cartItems.addEventListener("click", (e) => {
    let target = e.target;

    if (target.classList.contains("remove-btn")) {
      let id = target.dataset.productId;
      removeFromCart(id);
      renderCartPage();
      renderCartCounter();
    }

    if (target.classList.contains("increase-quantity")) {
      let id = target.dataset.productId;
      let products = JSON.parse(localStorage.getItem("cart")) || [];
      let product = products.find((item) => item.id == id);

      if (product) {
        product.quantity += 1;
        localStorage.setItem("cart", JSON.stringify(products));
        renderCartPage();
        renderCartCounter();
      }
    }

    if (target.classList.contains("decrease-quantity")) {
      let id = target.dataset.productId;
      let products = JSON.parse(localStorage.getItem("cart")) || [];
      let product = products.find((item) => item.id == id);

      if (product) {
        product.quantity -= 1;
        if (product.quantity <= 0) {
          products = products.filter((p) => p.id != id);
        }
        localStorage.setItem("cart", JSON.stringify(products));
        renderCartPage();
        renderCartCounter();
      }
    }
  });
}

renderCartPage();
renderCartCounter();
renderFavCounter();
renderCheckoutSummary();
attachCartEvents();

let closePopup = document.querySelector("#close-popup");
closePopup.addEventListener("click", (e) => {
  let popup = document.querySelector(".checkout-popup");
  popup.classList.toggle("popup-toggle");
});

let payForm = document.getElementById('pay-form');
let cardNumberInput = document.querySelector("#cardNumber");
let cvvInput = document.querySelector('#cvv');
let paymentSuccess = document.querySelector('.payment-successful');

payForm.addEventListener('submit', (e)=>{
  e.preventDefault();

  let CardNumberValue = cardNumberInput.value.trim();
  let cvvValue = cvvInput.value.trim();
  const cardNumberRegex = /^(?:\d{16}|\d{4}(?:[- ]\d{4}){3})$/;
  
  if (!cardNumberRegex.test(CardNumberValue)){
    alert('Wrong Card number!');
    cardNumberInput.focus();
    return;
  }

  if (cvvValue.length !== 3){
    alert('Cvv must be 3 digits!')
  }

  paymentSuccess.classList.toggle('popup-payment');

});