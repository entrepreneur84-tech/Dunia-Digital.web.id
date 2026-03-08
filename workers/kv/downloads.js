// workers/kv/downloads.js

/**
 * Simpan link download di KV
 * @param {KVNamespace} KV_DOWNLOADS - binding KV Worker
 * @param {string} orderId - ID order
 * @param {string} fileId - ID file ebook
 * @param {string} fileKey - nama file di KV
 * @param {string} buyerName - nama pembeli
 */
export async function saveDownload(KV_DOWNLOADS, orderId, fileId, fileKey, buyerName) {
  const key = `${orderId}:${fileId}`;
  const data = {
    fileKey,
    buyerName,
    created: Date.now()
  };

  await KV_DOWNLOADS.put(key, JSON.stringify(data));
  return data;
}

/**
 * Ambil link download dari KV
 * @param {KVNamespace} KV_DOWNLOADS - binding KV Worker
 * @param {string} orderId - ID order
 * @param {string} fileId - ID file ebook
 * @returns {object|null} data download atau null jika tidak ada
 */
export async function getDownload(KV_DOWNLOADS, orderId, fileId) {
  const key = `${orderId}:${fileId}`;
  const value = await KV_DOWNLOADS.get(key);

  if (!value) return null;

  try {
    return JSON.parse(value);
  } catch (err) {
    console.error("Gagal parse download KV:", err);
    return null;
  }
}

/**
 * Hapus link download dari KV
 * @param {KVNamespace} KV_DOWNLOADS
 * @param {string} orderId
 * @param {string} fileId
 */
export async function deleteDownload(KV_DOWNLOADS, orderId, fileId) {
  const key = `${orderId}:${fileId}`;
  await KV_DOWNLOADS.delete(key);
}
