// workers/routes/download.js

import { getDownload } from "../kv/downloads.js";
import { jsonResponse } from "../utils/response.js";

/**
 * handleDownload
 * Endpoint: /download?orderId=xxx&fileId=xxx
 */
export async function handleDownload(request, env) {
  const url = new URL(request.url);
  const orderId = url.searchParams.get("orderId");
  const fileId = url.searchParams.get("fileId");

  if (!orderId || !fileId) {
    return jsonResponse({ success: false, message: "Order ID atau File ID tidak ditemukan." }, 400);
  }

  // Ambil data download dari KV
  const downloadData = await getDownload(env.DOWNLOADS, orderId, fileId);

  if (!downloadData) {
    return jsonResponse({ success: false, message: "Link download tidak valid atau sudah kadaluwarsa." }, 404);
  }

  // Cek apakah link masih aktif (misal 24 jam)
  const created = downloadData.created;
  const now = Date.now();
  const diffHours = (now - created) / (1000 * 60 * 60);
  if (diffHours > 24) {
    return jsonResponse({ success: false, message: "Link download telah kadaluwarsa." }, 403);
  }

  // URL asli file di KV
  const fileKey = downloadData.fileKey;
  const buyerName = downloadData.buyerName || "Pembeli";

  // === Generate file PDF dengan watermark nama pembeli ===
  // Bisa langsung redirect ke Worker KV atau generate via PDF Worker
  const fileUrl = `/downloads/${fileKey}?watermark=${encodeURIComponent(buyerName)}`;

  return jsonResponse({ success: true, downloadUrl: fileUrl });
   }
