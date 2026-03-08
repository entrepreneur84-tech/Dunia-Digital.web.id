// workers/routes/products.js
import { jsonResponse } from "../utils/response.js";

export async function handleProducts(request, env) {
  const products = [
    // =====================
    // SINGLE EBOOKS
    // =====================
    { id: "cara-berdamai-diri", title: "Cara Jitu Berdamai dengan Diri", priceNormal: 199000, pricePromo: 100000, status: "active", fileId: "ebook_cara_berdamai_diri", cover: "/assets/img/cara-berdamai-diri.png" },
    { id: "the-art-of-surrender", title: "The Art of Surrender", priceNormal: 199000, pricePromo: 100000, status: "active", fileId: "ebook_the_art_of_surrender", cover: "/assets/img/the-art-of-surrender.png" },
    { id: "quantum-zikir", title: "Quantum Zikir", priceNormal: 199000, pricePromo: 100000, status: "active", fileId: "ebook_quantum_zikir", cover: "/assets/img/quantum-zikir.png" },
    { id: "the-radiance-within", title: "The Radiance Within", priceNormal: 199000, pricePromo: 100000, status: "active", fileId: "ebook_the_radiance_within", cover: "/assets/img/the-radiance-within.png" },
    { id: "rahasia-kode-sumber-realitas", title: "Rahasia Menemukan Kode Sumber Realitas", priceNormal: 199000, pricePromo: 100000, status: "active", fileId: "ebook_rahasia_kode_sumber_realitas", cover: "/assets/img/rahasia-kode-sumber-realitas.png" },
    { id: "the-dzikir-of-supreme-power", title: "The Dzikir of Supreme Power", priceNormal: 199000, pricePromo: 100000, status: "active", fileId: "ebook_the_dzikir_of_supreme_power", cover: "/assets/img/the-dzikir-of-supreme-power.png" },
    { id: "pasrah-itu-zikir", title: "Pasrah Itu Zikir", priceNormal: 199000, pricePromo: 100000, status: "active", fileId: "ebook_pasrah_itu_zikir", cover: "/assets/img/pasrah-itu-zikir.png" },
    { id: "tauhid-quantum", title: "Tauhid Quantum", priceNormal: 199000, pricePromo: 100000, status: "active", fileId: "ebook_tauhid_quantum", cover: "/assets/img/tauhid-quantum.png" },
    { id: "quantum-ruh", title: "Quantum Ruh (Qolbu)", priceNormal: 199000, pricePromo: 100000, status: "active", fileId: "ebook_quantum_ruh", cover: "/assets/img/quantum-ruh.png" },
    { id: "the-untouchable", title: "The Untouchable", priceNormal: 199000, pricePromo: 100000, status: "active", fileId: "ebook_the_untouchable", cover: "/assets/img/the-untouchable.png" },
    { id: "quantum-nur", title: "Quantum Nur", priceNormal: 199000, pricePromo: 100000, status: "active", fileId: "ebook_quantum_nur", cover: "/assets/img/quantum-nur.png" },
    { id: "membongkar-potensi-diri", title: "Membongkar Potensi Diri Tanpa Batas", priceNormal: 199000, pricePromo: 100000, status: "active", fileId: "ebook_membongkar_potensi_diri", cover: "/assets/img/membongkar-potensi-diri.png" },
    { id: "powerful-dhikr-healing", title: "Powerful Dhikr Based Holistic Healing", priceNormal: 199000, pricePromo: 100000, status: "active", fileId: "ebook_powerful_dhikr_healing", cover: "/assets/img/powerful-dhikr-healing.png" },
    { id: "zero-points-zikir", title: "Zero Points Zikir", priceNormal: 199000, pricePromo: 100000, status: "active", fileId: "ebook_zero_points_zikir", cover: "/assets/img/zero-points-zikir.png" },
    { id: "membongkar-realitas-hologram", title: "Membongkar Realitas Hologram", priceNormal: 199000, pricePromo: 100000, status: "active", fileId: "ebook_membongkar_realitas_hologram", cover: "/assets/img/membongkar-realitas-hologram.png" },
    { id: "navigasi-cahaya", title: "Navigasi Cahaya", priceNormal: 199000, pricePromo: 100000, status: "active", fileId: "ebook_navigasi_cahaya", cover: "/assets/img/navigasi-cahaya.png" },
    { id: "ksatria-spiritual", title: "Ksatria Spiritual", priceNormal: 199000, pricePromo: 100000, status: "active", fileId: "ebook_ksatria_spiritual", cover: "/assets/img/ksatria-spiritual.png" },
    { id: "menguak-potensi-diri", title: "Menguak Potensi Diri Tanpa Batas", priceNormal: 199000, pricePromo: 100000, status: "active", fileId: "ebook_menguak_potensi_diri", cover: "/assets/img/menguak-potensi-diri.png" },
    { id: "quantum-syukur", title: "Quantum Syukur", priceNormal: 199000, pricePromo: 100000, status: "active", fileId: "ebook_quantum_syukur", cover: "/assets/img/quantum-syukur.png" },

    // =====================
    // BUNDLE
    // =====================
    { id: "bundle-19-ebook", title: "Bundle 19 Ebook Premium", priceNormal: 3781000, pricePromo: 1500000, status: "active", fileId: "bundle_19", cover: "/assets/img/bundle-19.png" },
    { id: "bundle-3-ebook", title: "Bundle 3 Ebook Premium", priceNormal: 597000, pricePromo: 225000, status: "active", fileId: "bundle_3", cover: "/assets/img/bundle-3.png" }
  ];

  return jsonResponse(products);
}
