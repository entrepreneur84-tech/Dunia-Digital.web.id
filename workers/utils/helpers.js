/**
 * workers/utils/helpers.js
 * Helper umum untuk Dunia Digital API
 */

/**
 * Generate ID unik untuk order / transaksi
 * Format: order_YYYYMMDD_HHMMSS_RANDOM
 */
export function generateOrderId() {
  const now = new Date();
  const dateStr = now.toISOString().replace(/[-:.TZ]/g, "");
  const randomStr = Math.random().toString(36).substring(2, 8);
  return `order_${dateStr}_${randomStr}`;
}

/**
 * Generate kode lisensi atau download token
 */
export function generateToken(length = 16) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let token = "";
  for (let i = 0; i < length; i++) {
    token += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return token;
}

/**
 * Validasi email sederhana
 */
export function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

/**
 * Validasi nomor WhatsApp (Indonesia)
 */
export function isValidWA(wa) {
  const re = /^(\+62|62|0)8[1-9][0-9]{6,9}$/;
  return re.test(wa);
}

/**
 * Format angka ke rupiah
 */
export function formatRupiah(amount) {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(amount);
}

/**
 * Delay / sleep async
 */
export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
