// controllers
export async function getAllCategories() {
  let categories = await fetch("https://dummyjson.com/products/category-list");
  categories = categories.json();
  return categories;
}

export async function getAllProducts(skip = 0) {
  let products = await fetch(
    `https://dummyjson.com/products/?skip=${skip}&limit=20`
  );
  return products.json();
}

// views
export async function renderCategoryList() {
  const catList = document.getElementById("cat-list");
  catList.innerHTML = "";
  let categories = await getAllCategories();

  categories.forEach((element) => {
    const a = document.createElement("a");
    a.href = "#";
    a.innerHTML = element;
    catList.appendChild(a);
  });
}

function renderSkeletonCards(count = 12) {
  const allProducts = document.getElementById("allProducts");
  allProducts.replaceChildren();

  for (let i = 0; i < count; i++) {
    let skeleton = `
      <div class="product-card skeleton">
        <div class="card-image skeleton-box"></div>
        <div class="card-body">
          <div class="skeleton-line title"></div>
          <div class="skeleton-line price"></div>
          <div class="skeleton-button"></div>
        </div>
      </div>
    `;
    allProducts.insertAdjacentHTML("beforeend", skeleton);
  }
}

export async function renderAllProducts(skip = 0) {
  const allProducts = document.getElementById("allProducts");

  renderSkeletonCards();

  let productsObject = await getAllProducts(skip);
  let products = productsObject.products;
  allProducts.replaceChildren();

  products.forEach((element) => {
    let card = `
      <div class="product-card" id="${element.id}">
        <div class="card-image">
          <a href="#"></a>
          <img src="${element.thumbnail}" alt="${element.title}" />
          <button class="like-btn">
            <i class="fa-regular fa-heart"></i>
          </button>
        </div>
        <div class="card-body">
          <h3 class="product-title">${element.title}</h3>
          <p class="product-description">${element.description}</p>
          <p class="product-price">$${element.price}</p>
          <button class="add-to-cart">
            <i class="fa-solid fa-cart-shopping"></i> Add to Cart
          </button>
        </div>
      </div>
    `;
    allProducts.insertAdjacentHTML("beforeend", card);
  });
}

// call views
await renderCategoryList();
await renderAllProducts();
