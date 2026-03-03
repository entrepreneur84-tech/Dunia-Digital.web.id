export async function makeQR(text) {
  return "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=" + encodeURIComponent(text)
}
