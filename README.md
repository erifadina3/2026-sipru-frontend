# SIPRU Frontend

Frontend web untuk **Sistem Peminjaman Ruangan Kampus (SIPRU)**.  
Aplikasi ini digunakan untuk mengelola data peminjaman ruangan melalui antarmuka berbasis web yang terhubung dengan SIPRU Backend API.

## Description

SIPRU Frontend berfungsi sebagai client-side application yang menampilkan dan mengelola data peminjaman ruangan kampus.  
Aplikasi ini mendukung proses CRUD data peminjaman, update status, pencarian, serta filter data secara interaktif dan terstruktur.

## Features

* CRUD data peminjaman ruangan
* Update status peminjaman (Menunggu, Disetujui, Ditolak)
* Inline status update pada tabel
* Detail peminjaman dengan status badge
* Search data berdasarkan nama/ruangan
* Filter berdasarkan status
* Routing antar halaman (List, Detail, Edit, Tambah)
* UI modern menggunakan TailwindCSS
* Integrasi dengan REST API SIPRU Backend

## Tech Stack

* React
* TypeScript
* TailwindCSS
* React Router DOM
* Fetch API

## Installation

### 1. Clone Repository

```bash
git clone https://github.com/erifadina3/2026-sipru-frontend.git
cd 2026-sipru-frontend
```

### 2. Install Dependency

```bash 
npm install
```

## Environment

Frontend ini terhubung dengan backend melalui endpoint:
```bash 
http://localhost:5153/api/peminjaman
```

## Usage

### 1. Jalankan Development Server
```bash
npm run dev
```

Setelah server berjalan, API dapat diakses melalui:
```bash
http://localhost:5174
```

## Author

Dikembangkan oleh Nur Legia Erifadina.
Untuk kebutuhan pembelajaran dan pengembangan sistem peminjaman ruangan kampus

---
Frontend ini dikembangkan sebagai bagian dari tugas PRA-PBL.