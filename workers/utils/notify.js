// workers/utils/notify.js

/**
 * sendNotification
 * Mengirim notifikasi ke WhatsApp dan email admin
 * @param {Object} param0 
 * @param {string} param0.whatsapp - nomor WA admin
 * @param {string} param0.email - email admin
 * @param {string} param0.message - isi notifikasi
 */
export async function sendNotification({ whatsapp, email, message }) {
  try {
    // === WhatsApp API ===
    // Misal pakai WA gateway atau Twilio API (sesuaikan dengan konfigurasi)
    // Contoh pseudo-code:
    if (whatsapp) {
      // fetch("https://api.whatsapp.com/send?phone=62xxx&text=message") dst
      console.log(`WA Notification to ${whatsapp}:\n${message}`);
    }

    // === Email API ===
    // Misal pakai SendGrid, Mailgun, atau SMTP
    if (email) {
      // fetch ke API email
      console.log(`Email Notification to ${email}:\n${message}`);
    }

    return true;
  } catch (err) {
    console.error("Notification error:", err);
    return false;
  }
}
