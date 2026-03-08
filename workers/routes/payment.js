export async function handlePaymentInfo() {

 const payment = {

  seabank: {
   bank: "SeaBank",
   name: "AHMAD BARIZI",
   account: "901981495649"
  },

  jago: {
   bank: "Bank Jago",
   name: "Ahmad Barizi",
   account: "109896731184"
  },

  confirm: {
   whatsapp: "6285175313909",
   email: "admin@dunia-digital.web.id"
  }

 }

 return new Response(JSON.stringify(payment), {
  headers: { "Content-Type": "application/json" }
 })

}
