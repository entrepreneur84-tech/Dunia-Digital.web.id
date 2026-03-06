export default {

async fetch(req, env, ctx) {

const url = new URL(req.url)

/* =========================
CONTACT FORM API
========================= */

if (url.pathname === "/api/contact" && req.method === "POST") {

try {

const data = await req.json()

const name = (data.name || "").trim()
const email = (data.email || "").trim()
const message = (data.message || "").trim()

/* =========================
VALIDATION
========================= */

if (!name || !email || !message) {

return json({
ok:false,
error:"Semua field wajib diisi"
},400)

}

if (name.length > 100 || email.length > 150 || message.length > 2000) {

return json({
ok:false,
error:"Data terlalu panjang"
},400)

}

/* =========================
EMAIL KE ADMIN
========================= */

await fetch("https://api.mailchannels.net/tx/v1/send",{

method:"POST",

headers:{
"content-type":"application/json"
},

body:JSON.stringify({

personalizations:[
{
to:[
{email:"admin@dunia-digital.web.id"}
]
}
],

from:{
email:"admin@dunia-digital.web.id",
name:"Website Dunia Digital"
},

subject:"Pesan Baru dari Website Dunia Digital",

content:[
{
type:"text/plain",
value:`

Pesan baru dari website Dunia Digital

Nama  : ${name}
Email : ${email}

Pesan :

${message}

--------------------------
Dikirim dari:
https://dunia-digital.web.id
`
}
]

})

})


/* =========================
AUTO REPLY KE PENGIRIM
========================= */

await fetch("https://api.mailchannels.net/tx/v1/send",{

method:"POST",

headers:{
"content-type":"application/json"
},

body:JSON.stringify({

personalizations:[
{
to:[
{email:email}
]
}
],

from:{
email:"admin@dunia-digital.web.id",
name:"Tim Dunia Digital"
},

subject:"Pesan Anda Telah Kami Terima",

content:[
{
type:"text/plain",
value:`

Halo ${name},

Terima kasih telah menghubungi Dunia Digital.

Pesan Anda telah kami terima dengan baik.
Tim kami akan membalas pesan Anda secepat mungkin.

Jika pesan Anda terkait:

• Pembelian Ebook
• Aktivasi Lisensi
• Akses Download
• Masalah akun

Tim support akan segera membantu Anda.

Website:
https://dunia-digital.web.id

Salam hangat,

Tim Dunia Digital
`
}
]

})

})


/* =========================
SUCCESS RESPONSE
========================= */

return json({
ok:true,
message:"Pesan berhasil dikirim"
})

}
catch(err){

return json({
ok:false,
error:"Terjadi kesalahan server"
},500)

}

}

/* =========================
404 API
========================= */

return new Response("Not Found",{status:404})

}

}

/* =========================
HELPER JSON RESPONSE
========================= */

function json(data,status=200){

return new Response(JSON.stringify(data),{

status:status,

headers:{
"Content-Type":"application/json",
"Access-Control-Allow-Origin":"*"
}

})

}
