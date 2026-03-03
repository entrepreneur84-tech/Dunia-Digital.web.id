export function buildWA({ phone, product, license, link }) {
  const msg = `Terima kasih telah membeli ${product}

LICENSE: ${license}

Akses ebook:
${link}

Support: admin@dunia-digital.web.id`
  return "https://wa.me/"6285175313909"?text=" + encodeURIComponent(msg)
}
