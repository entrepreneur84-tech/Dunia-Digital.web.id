// workers/routes/download.js

import { getDownload } from "../kv/downloads.js";
import { getOrder } from "../kv/orders.js";
import { jsonResponse, errorResponse, streamFile } from "../utils/response.js";
import { applyWatermark } from "../utils/pdfWatermark.js";

/**
 * Handle GET /download?orderId=xxx&fileId=yyy
 */
export async function handleDownload(request, env) {
  try {
    const url = new URL(request.url);
    const orderId = url.searchParams.get("orderId");
    const fileId = url.searchParams.get("fileId");

    if (!orderId || !fileId) {
      return errorResponse("Parameter orderId/fileId tidak lengkap", 400);
    }

    // Ambil data download dari KV
    const downloadData = await getDownload(env.DOWNLOADS, orderId, fileId);

    if (!downloadData) {
      return errorResponse("Link download tidak valid atau sudah kadaluarsa", 404);
    }

    // Cek waktu kadaluarsa (24 jam)
    const now = Date.now();
    const diff = now - downloadData.created;
    const maxTime = 24 * 60 * 60 * 1000;

    if (diff > maxTime) {
      return errorResponse("Link download sudah kadaluarsa", 410);
    }

    // Ambil order
    const order = await getOrder(env.ORDERS, orderId);
    if (!order || order.status !== "completed") {
      return errorResponse("Order belum dikonfirmasi atau tidak ditemukan", 403);
    }

    // File path sesuai fileId
    const filePath = `/ebooks/${fileId}.pdf`;

    // Apply watermark nama pembeli
    const pdfBuffer = await applyWatermark(filePath, order.buyerName);

    return streamFile(pdfBuffer, `${fileId}.pdf`);

  } catch (err) {
    console.error("Gagal memproses download:", err);
    return errorResponse("Terjadi kesalahan server", 500);
  }
}
