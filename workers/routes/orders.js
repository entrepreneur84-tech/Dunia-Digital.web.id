// workers/routes/orders.js
import { jsonResponse } from "../utils/response.js";
import { generateId } from "../utils/helpers.js";
import { sendNotification } from "../utils/notify.js";

export async function handleOrders(request, env) {
  if (request.method !== "POST") {
    return jsonResponse({ error: "Method not allowed" }, 405);
  }

  try {
    const data = await request.json();

    // Validasi field wajib
    const { name, email, whatsapp, productId } = data;
    if (!name || !email || !whatsapp || !productId) {
      return jsonResponse({ error: "Data pembeli tidak lengkap" }, 400);
    }

    // Generate order ID unik
    const orderId = generateId(8);

    // Data order lengkap
    const orderData = {
      orderId,
      name,
      email,
      whatsapp,
      productId,
      status: "pending",
      createdAt: new Date().toISOString()
    };

    // Simpan ke KV ORDERS
    await env.ORDERS.put(orderId, JSON.stringify(orderData));

    // Kirim notifikasi ke admin
    const adminWA = "6285175313909";
    const adminEmail = "admin@dunia-digital.web.id";

    const message = `Order Baru!\nID: ${orderId}\nNama: ${name}\nEmail: ${email}\nWA: ${whatsapp}\nProduk: ${productId}`;
    await sendNotification({ whatsapp: adminWA, email: adminEmail, message });

    return jsonResponse({ success: true, orderId, message: "Order berhasil dibuat" });

  } catch (err) {
    console.error("Order error:", err);
    return jsonResponse({ error: "Terjadi kesalahan server" }, 500);
  }
}
