export function toggleMobileMenu() {
  let mobMenu = document.querySelector(".mobile-menu");
  mobMenu.classList.toggle("collapse");
}

export function openCategoryList() {
  let dropNavMenu = document.querySelector(".category_nav_list");
  dropNavMenu.classList.toggle("enable");
}

export async function addToCart(productId) {
  if (!productId) {
    throw new Error("Product ID required");
  }

  let product = await fetch(`https://dummyjson.com/products/${productId}`);

  product = await product.json();

  if ("message" in product) {
    console.error(`product with id ${productId} not found`);
    return;
  }

  if (!localStorage.getItem("cart")) {
    localStorage.setItem("cart", JSON.stringify([]));
  }

  let cart = JSON.parse(localStorage.getItem("cart"));

  let exist = cart.find((item) => item.id === product.id);

  if (!exist) {
    cart.push({ ...product, quantity: 1 });
  } else {
    exist.quantity += 1;
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  return cart;
}

export function removeFromCart(id) {
  let cart = JSON.parse(localStorage.getItem("cart"));
  let exist = cart.find((item) => item.id === id);

  if (exist) {
    exist.quantity -= 1;
    if (exist.quantity <= 0) {
      cart = cart.filter((item) => item.id !== id);
    }
  } else {
    return;
  }
  localStorage.setItem("cart", JSON.stringify(cart));

  return cart;
}

export async function addToFav(productId) {
  if (!productId) {
    throw new Error("Product ID required");
  }

  let product = await fetch(`https://dummyjson.com/products/${productId}`);

  product = await product.json();

  if ("message" in product) {
    console.error(`product with id ${productId} not found`);
    return;
  }

  if (!localStorage.getItem("fav")) {
    localStorage.setItem("fav", JSON.stringify([]));
  }

  let fav = JSON.parse(localStorage.getItem("fav"));

  let exist = fav.find((item) => item.id === product.id);

  if (!exist) {
    fav.push({ ...product, quantity: 1 });
  } else {
    exist.quantity += 1;
  }

  localStorage.setItem("fav", JSON.stringify(fav));
  return fav;
}

export async function removeFromFav(id){
  let fav = JSON.parse(localStorage.getItem("fav") || "[]");
  let exist = fav.find((item) => item.id === id);

  if (exist) {
    exist.quantity -= 1;
    if (exist.quantity <= 0) {
      fav = fav.filter((item) => item.id !== id);
    }
  } else {
    return;
  }
  localStorage.setItem("fav", JSON.stringify(fav));

  return fav;
}

export function renderCartCounter() {
  let cart = JSON.parse(localStorage.getItem("cart") || "[]");
  let favCounterSpan = document.getElementById("cart-counter");
  let totalSum = cart.reduce((sum, item) => sum + item.quantity, 0);
  favCounterSpan.innerHTML = totalSum;
}

export function renderFavCounter(){
  let fav = JSON.parse(localStorage.getItem("fav") || "[]");
  let favCounterSpan = document.getElementById("fav-counter");
  let totalSum = fav.reduce((sum, item) => sum + 1, 0);
  favCounterSpan.innerHTML = totalSum;
}