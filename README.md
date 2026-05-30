# HireFlow — Mini ATS Dashboard

Aplikasi web Applicant Tracking System (ATS) modern yang dibangun sebagai *project submission* untuk *Technical Test*. Memiliki antarmuka layaknya SaaS tingkat Enterprise dengan *dark-mode*, transisi mulus, dan fungsionalitas interaktif.

---

## 🌟 Fitur Utama

- **Sistem Autentikasi (Mock)**
  Halaman login minimalis dengan *dummy auth*. Mengarahkan pengguna langsung ke Dashboard setelah menekan tombol masuk.

- **Dashboard & Analitik**
  Tampilan ringkasan metrik rekrutmen utama (Total Jobs, Total Candidates, Total Applications).

- **Manajemen Lowongan (Jobs)**
  Tabel interaktif untuk melihat daftar posisi pekerjaan dengan fitur:
  - Pencarian *real-time* berdasarkan judul posisi (*Job Title*).
  - *Dropdown* filter berdasarkan Status (Active/Closed).
  - Modal Form (`Dialog`) untuk menambah lowongan baru.

- **Pipeline Kandidat (Kanban Board)**
  Sistem pelacakan kandidat bergaya *Kanban Board* (Applied → Interview → Hired).
  - **Drag-and-Drop:** Menggunakan library `@hello-pangea/dnd` untuk memindahkan kandidat antar tahapan rekrutmen.
  - **Candidate Detail (CV Viewer):** Mengklik kartu kandidat akan memunculkan panel geser (*Slide-out Sheet*) di sisi kanan layar untuk melihat pratinjau *Mock CV / Resume* kandidat.

- **Enterprise UX/UI Polish**
  - **Page Transitions:** Navigasi antar halaman disimulasikan dengan *loading spinner delay* (800ms) untuk memberikan kesan aplikasi *Native/Desktop* yang sedang mengambil data secara asinkronus.
  - **Persistent Sidebar:** Menggunakan pola arsitektur *Route Groups* `(dashboard)` Next.js sehingga *Sidebar* tidak pernah di-render ulang (*no-blinking*) saat berpindah menu.

---

## 🛠 Tech Stack & Arsitektur

**Framework & Styling**
- **Next.js 16 (App Router):** Digunakan dengan pendekatan *Server & Client Components* hibrida.
- **Tailwind CSS v4:** Styling *utility-first* dengan CSS Variables global untuk kontrol tema.
- **Shadcn UI (Radix UI):** Komponen siap pakai yang *accessible*, dimodifikasi secara mendalam untuk mencapai estetika UI berkelas (*dark theme* eksklusif).

**Struktur Direktori (App Router)**
```text
src/
├── app/
│   ├── layout.tsx                # Root layout (Font, global CSS)
│   ├── page.tsx                  # Root redirect (saat ini Dashboard root)
│   ├── login/page.tsx            # Halaman Login
│   └── (dashboard)/              # Route Group untuk halaman dengan Sidebar
│       ├── layout.tsx            # AppLayout Wrapper & PageTransition
│       ├── page.tsx              # Dashboard Summary Cards
│       ├── jobs/                 # Daftar Pekerjaan
│       ├── candidates/           # Kanban Board Kandidat
│       ├── settings/             # (Mock) Halaman Pengaturan
│       └── support/              # (Mock) Halaman Bantuan
├── components/
│   ├── app-layout.tsx            # Komponen struktur dasar (Sidebar + Main Content)
│   ├── sidebar.tsx               # Navigasi utama
│   ├── page-transition.tsx       # State loading custom & efek fade-in
│   └── ui/                       # Auto-generated Shadcn UI components
```

---

## 🚀 Cara Menjalankan Lokal

1. Instalasi dependensi:
   ```bash
   npm install
   ```
2. Jalankan development server:
   ```bash
   npm run dev
   ```
3. Buka [http://localhost:3000](http://localhost:3000) di browser. Gunakan kredensial apa saja di halaman login.

---

## ☁️ Deployment ke Vercel

Proyek ini sepenuhnya kompatibel dan dioptimasi untuk Vercel.

1. Simpan dan unggah proyek ini ke **GitHub** milik Anda.
2. Login ke akun [Vercel](https://vercel.com).
3. Klik **"Add New..."** > **"Project"**.
4. Impor repositori GitHub `mini-ats-dashboard` ini.
5. Biarkan semua pengaturan dalam kondisi *default* (Framework Preset akan otomatis mendeteksi Next.js).
6. Klik **"Deploy"**. Tunggu 1-2 menit, dan aplikasi ATS Anda akan *live*!
