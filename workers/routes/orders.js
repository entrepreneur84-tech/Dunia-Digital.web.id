/**
 * workers/routes/orders.js
 * Endpoint untuk membuat order baru
 */

import { saveOrder } from "../kv/orders.js";
import { sendWhatsApp, sendEmail } from "../utils/notify.js";

export async function handleOrders(request, env) {
  if (request.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const data = await request.json();

    // Validasi data wajib
    const { nama, email, whatsapp, produk, harga } = data;
    if (!nama || !email || !whatsapp || !produk || !harga) {
      return new Response(JSON.stringify({ error: "Data tidak lengkap" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Simpan order ke KV
    const orderId = await saveOrder(env, {
      nama,
      email,
      whatsapp,
      produk,
      harga,
      status: "pending", // status awal
    });

    // Kirim notifikasi ke WhatsApp admin
    await sendWhatsApp({
      to: "6285175313909", // admin
      message: `Order Baru ✅\nID: ${orderId}\nNama: ${nama}\nProduk: ${produk}\nHarga: Rp${harga.toLocaleString()}`
    });

    // Kirim notifikasi ke email admin
    await sendEmail({
      to: "admin@dunia-digital.web.id",
      subject: `Order Baru: ${produk}`,
      html: `
        <p>Order ID: <b>${orderId}</b></p>
        <p>Nama: ${nama}</p>
        <p>Email: ${email}</p>
        <p>WhatsApp: ${whatsapp}</p>
        <p>Produk: ${produk}</p>
        <p>Harga: Rp${harga.toLocaleString()}</p>
        <p>Status: pending</p>
      `
    });

    // Response ke front-end
    return new Response(JSON.stringify({
      success: true,
      orderId,
      message: "Order berhasil dibuat. Silahkan lakukan pembayaran."
    }), {
      headers: { "Content-Type": "application/json" }
    });

  } catch (err) {
    return new Response(JSON.stringify({
      error: "Terjadi kesalahan server",
      detail: err.message
    }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
