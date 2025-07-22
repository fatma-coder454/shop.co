
const newArrivalsContainer = document.getElementById("new-arrivals");

const newArrivals = [
  {
    image: "img/Frame 32.png",
    title: "T-shirt with Tape Details",
    price: 120,
    rating: 4.5
  },
  {
    image: "img/Frame 33.png",
    title: "Skinny Fit Jeans",
    price: 240,
    oldPrice: 260,
    rating: 3.5
  },
  {
    image: "img/Frame 34.png",
    title: "Checkered Shirt",
    price: 180,
    rating: 4.5
  },
  {
    image: "img/Frame 38.png",
    title: "Sleeve Striped T-shirt",
    price: 130,
    oldPrice: 160,
    rating: 4.5
  }
];

newArrivals.forEach(product => {
  const card = document.createElement("div");
  card.className = "product-card";

  const stars = "★".repeat(Math.floor(product.rating)) + "☆".repeat(5 - Math.floor(product.rating));
  const ratingText = `${product.rating.toFixed(1)}/5`;

  const oldPriceHTML = product.oldPrice
    ? `<span class="old-price">$${product.oldPrice}</span>
       <span class="discount">-${Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%</span>`
    : "";

  card.innerHTML = `
    <div class="product-image">
      <img src="${product.image}" alt="${product.title}">
    </div>
    <div class="product-info">
      <h3 class="product-name">${product.title}</h3>
      <div class="product-rating">
        <div class="stars">
          <span>${stars}</span>
          <span class="rating-text">${ratingText}</span>
        </div>
      </div>
      <div class="product-price">
        <span class="current-price">$${product.price}</span>
        ${oldPriceHTML}
      </div>
    </div>
  `;


    card.addEventListener("click", () => {
    localStorage.setItem("selectedProduct", JSON.stringify(product));
    window.location.href = "product.html"; // عدلي الاسم حسب صفحة التفاصيل عندك
  });

  // youMightLikeContainer.appendChild(card);
  newArrivalsContainer.appendChild(card);
});







  const topSellingContainer = document.getElementById("top-selling");

const topSellingProducts = [
  {
    image: "img/Frame 32 (1).png",
    title: "Vertical Striped Shirt",
    price: 212,
    oldPrice: 232,
    rating: 5.0
  },
  {
    image: "img/Frame 33 (1).png",
    title: "Courage Graphic T-shirt",
    price: 145,
    rating: 4.0
  },
  {
    image: "img/Frame 34 (1).png",
    title: "Loose Fit Bermuda Shorts",
    price: 80,
    rating: 3.0
  },
  {
    image: "img/Frame 38 (1).png",
    title: "Faded Skinny Jeans",
    price: 210,
    rating: 4.5
  }
];

topSellingProducts.forEach(product => {
  const card = document.createElement("div");
  card.className = "product-card";

  const stars = "★".repeat(Math.floor(product.rating)) + "☆".repeat(5 - Math.floor(product.rating));
  const ratingText = `${product.rating.toFixed(1)}/5`;

  const oldPriceHTML = product.oldPrice
    ? `<span class="old-price">$${product.oldPrice}</span>
       <span class="discount">-${Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%</span>`
    : "";

  card.innerHTML = `
    <div class="product-image">
      <img src="${product.image}" alt="${product.title}">
    </div>
    <div class="product-info">
      <h3 class="product-name">${product.title}</h3>
      <div class="product-rating">
        <div class="stars">
          <span>${stars}</span>
          <span class="rating-text">${ratingText}</span>
        </div>
      </div>
      <div class="product-price">
        <span class="current-price">$${product.price}</span>
        ${oldPriceHTML}
      </div>
    </div>
  `;



    card.addEventListener("click", () => {
    localStorage.setItem("selectedProduct", JSON.stringify(product));
    window.location.href = "product.html"; // عدلي الاسم حسب صفحة التفاصيل عندك
  });

  // youMightLikeContainer.appendChild(card);
  topSellingContainer.appendChild(card);
});





const productContainer = document.getElementById("product-details");

const selectedProduct = JSON.parse(localStorage.getItem("selectedProduct"));

if (selectedProduct) {
  const stars = "★".repeat(Math.floor(selectedProduct.rating)) + "☆".repeat(5 - Math.floor(selectedProduct.rating));
  const ratingText = `${selectedProduct.rating.toFixed(1)}/5`;

  const oldPriceHTML = selectedProduct.oldPrice
    ? `<span class="old-price">$${selectedProduct.oldPrice}</span>
       <span class="discount">-${Math.round(((selectedProduct.oldPrice - selectedProduct.price) / selectedProduct.oldPrice) * 100)}%</span>`
    : "";

  productContainer.innerHTML = `
    <div class="product-page-image">
      <img src="${selectedProduct.image}" alt="${selectedProduct.title}">
    </div>
    <div class="product-page-info">
      <h1>${selectedProduct.title}</h1>
      <div class="rating">
        <span>${stars}</span> <span>${ratingText}</span>
      </div>
      <div class="price">
        <span class="current-price">$${selectedProduct.price}</span>
        ${oldPriceHTML}
      </div>
    </div>
  `;
} else {
  productContainer.innerHTML = "<p>Product not found.</p>";
}





