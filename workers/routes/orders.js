/**
 * workers/routes/orders.js
 * Route API untuk create order
 */

import { saveOrder } from "../kv/orders.js";
import { sendWhatsAppNotification, sendEmailNotification } from "../utils/notify.js";
import { jsonResponse } from "../utils/response.js";

export async function handleOrders(request) {
  if (request.method !== "POST") {
    return jsonResponse({ error: "Method not allowed" }, 405);
  }

  try {
    const data = await request.json();

    // Validasi input
    const { nama, email, whatsapp, produk, harga } = data;
    if (!nama || !email || !whatsapp || !produk || !harga) {
      return jsonResponse({ error: "Data pembeli tidak lengkap" }, 400);
    }

    // Simpan order ke KV
    const orderId = await saveOrder({ nama, email, whatsapp, produk, harga });

    // Kirim notifikasi WA & Email admin
    await sendWhatsAppNotification({
      to: "6285175313909",
      message: `Order baru!\nID: ${orderId}\nNama: ${nama}\nProduk: ${produk}\nHarga: Rp${harga.toLocaleString()}`
    });

    await sendEmailNotification({
      to: "admin@dunia-digital.web.id",
      subject: `Order Baru: ${orderId}`,
      html: `
        <h2>Order Baru</h2>
        <p><b>ID:</b> ${orderId}</p>
        <p><b>Nama:</b> ${nama}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>WhatsApp:</b> ${whatsapp}</p>
        <p><b>Produk:</b> ${produk}</p>
        <p><b>Harga:</b> Rp${harga.toLocaleString()}</p>
      `
    });

    // Response ke frontend
    return jsonResponse({ sukses: true, orderId });

  } catch (err) {
    console.error("Gagal buat order:", err.message);
    return jsonResponse({ error: "Gagal membuat order" }, 500);
  }
}
