// Status buku diperbarui dari data pinjaman di localStorage
const loans = load(localStorage, 'library_loans');
document.querySelectorAll('tbody tr[data-judul]').forEach(row => {
  if (loans.some(l => l.judul === row.dataset.judul)) {
    const s = row.querySelector('.js-status');
    s.textContent = 'Dipinjam';
    s.classList.add('badge-warn');
  }
});
