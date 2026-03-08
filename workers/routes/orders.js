/**
 * workers/utils/notify.js
 * Helper untuk notifikasi WA & Email
 */

import fetch from "node-fetch";

/**
 * Kirim pesan WhatsApp via API
 * @param {Object} options
 * @param {string} options.to - Nomor tujuan, format internasional tanpa +
 * @param {string} options.message - Isi pesan
 */
export async function sendWhatsApp({ to, message }) {
  try {
    // Contoh menggunakan API WhatsApp pihak ketiga / WA Gateway
    const response = await fetch("https://api.whatsapp-gateway.example/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${Deno.env.get("WA_API_TOKEN")}` // token disimpan di environment
      },
      body: JSON.stringify({
        to,
        message
      })
    });

    const data = await response.json();
    console.log("WA sent:", data);
    return data;

  } catch (err) {
    console.error("Gagal kirim WA:", err.message);
    return null;
  }
}

/**
 * Kirim email konfirmasi / notifikasi
 * @param {Object} options
 * @param {string} options.to - Email tujuan
 * @param {string} options.subject - Subjek email
 * @param {string} options.html - Body email HTML
 */
export async function sendEmail({ to, subject, html }) {
  try {
    // Contoh menggunakan Email API (SendGrid, Mailgun, dsb)
    const response = await fetch("https://api.email-provider.example/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${Deno.env.get("EMAIL_API_KEY")}`
      },
      body: JSON.stringify({
        personalizations: [{ to: [{ email: to }] }],
        from: { email: "admin@dunia-digital.web.id", name: "Dunia Digital" },
        subject,
        content: [{ type: "text/html", value: html }]
      })
    });

    const data = await response.json();
    console.log("Email sent:", data);
    return data;

  } catch (err) {
    console.error("Gagal kirim email:", err.message);
    return null;
  }
}

/**
 * Kirim notifikasi WA ke pembeli setelah order dibuat
 * @param {Object} options
 * @param {string} options.whatsapp - Nomor pembeli
 * @param {string} options.nama - Nama pembeli
 * @param {string} options.produk - Produk yang dibeli
 * @param {string} options.orderId - ID order
 */
export async function notifyBuyer({ whatsapp, nama, produk, orderId }) {
  const msg = `Halo ${nama},\n\nTerima kasih telah memesan "${produk}".\nOrder ID: ${orderId}\nSilahkan lakukan pembayaran melalui rekening yang tersedia.\n\nJika ada kendala, hubungi admin di WhatsApp 6285175313909.`;
  return await sendWhatsApp({ to: whatsapp, message: msg });
}

/**
 * Kirim konfirmasi WA ke admin setelah order dibuat
 * @param {Object} options
 * @param {string} options.nama - Nama pembeli
 * @param {string} options.produk - Produk yang dibeli
 * @param {number} options.harga - Harga produk
 * @param {string} options.orderId - ID order
 */
export async function notifyAdmin({ nama, produk, harga, orderId }) {
  const msg = `Order Baru ✅\nID: ${orderId}\nNama: ${nama}\nProduk: ${produk}\nHarga: Rp${harga.toLocaleString()}`;
  return await sendWhatsApp({ to: "6285175313909", message: msg });
}
