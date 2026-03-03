
export function buildEmail({ email, product, license, link }) {
  return {
    to: email,
    subject: "Ebook Anda: " + product,
    body: `
Terima kasih telah membeli ebook ${product}

LICENSE: ${license}

Link akses:
${link}

Jangan bagikan license ini kepada orang lain.

Salam,
Dunia Digital
`
  }
}
