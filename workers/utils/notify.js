/**
 * workers/utils/notify.js
 * Helper Notifikasi Order via WhatsApp & Email
 */

import { sendEmail } from "./mail.js";   // helper email, bisa kamu buat terpisah
import { sendWhatsApp } from "./wa.js";  // helper WA, bisa pakai API gateway

// Konfigurasi admin
const ADMIN_EMAIL = "admin@dunia-digital.web.id";
const ADMIN_WA = "6285175313909";

/**
 * Kirim notifikasi order baru ke admin
 * @param {Object} orderData
 */
export async function notifyAdmin(orderData) {
  const { nama, email, product, total, orderId } = orderData;

  const message = `
Order Baru Masuk
-------------------------
ID Order: ${orderId}
Nama: ${nama}
Email: ${email}
Produk: ${product}
Total: Rp${total.toLocaleString()}
-------------------------
`;

  // Kirim WA
  await sendWhatsApp(ADMIN_WA, message);

  // Kirim Email
  await sendEmail(ADMIN_EMAIL, "Order Baru - Dunia Digital", message);
}

/**
 * Kirim notifikasi ke pembeli
 * @param {Object} orderData
 */
export async function notifyCustomer(orderData, downloadLink = "") {
  const { nama, email, product, total, orderId } = orderData;

  const message = `
Halo ${nama},

Terima kasih telah membeli ${product}.
Order ID: ${orderId}
Total: Rp${total.toLocaleString()}

${downloadLink ? `Link download ebook: ${downloadLink}` : ""}

Salam hangat,
Dunia Digital
`;

  // Kirim WA jika nomor tersedia
  if (orderData.wa) {
    await sendWhatsApp(orderData.wa, message);
  }

  // Kirim Email
  await sendEmail(email, "Konfirmasi Order - Dunia Digital", message);
}
