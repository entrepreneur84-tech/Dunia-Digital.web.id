// workers/main-worker.js
import { handleProducts } from "./routes/products.js";
import { handleOrders } from "./routes/orders.js";
import { handleDownload } from "./routes/download.js";
import { handleDashboard } from "./routes/dashboard.js";
import { jsonResponse } from "./utils/response.js";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const pathname = url.pathname;

    // Health check
    if (pathname === "/health") {
      return jsonResponse({ status: "ok", service: "dunia-digital-api" });
    }

    try {
      // Routes dispatcher
      if (pathname.startsWith("/products")) {
        return handleProducts(request, env);
      }
      if (pathname.startsWith("/orders")) {
        return handleOrders(request, env);
      }
      if (pathname.startsWith("/download")) {
        return handleDownload(request, env);
      }
      if (pathname.startsWith("/dashboard")) {
        return handleDashboard(request, env);
      }

      // Default response
      return new Response(
        "Dunia Digital API aktif. Gunakan endpoint /products, /orders, /download, /dashboard",
        { status: 200 }
      );
    } catch (err) {
      return jsonResponse(
        { error: "Internal Server Error", message: err.message },
        500
      );
    }
  },
};
