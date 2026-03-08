export async function handleProducts() {

const products = [

/* =========================
   SPIRITUAL CORE SERIES
========================= */

{
id:"cara-berdamai-dengan-diri",
title:"Cara Jitu Berdamai dengan Diri",
slug:"cara-berdamai-dengan-diri",
category:"self-awareness",
priceNormal:199000,
pricePromo:100000,
status:"active",
fileId:"ebook_berdamai_dengan_diri",
cover:"/assets/img/berdamai-dengan-diri.jpg"
},

{
id:"art-of-surrender",
title:"The Art of Surrender",
slug:"art-of-surrender",
category:"spiritual",
priceNormal:199000,
pricePromo:100000,
status:"active",
fileId:"ebook_art_of_surrender",
cover:"/assets/img/art-of-surrender.jpg"
},

{
id:"quantum-zikir",
title:"Quantum Zikir",
slug:"quantum-zikir",
category:"dzikir",
priceNormal:199000,
pricePromo:100000,
status:"active",
fileId:"ebook_quantum_zikir",
cover:"/assets/img/quantum-zikir.jpg"
},

{
id:"radiance-within",
title:"The Radiance Within",
slug:"radiance-within",
category:"spiritual",
priceNormal:199000,
pricePromo:100000,
status:"active",
fileId:"ebook_radiance_within",
cover:"/assets/img/radiance-within.jpg"
},

{
id:"kode-sumber-realitas",
title:"Rahasia Menemukan Kode Sumber Realitas",
slug:"kode-sumber-realitas",
category:"quantum",
priceNormal:199000,
pricePromo:100000,
status:"active",
fileId:"ebook_kode_sumber_realitas",
cover:"/assets/img/kode-realitas.jpg"
},

{
id:"dzikir-supreme-power",
title:"The Dzikir of Supreme Power",
slug:"dzikir-supreme-power",
category:"dzikir",
priceNormal:199000,
pricePromo:100000,
status:"active",
fileId:"ebook_dzikir_supreme_power",
cover:"/assets/img/dzikir-supreme-power.jpg"
},

{
id:"pasrah-itu-zikir",
title:"Pasrah Itu Zikir",
slug:"pasrah-itu-zikir",
category:"dzikir",
priceNormal:199000,
pricePromo:100000,
status:"active",
fileId:"ebook_pasrah_zikir",
cover:"/assets/img/pasrah-zikir.jpg"
},

{
id:"tauhid-quantum",
title:"Tauhid Quantum",
slug:"tauhid-quantum",
category:"tauhid",
priceNormal:199000,
pricePromo:100000,
status:"active",
fileId:"ebook_tauhid_quantum",
cover:"/assets/img/tauhid-quantum.jpg"
},

{
id:"quantum-ruh",
title:"Quantum Ruh (Qolbu)",
slug:"quantum-ruh",
category:"ruh",
priceNormal:199000,
pricePromo:100000,
status:"active",
fileId:"ebook_quantum_ruh",
cover:"/assets/img/quantum-ruh.jpg"
},

{
id:"the-untouchable",
title:"The Untouchable",
slug:"the-untouchable",
category:"spiritual",
priceNormal:199000,
pricePromo:100000,
status:"active",
fileId:"ebook_the_untouchable",
cover:"/assets/img/the-untouchable.jpg"
},

{
id:"quantum-nur",
title:"Quantum Nur",
slug:"quantum-nur",
category:"nur",
priceNormal:199000,
pricePromo:100000,
status:"active",
fileId:"ebook_quantum_nur",
cover:"/assets/img/quantum-nur.jpg"
},

{
id:"potensi-tanpa-batas",
title:"Membongkar Potensi Diri Tanpa Batas",
slug:"potensi-tanpa-batas",
category:"self-development",
priceNormal:199000,
pricePromo:100000,
status:"active",
fileId:"ebook_potensi_tanpa_batas",
cover:"/assets/img/potensi-tanpa-batas.jpg"
},

{
id:"holistic-healing",
title:"Powerful Dhikr Based Holistic Healing",
slug:"holistic-healing",
category:"healing",
priceNormal:199000,
pricePromo:100000,
status:"active",
fileId:"ebook_holistic_healing",
cover:"/assets/img/holistic-healing.jpg"
},

{
id:"zero-point-zikir",
title:"Zero Points Zikir",
slug:"zero-point-zikir",
category:"dzikir",
priceNormal:199000,
pricePromo:100000,
status:"active",
fileId:"ebook_zero_point_zikir",
cover:"/assets/img/zero-point.jpg"
},

{
id:"realitas-hologram",
title:"Membongkar Realitas Hologram",
slug:"realitas-hologram",
category:"quantum",
priceNormal:199000,
pricePromo:100000,
status:"active",
fileId:"ebook_realitas_hologram",
cover:"/assets/img/hologram.jpg"
},

{
id:"navigasi-cahaya",
title:"Navigasi Cahaya",
slug:"navigasi-cahaya",
category:"spiritual",
priceNormal:199000,
pricePromo:100000,
status:"active",
fileId:"ebook_navigasi_cahaya",
cover:"/assets/img/navigasi-cahaya.jpg"
},

{
id:"ksatria-spiritual",
title:"Ksatria Spiritual",
slug:"ksatria-spiritual",
category:"spiritual",
priceNormal:199000,
pricePromo:100000,
status:"active",
fileId:"ebook_ksatria_spiritual",
cover:"/assets/img/ksatria-spiritual.jpg"
},

{
id:"menguak-potensi",
title:"Menguak Potensi Diri Tanpa Batas",
slug:"menguak-potensi",
category:"self-development",
priceNormal:199000,
pricePromo:100000,
status:"active",
fileId:"ebook_menguak_potensi",
cover:"/assets/img/menguak-potensi.jpg"
},

{
id:"quantum-syukur",
title:"Quantum Syukur",
slug:"quantum-syukur",
category:"syukur",
priceNormal:199000,
pricePromo:100000,
status:"active",
fileId:"ebook_quantum_syukur",
cover:"/assets/img/quantum-syukur.jpg"
},

/* =========================
   COMING SOON
========================= */

{
id:"law-spiritual-attraction",
title:"Law Of Spiritual Attraction",
slug:"law-spiritual-attraction",
category:"coming",
priceNormal:199000,
pricePromo:100000,
status:"coming",
fileId:"",
cover:"/assets/img/coming.jpg"
},

{
id:"samudra-tanpa-batas",
title:"Samudra Tanpa Batas",
slug:"samudra-tanpa-batas",
category:"coming",
priceNormal:199000,
pricePromo:100000,
status:"coming",
fileId:"",
cover:"/assets/img/coming.jpg"
},

{
id:"quantum-ihsan",
title:"Hakikat Quantum Ihsan",
slug:"quantum-ihsan",
category:"coming",
priceNormal:199000,
pricePromo:100000,
status:"coming",
fileId:"",
cover:"/assets/img/coming.jpg"
}

]

return new Response(
JSON.stringify(products),
{
headers:{
"Content-Type":"application/json"
}
})

}
