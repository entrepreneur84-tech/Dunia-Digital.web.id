export async function handleDashboardOrders(request, env) {

 const list = await env.ORDERS.list()

 const orders = []

 for (const key of list.keys) {

  const data = await env.ORDERS.get(key.name, "json")

  orders.push(data)

 }

 return new Response(JSON.stringify(orders), {
  headers: { "Content-Type": "application/json" }
 })

}
