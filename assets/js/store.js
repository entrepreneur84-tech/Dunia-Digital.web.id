// ===============================
// LOAD PRODUCTS FROM JSON
// ===============================

async function loadProducts() {
  try {
    const response = await fetch("/data/products.json");
    const products = await response.json();

    renderProducts(products);
  } catch (error) {
    console.error("Gagal memuat products.json", error);
  }
}

// ===============================
// FORMAT RUPIAH
// ===============================

function formatRupiah(number) {
  return "Rp " + number.toLocaleString("id-ID");
}

// ===============================
// RENDER PRODUCT CARD
// ===============================

function renderProducts(products) {
  const container = document.getElementById("product-list");

  if (!container) return;

  container.innerHTML = "";

  products.forEach((product) => {
    if (product.status === "coming_soon") return;

    const card = document.createElement("div");
    card.className = "product-card";

    card.innerHTML = `
      <div class="product-image">
        <img src="${product.cover}" alt="${product.title}">
        
        ${
          product.bestseller
            ? `<span class="badge bestseller">BESTSELLER</span>`
            : ""
        }

        ${
          product.discount_price
            ? `<span class="badge promo">PROMO</span>`
            : ""
        }
      </div>

      <div class="product-info">
        <h3 class="product-title">${product.title}</h3>
        <p class="product-author">by ${product.author}</p>

        <p class="product-desc">${product.short_description}</p>

        <div class="product-price">
          <span class="price-normal">${formatRupiah(product.price)}</span>
          <span class="price-promo">${formatRupiah(product.discount_price)}</span>
        </div>

        <div class="product-buttons">
          <a href="/pages/store/viewer.html?id=${product.id}" class="btn-detail">
            Lihat Detail
          </a>

          <a href="/pages/store/checkout.html?id=${product.id}" class="btn-buy">
            Beli Sekarang
          </a>
        </div>
      </div>
    `;

    container.appendChild(card);
  });
}

// ===============================
// LOAD FEATURED PRODUCTS
// ===============================

async function loadFeaturedProducts() {
  try {
    const response = await fetch("/data/products.json");
    const products = await response.json();

    const featured = products.filter((p) => p.featured && p.status === "active");

    renderFeatured(featured);
  } catch (error) {
    console.error("Gagal memuat featured products", error);
  }
}

function renderFeatured(products) {
  const container = document.getElementById("featured-products");

  if (!container) return;

  container.innerHTML = "";

  products.forEach((product) => {
    const item = document.createElement("div");
    item.className = "featured-item";

    item.innerHTML = `
      <img src="${product.cover}" alt="${product.title}">
      <h4>${product.title}</h4>

      <div class="featured-price">
        <span class="price-promo">${formatRupiah(product.discount_price)}</span>
      </div>

      <a href="/pages/store/checkout.html?id=${product.id}" class="btn-featured">
        Beli Sekarang
      </a>
    `;

    container.appendChild(item);
  });
}

// ===============================
// SEARCH FUNCTION
// ===============================

function searchProducts(keyword, products) {
  return products.filter((product) =>
    product.title.toLowerCase().includes(keyword.toLowerCase())
  );
}

// ===============================
// INIT
// ===============================

document.addEventListener("DOMContentLoaded", () => {
  loadProducts();
  loadFeaturedProducts();
});
