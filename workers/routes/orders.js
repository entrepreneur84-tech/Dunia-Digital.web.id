export async function handleOrders(request, env) {

 if (request.method !== "POST") {
  return new Response("Method not allowed", { status: 405 })
 }

 const data = await request.json()

 const orderId = "order_" + Date.now()

 const order = {
  id: orderId,
  name: data.name,
  email: data.email,
  productId: data.productId,
  status: "pending",
  created: new Date().toISOString()
 }

 await env.ORDERS.put(orderId, JSON.stringify(order))

 return new Response(JSON.stringify({
  success: true,
  orderId
 }), {
  headers: { "Content-Type": "application/json" }
 })

}
