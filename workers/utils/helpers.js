export function generateInvoice() {
  return "INV-" + Date.now() + "-" + Math.floor(Math.random() * 9999)
}

export function generateLicense() {
  return "LIC-" + Math.random().toString(36).substring(2, 10).toUpperCase()
}
