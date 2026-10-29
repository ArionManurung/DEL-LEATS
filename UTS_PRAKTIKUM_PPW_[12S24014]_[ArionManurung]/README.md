# PPW-01 Online Library System (Laravel 11)

Proyek ini dibuat dengan **Laravel 11** (PHP). Tidak memakai database: data disimpan di
`localStorage` / `sessionStorage` browser sesuai ketentuan soal. Laravel dipakai untuk routing,
controller, dan template Blade.

## 1. Yang harus ada di komputer

| Kebutuhan | Keterangan |
|-----------|-----------|
| PHP 8.2 atau lebih baru | Cek: `php -v` |
| Composer | Cek: `composer -V` |
| Browser modern | Chrome / Edge / Firefox |

Cara termudah di Windows: install **Laragon** (sudah termasuk PHP dan Composer).

## 2. Langkah menjalankan (Windows PowerShell / Terminal Laragon)

1. Ekstrak file zip, lalu buka terminal **di dalam folder project** (folder yang berisi file `artisan`).
   ```powershell
   cd "C:\lokasi\folder\ppw-01-online-library"
   ```
2. Pastikan folder cache ada dan bisa ditulis:
   ```powershell
   New-Item -ItemType Directory -Force bootstrap\cache
   attrib -r bootstrap\cache /s /d
   attrib -r storage /s /d
   ```
3. Install dependensi (butuh internet, **cukup sekali**; menghasilkan folder `vendor/`):
   ```powershell
   composer install
   ```
4. Jalankan server:
   ```powershell
   php artisan serve
   ```
5. Buka **http://localhost:8000** di browser. Hentikan server dengan `Ctrl + C`.

> File `.env` sudah disertakan (berisi `APP_KEY`). Jika file tersebut hilang:
> `copy .env.example .env` lalu `php artisan key:generate`.

### Menjalankan beberapa project bersamaan
Satu `php artisan serve` memakai satu port. Beri port berbeda untuk tiap project:
```powershell
php artisan serve --port=8001
```

## 3. Jika terjadi error

| Pesan / gejala | Penyebab | Solusi |
|----------------|----------|--------|
| `bootstrap/cache directory must be present and writable` | Folder `bootstrap\cache` hilang atau read-only | Jalankan langkah 2 di atas, lalu `php artisan package:discover` |
| `No application encryption key has been generated` | File `.env` tidak ada | `copy .env.example .env` lalu `php artisan key:generate` |
| `Failed to open stream ... vendor/autoload.php` | Belum menjalankan `composer install` | Jalankan `composer install` |
| `Your PHP version ... does not satisfy` | PHP di bawah 8.2 | Update PHP (Laragon: pilih versi PHP 8.2+) |
| Banyak baris `Deprecation Notice` saat Composer | Composer lebih lama dari versi PHP | Aman diabaikan, atau `composer self-update` |
| `Permission denied` pada folder `storage` | Folder tidak bisa ditulis | `attrib -r storage /s /d` |
| Port 8000 sudah dipakai | Server lain masih berjalan | Gunakan `php artisan serve --port=8001` |
| Data hilang / tidak muncul di halaman lain | `localStorage` terikat alamat dan browser | Selalu pakai satu alamat (`localhost:8000`, bukan `127.0.0.1:8000`) dan satu browser |

Di Linux/Mac, izin folder diperbaiki dengan `chmod -R 775 storage bootstrap/cache`.

## 4. Catatan penting

- **Ujian tidak boleh membuka internet.** Jalankan `composer install` sekarang selagi ada internet,
  lalu bawa folder `vendor/` yang sudah terbentuk. Jangan mengandalkan unduhan saat ujian.
- Data di `localStorage` tersimpan per browser. Untuk mengosongkan: buka DevTools (F12) ->
  Application -> Storage -> Clear site data.
- Tidak perlu `npm install` atau `npm run dev`; semua CSS/JS sudah ada di folder `public/`.

## 5. Struktur folder yang perlu dipahami

```
routes/web.php                  -> daftar URL (route)
app/Http/Controllers/           -> controller (menyediakan data ke view)
resources/views/                -> template Blade (halaman HTML)
resources/views/layouts/app.blade.php -> layout/navbar bersama
public/css/style.css            -> styling
public/js/                      -> logika sisi browser (localStorage, validasi, dsb.)
```

## 6. Fitur yang diimplementasikan
- Halaman Home: daftar buku (judul, penulis, tahun, status)
- Search dengan **HTTP GET** (`/?q=clean`) diproses `LibraryController@index`
- Form peminjaman (nama, NIM, judul) -> **localStorage** (`library_loans`)
- Daftar pinjaman tetap ada setelah refresh; status buku di Home ikut berubah
- Bonus: tombol Return Book

Route: `/`, `/pinjam`

https://github.com/ArionManurung/UTS-PPW.git