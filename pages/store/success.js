
// ================= GET PRODUCT ID =================

function getProductId() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

// ================= FORMAT RUPIAH =================

function formatRupiah(number) {
  return "Rp " + number.toLocaleString("id-ID");
}

// ================= LOAD PRODUCT =================

async function loadSuccessProduct() {
  const productId = getProductId();

  const response = await fetch("/data/products.json");
  const products = await response.json();

  const product = products.find(p => p.id === productId);

  if (!product) return;

  showDownload(product);
}

// ================= SHOW DOWNLOAD =================

function showDownload(product) {

  const box = document.getElementById("download-box");

  box.innerHTML = `
    <div class="download-card">

      <img src="${product.cover}" alt="${product.title}">

      <div class="download-info">
        <h3>${product.title}</h3>

        <p>${product.short_description}</p>

        <div class="download-price">
          <span>${formatRupiah(product.discount_price)}</span>
        </div>

        <a href="${product.file}" class="btn-download" download>
          Download Ebook Sekarang
        </a>
      </div>

    </div>
  `;
}

// ================= INIT =================

document.addEventListener("DOMContentLoaded", loadSuccessProduct);
