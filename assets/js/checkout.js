const form = document.getElementById("checkoutForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nama = document.getElementById("nama").value;
  const email = document.getElementById("email").value;
  const status = document.getElementById("status");

  status.innerText = "Memproses...";

  try {
    await fetch("https://api.dunia-digital.store/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ nama, email })
    });

    status.className = "status success";
    status.innerText = "Berhasil! Mengalihkan...";

    setTimeout(() => {
      window.location.href = "/pages/store/success.html";
    }, 1500);

  } catch (error) {
    status.className = "status error";
    status.innerText = "Terjadi kesalahan. Coba lagi.";
  }
});
