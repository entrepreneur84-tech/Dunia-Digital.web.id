/**
 * workers/kv/downloads.js
 * Helper KV Download Links
 */

import { generateId } from "../utils/helpers.js";

const KV_NAMESPACE = "DOWNLOADS"; // pastikan binding di wrangler.toml sama

/**
 * Buat link download baru untuk order
 * @param {string} orderId
 * @param {Array} fileIds - daftar fileId ebook
 * @returns {string} downloadId
 */
export async function createDownloadLink(orderId, fileIds = []) {
  const downloadId = generateId("dl_"); // contoh: dl_1678912345678
  const createdAt = Date.now();
  const expiresAt = createdAt + 24 * 60 * 60 * 1000; // link aktif 24 jam

  const data = {
    downloadId,
    orderId,
    files: fileIds,
    createdAt,
    expiresAt,
    used: false
  };

  await KV_NAMESPACE.put(downloadId, JSON.stringify(data));

  return downloadId;
}

/**
 * Ambil link download berdasarkan ID
 * @param {string} downloadId
 * @returns {Object|null}
 */
export async function getDownloadLink(downloadId) {
  const data = await KV_NAMESPACE.get(downloadId);
  if (!data) return null;

  const obj = JSON.parse(data);

  // jika sudah expired
  if (Date.now() > obj.expiresAt) return null;

  return obj;
}

/**
 * Tandai link download sudah digunakan
 * @param {string} downloadId
 */
export async function markDownloadUsed(downloadId) {
  const obj = await getDownloadLink(downloadId);
  if (!obj) return;

  obj.used = true;
  await KV_NAMESPACE.put(downloadId, JSON.stringify(obj));
}
