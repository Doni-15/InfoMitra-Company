# InfoMitra

InfoMitra adalah aplikasi web full-stack untuk menampilkan informasi mitra, brosur, harga iklan, komentar, dan autentikasi pengguna. Copy lokal yang cocok ditemukan di area tugas akhir semester, sehingga repository ini diperlakukan sebagai project perkuliahan/kelompok, bukan layanan production.

## Fitur yang Terlihat pada Source

- autentikasi pengguna dan pembatasan halaman berdasarkan peran;
- pengelolaan brosur dan harga iklan;
- komentar/testimoni;
- halaman admin dan halaman publik;
- upload gambar untuk konten brosur.

## Teknologi

- Backend: Node.js, Express, PostgreSQL, JWT, Multer
- Frontend: React, Vite, Tailwind CSS, Axios

## Struktur Project

```text
InfoMitra-Backend/   API, akses database, autentikasi, dan upload
InfoMitra-Frontend/  antarmuka React
```

## Menjalankan Secara Lokal

Persiapkan Node.js dan PostgreSQL, lalu salin masing-masing `.env.example` menjadi `.env` dan isi konfigurasi lokal.

```bash
cd InfoMitra-Backend
npm install
npm run dev
```

Pada terminal lain:

```bash
cd InfoMitra-Frontend
npm install
npm run dev
```

Skema database yang tersedia berada di `InfoMitra-Backend/config/database.sql`.

## Catatan Keamanan

Credential tidak boleh disimpan di Git. File `.env` yang pernah ter-track harus dianggap terekspos: rotasi password database dan JWT secret sebelum deployment, kemudian gunakan secret manager atau environment variable pada platform deployment. Current tree memakai environment variable wajib untuk JWT, production gagal dijalankan tanpa konfigurasi database dan canonical public URL, serta TLS database memverifikasi sertifikat. Provider dengan CA private dapat memakai `DB_CA` atau `DB_CA_PATH`.

Endpoint login dan registrasi dibatasi per alamat IP. Upload brosur dibatasi 5 MiB, diberi nama acak, dan divalidasi dari signature file sebelum disajikan dengan `nosniff`. Nilai `PUBLIC_BASE_URL` dipakai untuk URL upload sehingga aplikasi tidak mempercayai header `Host` dari request.

## Status Project

Project pembelajaran yang sudah mendapat hardening dasar, tetapi masih memerlukan rotasi credential, sanitasi Git history, pengujian integrasi database, dan konsolidasi dengan copy InfoMitra lain sebelum dipublikasikan.
