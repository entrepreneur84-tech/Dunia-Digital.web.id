/**
 * workers/utils/response.js
 * Helper untuk membuat Response JSON standar Dunia Digital API
 */

/**
 * Response sukses
 * @param {any} data - data yang dikirim ke client
 * @param {number} status - HTTP status code, default 200
 */
export function success(data = {}, status = 200) {
  return new Response(JSON.stringify({
    success: true,
    data
  }), {
    status,
    headers: { "Content-Type": "application/json" }
  });
}

/**
 * Response error
 * @param {string} message - pesan error
 * @param {number} status - HTTP status code, default 400
 */
export function error(message = "Terjadi kesalahan", status = 400) {
  return new Response(JSON.stringify({
    success: false,
    error: message
  }), {
    status,
    headers: { "Content-Type": "application/json" }
  });
}

/**
 * Response not found
 */
export function notFound(message = "Data tidak ditemukan") {
  return error(message, 404);
}

/**
 * Response unauthorized
 */
export function unauthorized(message = "Unauthorized") {
  return error(message, 401);
}
