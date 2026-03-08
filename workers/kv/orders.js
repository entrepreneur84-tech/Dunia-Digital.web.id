/**
 * workers/kv/orders.js
 * Helper untuk menyimpan & mengambil order dari KV
 */

const KV_ORDERS = "ORDERS"; // Binding KV di wrangler.toml

/**
 * Simpan order baru ke KV
 * @param {Object} orderData
 * @param {string} orderData.nama - Nama pembeli
 * @param {string} orderData.email - Email pembeli
 * @param {string} orderData.whatsapp - Nomor WhatsApp
 * @param {string} orderData.produk - Produk atau bundle
 * @param {number} orderData.harga - Harga final
 * @returns {string} orderId
 */
export async function saveOrder(orderData) {
  const orderId = `order_${Date.now()}`; // ID unik sederhana
  const order = {
    id: orderId,
    ...orderData,
    status: "pending",
    createdAt: new Date().toISOString()
  };

  try {
    await ORDERS.put(orderId, JSON.stringify(order));
    return orderId;
  } catch (err) {
    console.error("Gagal simpan order:", err.message);
    throw new Error("Tidak bisa menyimpan order");
  }
}

/**
 * Ambil order berdasarkan ID
 * @param {string} orderId
 * @returns {Object|null} order
 */
export async function getOrder(orderId) {
  try {
    const data = await ORDERS.get(orderId);
    return data ? JSON.parse(data) : null;
  } catch (err) {
    console.error("Gagal ambil order:", err.message);
    return null;
  }
}

/**
 * Ambil semua order (untuk dashboard admin)
 * WARNING: Hanya untuk jumlah order sedikit, tidak scalable
 * @returns {Array<Object>} daftar order
 */
export async function getAllOrders() {
  const orders = [];
  try {
    const list = await ORDERS.list(); // daftar semua key
    for (const key of list.keys) {
      const data = await ORDERS.get(key.name);
      if (data) orders.push(JSON.parse(data));
    }
    return orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  } catch (err) {
    console.error("Gagal ambil semua order:", err.message);
    return [];
  }
}

/**
 * Update status order
 * @param {string} orderId
 * @param {string} status - contoh: "paid", "pending", "cancelled"
 */
export async function updateOrderStatus(orderId, status) {
  try {
    const order = await getOrder(orderId);
    if (!order) return null;
    order.status = status;
    await ORDERS.put(orderId, JSON.stringify(order));
    return order;
  } catch (err) {
    console.error("Gagal update status order:", err.message);
    return null;
  }
}
