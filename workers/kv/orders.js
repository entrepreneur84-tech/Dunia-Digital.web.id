export async function saveOrder(env, order) {
  await env.ORDERS.put(order.invoice, JSON.stringify(order))
}

export async function getAllOrders(env) {
  const list = await env.ORDERS.list()
  const orders = []
  for (const key of list.keys) {
    const data = await env.ORDERS.get(key.name)
    orders.push(JSON.parse(data))
  }
  return orders
}

export async function updateOrder(env, invoice, order) {
  await env.ORDERS.put(invoice, JSON.stringify(order))
}
