export async function handleProducts() {

 const products = [

  {
   id: "quantum-zikir",
   title: "Quantum Zikir",
   priceNormal: 199000,
   pricePromo: 100000,
   status: "active",
   fileId: "ebook_quantum_zikir",
   cover: "/assets/img/quantum-zikir.jpg"
  },

  {
   id: "tauhid-quantum",
   title: "Tauhid Quantum",
   priceNormal: 199000,
   pricePromo: 100000,
   status: "active",
   fileId: "ebook_tauhid_quantum",
   cover: "/assets/img/tauhid-quantum.jpg"
  },

  {
   id: "quantum-nur",
   title: "Quantum Nur",
   priceNormal: 199000,
   pricePromo: 100000,
   status: "active",
   fileId: "ebook_quantum_nur",
   cover: "/assets/img/quantum-nur.jpg"
  }

 ]

 return new Response(JSON.stringify(products), {
  headers: { "Content-Type": "application/json" }
 })

}
