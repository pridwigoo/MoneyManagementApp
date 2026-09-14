# QA Test Cases — Phase 2 State Management

## Application

MoneyManagementApp

## Phase

Phase 2 — State Management + SQLite Persistence

## Environment

* Platform: Android
* React Native: 0.87.1
* Database: SQLite
* State Management: Zustand

---

## TC-001 — Application Launch

**Objective:** Memastikan aplikasi dapat dibuka tanpa error.

### Steps

1. Jalankan aplikasi.
2. Tunggu sampai dashboard tampil.

### Expected Result

* Aplikasi berhasil dibuka.
* Dashboard tampil.
* Tidak terjadi crash.

### Status

⬜ NOT TESTED

---

## TC-002 — Add Transaction

**Objective:** Memastikan transaksi dapat ditambahkan.

### Steps

1. Buka aplikasi.
2. Tekan tombol `+ Tambah Transaksi Test`.
3. Tunggu notifikasi.

### Expected Result

* Muncul pesan `Transaksi berhasil disimpan ke SQLite.`
* Jumlah transaksi bertambah 1.

### Status

⬜ NOT TESTED

---

## TC-003 — Multiple Transactions

**Objective:** Memastikan beberapa transaksi dapat disimpan.

### Steps

1. Tekan `+ Tambah Transaksi Test`.
2. Tekan kembali tombol tersebut.
3. Tekan sekali lagi.

### Expected Result

Jumlah transaksi bertambah sesuai jumlah transaksi yang dibuat.

Contoh:

```text
Sebelum: 0
Setelah transaksi pertama: 1
Setelah transaksi kedua: 2
Setelah transaksi ketiga: 3
```

### Status

⬜ NOT TESTED

---

## TC-004 — SQLite Persistence

**Objective:** Memastikan data tetap tersimpan setelah aplikasi ditutup.

### Steps

1. Tambahkan 2 transaksi.
2. Tutup aplikasi sepenuhnya.
3. Buka kembali aplikasi.

### Expected Result

Jumlah transaksi setelah aplikasi dibuka kembali sama dengan jumlah sebelum aplikasi ditutup.

Contoh:

```text
Sebelum ditutup: 2 transaksi
Setelah dibuka kembali: 2 transaksi
```

### Status

⬜ NOT TESTED

---

## TC-005 — Transaction Data

**Objective:** Memastikan data transaksi yang disimpan sesuai.

### Steps

1. Tambahkan transaksi test.
2. Periksa data transaksi yang ditampilkan.

### Expected Result

Data transaksi memiliki:

* Type: expense
* Amount: Rp25.000
* Description: Test SQLite
* Date: tanggal saat transaksi dibuat

### Status

⬜ NOT TESTED

---

## TC-006 — Delete Transaction

**Objective:** Memastikan transaksi dapat dihapus dari SQLite.

### Steps

1. Tambahkan transaksi.
2. Hapus transaksi tersebut.
3. Reload aplikasi.

### Expected Result

Transaksi yang dihapus tidak muncul lagi.

### Status

⬜ NOT TESTED

---

## QA Result

Total Test Case: 6

Passed: 0

Failed: 0

Blocked: 0

Not Tested: 6

### Final Status

⬜ PASS

⬜ FAIL
