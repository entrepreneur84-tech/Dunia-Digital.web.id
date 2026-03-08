const params = new URLSearchParams(window.location.search)

const productId = params.get("product")

loadProduct()

async function loadProduct(){

 const res = await fetch("/api/products")
 const products = await res.json()

 const product = products.find(p => p.id === productId)

 const info = document.getElementById("product-info")

 info.innerHTML = `

 <h2>${product.title}</h2>

 <p>

 Harga Promo
 <b>Rp${formatPrice(product.pricePromo)}</b>

 </p>

 `

}

document
.getElementById("checkout-form")
.addEventListener("submit",createOrder)


async function createOrder(e){

 e.preventDefault()

 const name =
 document.getElementById("name").value

 const email =
 document.getElementById("email").value

 const res = await fetch("/api/orders",{

  method:"POST",

  headers:{
   "Content-Type":"application/json"
  },

  body:JSON.stringify({
   name,
   email,
   productId
  })

 })

 const data = await res.json()

 window.location.href =
 "/pages/success.html?order=" + data.orderId

}

function formatPrice(num){

 return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g,".")

}
