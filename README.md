# LearnHub - Dashboard Media Pembelajaran Interaktif

Website e-learning dashboard profesional dengan desain modern menggunakan Tailwind CSS dan JavaScript vanilla.

## 🎯 Fitur Utama

### ✅ Authentication

- Login page yang aman dan responsif
- Remember me functionality
- Session management dengan localStorage

### 📊 Dashboard

- Statistik pembelajaran (Total XP, Materi Diselesaikan, Peringkat)
- Progress bar dengan level system
- Rekomendasi materi personal
- Real-time data update

### 📚 Materi Pembelajaran

- 6+ materi dengan berbagai tingkat kesulitan
- Filter berdasarkan level (Pemula, Menengah, Lanjutan)
- Video pembelajaran embed
- Konten materi terstruktur
- Modal detail untuk preview

### 🎮 Gamifikasi

- Sistem XP (Experience Points)
- Level progression otomatis
- Badge achievement
- Peringkat pengguna
- Reward untuk setiap materi selesai

### 🌙 Dark Mode

- Toggle dark mode yang smooth
- Pelestarian preferensi pengguna
- Dukungan penuh untuk semua elemen

### 📱 Responsive Design

- Mobile-first approach
- Kompatibel dengan semua ukuran perangkat
- Sidebar collapsible untuk mobile

---

## 🚀 Cara Menggunakan

### 1. Login

```
Email: siswa@mail.com
Password: 123456
```

### 2. Akses Dashboard

Setelah login, Anda akan melihat:

- Total XP yang sudah didapat
- Jumlah materi yang diselesaikan
- Peringkat pengguna
- Progress bar level

### 3. Belajar Materi

- Klik tombol "Mulai" pada card materi
- Baca konten pembelajaran
- Selesaikan untuk mendapat XP
- XP akan otomatis disimpan

### 4. Cek Progress

- Lihat progress bar di dashboard
- Monitor XP yang sudah dikumpulkan
- Unlock badge saat mencapai milestone

---

## 🎨 Struktur Folder

```
elearning-dashboard/
├── index.html              # Halaman login
├── dashboard.html          # Dashboard utama
├── materi.html            # Halaman materi pembelajaran
├── assets/
│   ├── css/
│   │   └── style.css      # Custom CSS & dark mode
│   └── js/
│       └── app.js         # Logika aplikasi utama
└── README.md              # Dokumentasi ini
```

---

## 🔧 Teknologi yang Digunakan

- **HTML5** - Struktur markup
- **Tailwind CSS** - Framework CSS utility-first
- **JavaScript ES6+** - Logika interaktif
- **LocalStorage** - Penyimpanan data lokal
- **CSS Grid & Flexbox** - Layout responsif

---

## 📋 Data yang Tersimpan

Aplikasi menggunakan `localStorage` untuk menyimpan:

```javascript
{
  "userLogin": {
    "email": "siswa@mail.com",
    "name": "Gusti Rizky Ananda"
  },
  "userStats": {
    "xp": 450,
    "level": 1,
    "materiSelesai": 3,
    "badges": ["first_material", "five_materials"],
    "completedMaterials": ["Pengenalan HTML", "CSS untuk Styling", ...]
  }
}
```

---

## ⌨️ Keyboard Shortcuts

| Shortcut  | Fungsi           |
| --------- | ---------------- |
| `Alt + L` | Logout           |
| `Alt + D` | Toggle Dark Mode |
| `Esc`     | Close Modal      |

---

## 🎓 Materi yang Tersedia

1. **Pengenalan HTML** (Pemula - 30 menit - 100 XP)
2. **CSS untuk Styling** (Pemula - 45 menit - 100 XP)
3. **JavaScript Fundamentals** (Menengah - 60 menit - 150 XP)
4. **Tailwind CSS Advanced** (Menengah - 50 menit - 150 XP)
5. **Responsive Web Design** (Menengah - 55 menit - 150 XP)
6. **Web Performance** (Lanjutan - 75 menit - 200 XP)

---

## 🏆 Sistem Badge

Badge akan otomatis unlock saat mencapai:

| Badge          | Kondisi              |
| -------------- | -------------------- |
| Langkah Awal   | Selesaikan 1 materi  |
| Pelajar Rajin  | Selesaikan 5 materi  |
| Naik Jenjang   | Capai level 5        |
| Pengguna Setia | Kumpulkan 1000 XP    |
| Master Belajar | Selesaikan 10 materi |

---

## 💾 Fungsi Penting

### 1. Menambah XP

```javascript
addXP(100); // Tambah 100 XP
```

### 2. Selesaikan Materi

```javascript
completeMateri("Judul Materi"); // Auto update stats
```

### 3. Toggle Dark Mode

```javascript
toggleDarkMode(); // Active/deactive dark mode
```

### 4. Export Data

```javascript
exportUserData(); // Download progress sebagai JSON
```

### 5. Reset Data (Testing)

```javascript
resetAllData(); // Hapus semua data (perlu konfirmasi)
```

---

## 🔐 Security Notes

⚠️ **Catatan Penting:**

- Ini adalah demo untuk tujuan pendidikan
- Login demo hanya menggunakan hardcoded credentials
- Data disimpan di localStorage (client-side)
- Untuk production, gunakan backend API dengan authentication yang proper

---

## 🐛 Troubleshooting

### Masalah: Data tidak tersimpan

- Pastikan browser mendukung localStorage
- Cek apakah localStorage tidak dalam mode private
- Clear cache dan cookies

### Masalah: Dark mode tidak bekerja

- Refresh halaman
- Cek console untuk error
- Clear localStorage jika perlu reset

### Masalah: Login tidak working

- Pastikan email: `siswa@mail.com`
- Pastikan password: `123456`
- Jangan ada spasi di input form

---

## 🎯 Fitur Future

- [ ] Integrasi backend API
- [ ] Database untuk penyimpanan permanent
- [ ] System kuiz interaktif
- [ ] Video embedding YouTube
- [ ] Leaderboard real-time
- [ ] Notifikasi push
- [ ] Social sharing progress
- [ ] Certificate generation

---

## 📱 Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

---

## 👨‍💻 Untuk Developer

### Mengubah Warna Tema

Edit variabel CSS di `assets/css/style.css`:

```css
:root {
  --primary: #2563eb; /* Biru */
  --secondary: #6366f1; /* Indigo */
  --success: #16a34a; /* Hijau */
  /* ... */
}
```

### Menambah Materi Baru

Di `materi.html`, tambahkan ke array `materialsData`:

```javascript
{
    id: 7,
    title: "Materi Baru",
    description: "Deskripsi materi",
    level: "pemula",
    duration: "30 menit",
    xp: 100,
    content: ["Poin 1", "Poin 2", ...]
}
```

### Mengubah Sistem XP

Edit di `assets/js/app.js` fungsi `addXP()` dan `checkBadges()`.

---

## 📄 Lisensi

Educational Project - Bebas digunakan untuk tujuan pembelajaran.

---

## 👤 Pembuat

**Nama**: Gusti Rizky Ananda  
**Kelas**: XI PPLG B  
**Project**: LKPD 11 - Dashboard Media Pembelajaran

---

## 📞 Support

Untuk pertanyaan atau saran, hubungi pengembang atau lihat dokumentasi resmi:

- Tailwind CSS: https://tailwindcss.com
- MDN Web Docs: https://developer.mozilla.org
- JavaScript.info: https://javascript.info

---

**Selamat belajar! 🚀**
