/**
 * workers/kv/orders.js
 * Helper KV Orders
 */

import { generateId } from "../utils/helpers.js";

const KV_NAMESPACE = "ORDERS"; // pastikan binding di wrangler.toml sama

/**
 * Simpan order baru ke KV
 * @param {Object} orderData - { nama, email, whatsapp, produk, harga }
 * @returns {string} orderId
 */
export async function saveOrder(orderData) {
  const orderId = generateId("order_"); // contoh: order_1678912345678
  const createdAt = Date.now();

  const order = {
    id: orderId,
    ...orderData,
    status: "pending",
    createdAt
  };

  await KV_NAMESPACE.put(orderId, JSON.stringify(order));

  return orderId;
}

/**
 * Ambil order dari KV berdasarkan ID
 * @param {string} orderId
 * @returns {Object|null}
 */
export async function getOrder(orderId) {
  const data = await KV_NAMESPACE.get(orderId);
  if (!data) return null;
  return JSON.parse(data);
}

/**
 * Ambil semua order (opsional untuk dashboard admin)
 * @returns {Array}
 */
export async function getAllOrders(listKeys = []) {
  const keys = listKeys.length ? listKeys : await KV_NAMESPACE.list({ limit: 1000 });
  const orders = [];

  for (const key of keys.keys) {
    const item = await KV_NAMESPACE.get(key.name);
    if (item) orders.push(JSON.parse(item));
  }

  return orders.sort((a, b) => b.createdAt - a.createdAt); // terbaru di atas
}
