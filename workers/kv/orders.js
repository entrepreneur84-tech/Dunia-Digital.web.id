/**
 * workers/kv/orders.js
 * Helper KV untuk orders
 */

/**
 * Simpan order baru ke KV
 * @param {Env} env - binding KV
 * @param {Object} orderData - data order { nama, email, produk, harga, status, created }
 * @returns {Promise<string>} orderId
 */
export async function saveOrder(env, orderData) {
  const orderId = "order_" + Date.now() + "_" + Math.floor(Math.random() * 1000);

  const order = {
    id: orderId,
    ...orderData,
    created: Date.now(),
  };

  await env.ORDERS.put(orderId, JSON.stringify(order));
  return orderId;
}

/**
 * Ambil semua order dari KV
 * @param {Env} env - binding KV
 * @returns {Promise<Array>} list order
 */
export async function getOrders(env) {
  const list = await env.ORDERS.list();
  const orders = [];

  for (const key of list.keys) {
    const data = await env.ORDERS.get(key.name);
    if (data) {
      orders.push(JSON.parse(data));
    }
  }

  return orders;
}

/**
 * Ambil order berdasarkan ID
 * @param {Env} env
 * @param {string} orderId
 * @returns {Promise<Object|null>}
 */
export async function getOrderById(env, orderId) {
  const data = await env.ORDERS.get(orderId);
  return data ? JSON.parse(data) : null;
}

/**
 * Update status order
 * @param {Env} env
 * @param {string} orderId
 * @param {Object} updateData - { status, paidAt, etc }
 * @returns {Promise<boolean>}
 */
export async function updateOrder(env, orderId, updateData) {
  const order = await getOrderById(env, orderId);
  if (!order) return false;

  const updated = { ...order, ...updateData };
  await env.ORDERS.put(orderId, JSON.stringify(updated));
  return true;
}
