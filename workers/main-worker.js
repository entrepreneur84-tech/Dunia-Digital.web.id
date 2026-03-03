import { json, text } from "./utils/response.js"
import { generateInvoice, generateLicense } from "./utils/helpers.js"
import { buildEmail } from "./utils/mailTemplate.js"
import { buildWA } from "./utils/waTemplate.js"
import { saveOrder, getAllOrders, updateOrder } from "./kv/orders.js"
import { saveLicense, getLicense } from "./kv/licenses.js"
import { checkAdminAuth } from "./security/adminAuth.js"
import { makeQR } from "./utils/qr.js"

export default {
  async fetch(req, env) {
    const url = new URL(req.url)

    /* =======================
       PUBLIC API
    ======================= */

    // CREATE ORDER (CHECKOUT)
    if (url.pathname === "/api/order" && req.method === "POST") {
      const body = await req.json()
      const { name, email, phone, product, ebook, price } = body

      const invoice = generateInvoice()

      const order = {
        invoice,
        name,
        email,
        phone,
        product,
        ebook,
        price,
        status: "PENDING",
        created: Date.now()
      }

      await saveOrder(env, order)

      return json({
        ok: true,
        invoice,
        redirect: "/pages/success.html?invoice=" + invoice
      })
    }

    // CHECK LICENSE (VIEWER)
    if (url.pathname === "/api/license" && req.method === "POST") {
      const { license, fingerprint } = await req.json()
      const data = await getLicense(env, license)

      if (!data) {
        return json({ ok: false, msg: "License tidak valid" }, 403)
      }

      if (Date.now() > data.expired) {
        return json({ ok: false, msg: "License expired" }, 403)
      }

      // Bind fingerprint
      if (!data.fingerprint) {
        data.fingerprint = fingerprint
        await saveLicense(env, data)
      } else if (data.fingerprint !== fingerprint) {
        return json({ ok: false, msg: "License digunakan di device lain" }, 403)
      }

      return json({ ok: true, ebook: data.ebook, product: data.product })
    }

    /* =======================
       ADMIN API (PROTECTED)
    ======================= */

    // LIST ORDERS
    if (url.pathname === "/api/admin/orders" && req.method === "GET") {
      if (!checkAdminAuth(req, env)) {
        return json({ ok: false, msg: "Unauthorized" }, 401)
      }

      const orders = await getAllOrders(env)
      return json({ ok: true, orders })
    }

    // SEND LICENSE
    if (url.pathname === "/api/admin/send" && req.method === "POST") {
      if (!checkAdminAuth(req, env)) {
        return json({ ok: false, msg: "Unauthorized" }, 401)
      }

      const { invoice } = await req.json()
      const orders = await getAllOrders(env)
      const order = orders.find(o => o.invoice === invoice)

      if (!order) {
        return json({ ok: false, msg: "Order tidak ditemukan" }, 404)
      }

      const license = generateLicense()
      const viewer = `https://dunia-digital.web.id/pages/store/viewer.html?ebook=${encodeURIComponent(order.ebook)}&title=${encodeURIComponent(order.product)}&license=${license}`

      const licenseData = {
        email: order.email,
        phone: order.phone,
        product: order.product,
        ebook: order.ebook,
        license,
        expired: Date.now() + (30 * 24 * 60 * 60 * 1000),
        fingerprint: null,
        created: Date.now()
      }

      await saveLicense(env, licenseData)

      order.status = "SENT"
      order.license = license
      await updateOrder(env, invoice, order)

      const emailMsg = buildEmail({
        email: order.email,
        product: order.product,
        license,
        link: viewer
      })

      const waMsg = buildWA({
        phone: order.phone,
        product: order.product,
        license,
        link: viewer
      })

      const qr = await makeQR(viewer)

      return json({
        ok: true,
        license,
        viewer,
        email: emailMsg,
        whatsapp: waMsg,
        qr
      })
    }

    /* =======================
       DEFAULT
    ======================= */
    return text("Dunia Digital API READY")
  }
  }
