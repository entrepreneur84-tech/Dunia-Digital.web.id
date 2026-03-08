import { handleProducts } from "./routes/products.js"
import { handleOrders } from "./routes/orders.js"
import { handlePaymentInfo } from "./routes/payment.js"
import { handleDownload } from "./routes/download.js"
import { handleDashboardOrders } from "./routes/dashboard.js"

export default {

 async fetch(request, env) {

  const url = new URL(request.url)

  try {

   // API PRODUCTS
   if (url.pathname === "/api/products") {
    return handleProducts(request, env)
   }

   // API ORDERS
   if (url.pathname === "/api/orders") {
    return handleOrders(request, env)
   }

   // API PAYMENT INFO
   if (url.pathname === "/api/payment") {
    return handlePaymentInfo(request, env)
   }

   // API DOWNLOAD EBOOK
   if (url.pathname === "/api/download") {
    return handleDownload(request, env)
   }

   // ADMIN DASHBOARD
   if (url.pathname === "/api/dashboard/orders") {
    return handleDashboardOrders(request, env)
   }

   return new Response("API route not found", { status: 404 })

  } catch (err) {

   return new Response(
    JSON.stringify({
     success: false,
     error: err.message
    }),
    {
     status: 500,
     headers: { "Content-Type": "application/json" }
    }
   )

  }

 }

}
