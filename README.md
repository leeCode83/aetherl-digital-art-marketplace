# 🏛️ Aethel: Marketplace Provenance & Lisensi Digital Terdesentralisasi

*Aethel* adalah marketplace aset kreatif digital yang didesain dengan prinsip *bukti kepemilikan abadi (immutable provenance)* sebagai fondasinya. Kami memberdayakan kreator dengan memisahkan kepemilikan inti dari penggunaan komersial, menyediakan platform yang aman untuk menjual berbagai tingkat lisensi (CLT) yang diverifikasi secara permanen di *blockchain*.

---

## 🌟 Visi dan Nilai Inti Proyek

*Pernyataan Nilai (Value Proposition):*

Aethel memberdayakan kreator dengan kontrol penuh melalui pemisahan kepemilikan inti (*GOT*) dari penggunaan komersial. Kami menyediakan *marketplace* tepercaya untuk menjual lisensi berjenjang (*CLT*) secara aman, didukung oleh catatan kepemilikan transparan dan permanen di Jaringan *Base L2* (dibuat untuk efisiensi biaya).

*Masalah yang Diselesaikan:*

Kreator tidak memiliki cara *universal* untuk mencatat bukti penciptaan (timestamp) yang tidak dapat disanggah. Aethel menyelesaikan ini dengan menyediakan mekanisme Genesis Stamp yang diaudit, mengubah aset kreatif menjadi aset yang sepenuhnya terautentikasi dan siap untuk diperdagangkan secara patuh hukum.

---

## 🛠️ Fitur Utama Aplikasi

Proyek ini dibangun di sekitar arsitektur Smart Contract berlapis yang menghasilkan dua jenis aset NFT inti:

### 1. Proof of Provenance & Ownership

* *Genesis Ownership Token (GOT | ERC-1155 ID 0):* Token yang mewakili *Hak Cipta Primer dan Bukti Kepemilikan Abadi*. GOT dapat dipindahtangankan (dijual di pasar sekunder) untuk mengalihkan hak ekonomi karya.
* *Verifikasi Kurator Eksternal:* Setiap karya yang diajukan untuk Stamp melalui ProjectVault melalui proses verifikasi satu tahap oleh *Oracle Kurator* Off-Chain. Stake Stablecoin kreator berfungsi sebagai jaminan keamanan selama proses ini.
* *Decentralized Provenance Record:* Setiap karya dicatat oleh workHash unik dalam ProjectVault kreator, menjadi catatan sejarah yang independen dari marketplace mana pun.

### 2. Marketplace & Lisensi (Monetisasi)

* *Consumption License Token (CLT | ERC-1155 ID 1-6):* Token yang mewakili *Bukti Lisensi Penggunaan Legal*. CLT dicetak setelah transaksi berhasil dan **tidak dapat dipindahtangankan*, mengikat lisensi ke dompet pembeli untuk tujuan pelacakan.
* *Multi-Tiered Licensing:* Kreator dapat menentukan *berbagai tingkat lisensi Creative Commons* dengan harga berbeda (misalnya, Lisensi Pribadi harga rendah, Lisensi Komersial harga tinggi) untuk satu karya yang sama.
* *Seamless Checkout:* Proses pembelian menggunakan Stablecoin dengan alur Web2 yang mulus, di mana Smart Contract Marketplace secara otomatis menghitung fee dan royalti, kemudian memicu minting *CLT* ke pembeli.
* *Creator Dashboard:* Antarmuka untuk mengelola portofolio GOT, mengatur harga lisensi, dan memantau status verifikasi karya.

---

## ⚙️ Tumpukan Teknologi (Tech Stack)

Aethel dirancang untuk berjalan secara efisien di Layer 2 (L2) EVM, dengan Sepolia Testnet digunakan sebagai lingkungan pengembangan dan pengujian awal.

| Komponen | Teknologi | Keterangan |
| :--- | :--- | :--- |
| *Blockchain Target* | *Base Network* (L2 EVM) | Target utama untuk efisiensi biaya dan kecepatan transaksi. |
| *Testing Environment* | *Sepolia Testnet* | Lingkungan pengujian dan staging saat ini. |
| *Smart Contract* | *Solidity ^0.8.30 (Foundry)* | Bahasa kontrak. Menggunakan standar keamanan OpenZeppelin. |
| *Arsitektur SC* | *Factory Pattern & ERC-1155* | Memungkinkan skalabilitas: *AethelFactory* (menciptakan ProjectVault), *ProjectVault* (Hub Kreator), *ProjectAssets* (NFT GOT/CLT). |
| *Frontend* | *React & TypeScript* | Membangun antarmuka pengguna (UI) yang powerful, modular, dan aman (tipografi statis). |
| *Bundler/Dev Tool| **Vite* | Digunakan untuk pengembangan frontend yang cepat dan modern. |
| *Aset Data* | *IPFS / Filecoin* | Digunakan untuk menyimpan metadata NFT dan file provenance secara abadi dan terdesentralisasi. |

---
