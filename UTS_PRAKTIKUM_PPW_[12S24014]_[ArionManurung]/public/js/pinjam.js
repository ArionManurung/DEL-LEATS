const KEY = 'library_loans';
const form = document.getElementById('form');
const select = document.getElementById('judul');
const box = document.getElementById('loans');
const v = id => document.getElementById(id).value.trim();

function returnBook(id) {
  save(localStorage, KEY, load(localStorage, KEY).filter(l => l.id !== id));
  refresh();
}

// Render ulang daftar pinjaman + opsi buku dari state localStorage
function refresh() {
  const loans = load(localStorage, KEY);
  Array.from(select.options).forEach(o => {
    if (!o.value) return;
    const borrowed = loans.some(l => l.judul === o.value);
    o.disabled = borrowed;
    o.textContent = o.value + (borrowed ? ' (sedang dipinjam)' : '');
  });

  box.innerHTML = '';
  if (!loans.length) { box.append(el('p', { class: 'empty card', text: 'Belum ada peminjaman.' })); return; }
  box.append(el('div', { class: 'card' },
    table(['Nama', 'NIM', 'Judul Buku', 'Tanggal', 'Aksi'],
      loans.map(l => [l.nama, l.nim, l.judul, fmtDate(l.tanggal),
        el('button', { type: 'button', class: 'btn btn-danger btn-sm', text: 'Return Book', onclick: () => returnBook(l.id) })]))));
}

form.addEventListener('submit', e => {
  e.preventDefault();
  const data = { nama: v('nama'), nim: v('nim'), judul: select.value };
  const loans = load(localStorage, KEY);
  const errs = {};
  if (!data.nama) errs.nama = 'Nama wajib diisi.';
  if (!data.nim) errs.nim = 'NIM wajib diisi.';
  else if (!/^[A-Za-z0-9]{5,15}$/.test(data.nim)) errs.nim = 'NIM hanya huruf/angka (5-15 karakter).';
  if (!data.judul) errs.judul = 'Pilih judul buku.';
  else if (loans.some(l => l.judul === data.judul)) errs.judul = 'Buku ini sedang dipinjam.';
  if (!showErrors(errs, ['nama', 'nim', 'judul'])) return;

  loans.push({ id: genId(), ...data, tanggal: todayStr() });
  save(localStorage, KEY, loans);
  form.reset();
  refresh();
});

refresh();
