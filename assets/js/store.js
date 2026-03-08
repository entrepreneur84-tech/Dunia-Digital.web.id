
document.addEventListener("DOMContentLoaded", loadProducts)

async function loadProducts(){

 const container = document.getElementById("product-list")

 if(!container) return

 try{

  const res = await fetch("/api/products")
  const products = await res.json()

  container.innerHTML = ""

  products.forEach(product => {

   if(product.status !== "active") return

   const card = document.createElement("div")
   card.className = "product-card"

   card.innerHTML = `
   
   <img src="${product.cover || '/assets/img/default-book.jpg'}">

   <h3>${product.title}</h3>

   <p class="price">

     <span class="price-normal">
     Rp${formatPrice(product.priceNormal)}
     </span>

     <span class="price-promo">
     Rp${formatPrice(product.pricePromo)}
     </span>

   </p>

   <a class="btn-buy"
   href="/pages/store/checkout.html?product=${product.id}">
   Beli Sekarang
   </a>

   `

   container.appendChild(card)

  })

 }
 catch(e){

  container.innerHTML = "Gagal memuat produk"

 }

}

function formatPrice(num){

 return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g,".")

}
