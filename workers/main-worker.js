export default {
  async fetch(request) {

    if (request.method === "POST" && new URL(request.url).pathname === "/order") {

      const data = await request.json();

      const pesan = `🔥 ORDER BARU

Nama: ${data.nama}
Email: ${data.email}`;

      await fetch("https://api.fonnte.com/send", {
        method: "POST",
        headers: {
          "Authorization": "TOKEN_KAMU"
        },
        body: new URLSearchParams({
          target: "628xxxxxxxxxx",
          message: pesan
        })
      });

      return new Response(JSON.stringify({ status: "ok" }), {
        headers: { "Content-Type": "application/json" }
      });
    }

    return new Response("Not found", { status: 404 });
  }
};
