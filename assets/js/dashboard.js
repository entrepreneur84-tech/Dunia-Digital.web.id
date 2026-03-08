
document.addEventListener("DOMContentLoaded",loadOrders)

async function loadOrders(){

 const container = document.getElementById("order-list")

 if(!container) return

 const res = await fetch("/api/dashboard/orders")

 const orders = await res.json()

 container.innerHTML = ""

 orders.forEach(order => {

  const row = document.createElement("div")

  row.className = "order-row"

  row.innerHTML = `

  <p>

  <b>${order.product}</b><br>

  ${order.name}<br>

  ${order.email}<br>

  Status: ${order.status}

  </p>

  `

  container.appendChild(row)

 })

}
