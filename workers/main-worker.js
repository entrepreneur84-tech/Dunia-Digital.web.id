export default {
  async fetch(request) {

    const url = new URL(request.url);

    // ORDER (WA NOTIF)
    if (request.method === "POST" && url.pathname === "/order") {

      const data = await request.json();

      const pesan = `🔥 ORDER BARU

Nama: ${data.nama}
Email: ${data.email}`;

      await fetch("https://api.fonnte.com/send", {
        method: "POST",
        headers: {
          "Authorization": "ISI_TOKEN_FONNTE_KAMU"
        },
        body: new URLSearchParams({
          target: "6285175313909",
          message: pesan
        })
      });

      return new Response(JSON.stringify({ status: "ok" }), {
        headers: { "Content-Type": "application/json" }
      });
    }

    // DOWNLOAD PROTECTED
    if (url.pathname === "/download") {

      return fetch("https://your-domain.com/assets/ebook/ebook-premium.pdf");
    }

    return new Response("Not found", { status: 404 });
  }
};
