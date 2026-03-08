// workers/routes/orders.js

import { saveDownload } from "../kv/downloads.js";
import { sendNotification } from "../utils/notify.js";
import { jsonResponse, errorResponse } from "../utils/response.js";
import { generateId } from "../utils/helpers.js";

/**
 * Handle POST /orders
 * Body JSON:
 * {
 *   buyerName: string,
 *   email: string,
 *   whatsapp: string,
 *   product: string | "bundle-19-ebook" | "bundle-3-ebook"
 * }
 */
export async function handleOrder(request, env) {
  try {
    if (request.method !== "POST") {
      return errorResponse("Method not allowed", 405);
    }

    const data = await request.json();
    const { buyerName, email, whatsapp, product } = data;

    if (!buyerName || !email || !whatsapp || !product) {
      return errorResponse("Data pembeli tidak lengkap", 400);
    }

    const orderId = generateId("order_");
    const created = Date.now();

    // Tentukan produk yang dibeli
    let productList = [];

    if (product === "bundle-19-ebook") {
      productList = [
        "quantum-zikir","tauhid-quantum","quantum-nur","quantum-ruh",
        "quantum-syukur","zero-points-zikir","the-art-of-surrender",
        "the-radiance-within","the-untouchable","pasrah-itu-zikir",
        "powerful-dhikr-healing","rahasiakode-realitas",
        "navigasi-cahaya","ksatria-spiritual","membongkar-potensi-diri",
        "menguak-potensi-tanpa-batas","membongkar-realitas-hologram",
        "cara-berdamai-dengan-diri","dzikir-supreme-power"
      ];
    } else if (product === "bundle-3-ebook") {
      productList = [
        "quantum-zikir","tauhid-quantum","quantum-nur"
      ];
    } else {
      productList = [product];
    }

    // Simpan order di KV ORDERS
    const orderData = {
      orderId,
      buyerName,
      email,
      whatsapp,
      product,
      productList,
      created,
      status: "pending"
    };

    await env.ORDERS.put(orderId, JSON.stringify(orderData));

    // Simpan link download di KV DOWNLOADS
    const downloads = [];
    for (const fileId of productList) {
      const downloadData = await saveDownload(env.DOWNLOADS, orderId, fileId, fileId, buyerName);
      downloads.push(downloadData);
    }

    // Kirim notifikasi WA/email
    await sendNotification({
      to: whatsapp,
      email,
      buyerName,
      orderId,
      product,
      productList
    });

    return jsonResponse({
      success: true,
      orderId,
      downloads
    });

  } catch (err) {
    console.error("Gagal membuat order:", err);
    return errorResponse("Terjadi kesalahan server", 500);
  }
}
