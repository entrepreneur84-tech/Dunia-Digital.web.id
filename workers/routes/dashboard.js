import { getOrders } from "../kv/orders.js";
import { jsonResponse } from "../utils/response.js";

/**
 * handleDashboard
 * Endpoint untuk fetch semua order (admin)
 * @param {Request} request
 * @param {Env} env
 * @returns {Response}
 */
export async function handleDashboard(request, env) {
  try {
    // Cek method
    if (request.method !== "GET") {
      return jsonResponse({ error: "Method not allowed" }, 405);
    }

    // Ambil semua order dari KV
    const orders = await getOrders(env);

    // Sorting terbaru dulu
    orders.sort((a, b) => b.created - a.created);

    // Return JSON
    return jsonResponse({ success: true, orders });

  } catch (err) {
    console.error("Dashboard Error:", err);
    return jsonResponse({ success: false, message: err.message }, 500);
  }
}
