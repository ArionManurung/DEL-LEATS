// ===== Helper umum (dipakai semua halaman) =====
const rupiah = n => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(n);

// Baca/tulis Web Storage dengan aman (JSON rusak -> fallback)
function load(store, key, fallback = []) {
  try {
    const d = JSON.parse(store.getItem(key));
    return d === null || d === undefined ? fallback : d;
  } catch (e) { return fallback; }
}
function save(store, key, value) { store.setItem(key, JSON.stringify(value)); }

// Buat elemen DOM tanpa innerHTML (aman dari XSS)
function el(tag, props = {}, ...children) {
  const e = document.createElement(tag);
  Object.entries(props).forEach(([k, v]) => {
    if (k === 'class') e.className = v;
    else if (k === 'text') e.textContent = v;
    else if (k.startsWith('on')) e.addEventListener(k.slice(2), v);
    else e.setAttribute(k, v);
  });
  children.flat().forEach(c => {
    if (c === null || c === undefined || c === false) return;
    e.append(c instanceof Node ? c : document.createTextNode(String(c)));
  });
  return e;
}

function table(headers, rows) {
  return el('div', { class: 'table-wrap' },
    el('table', {},
      el('thead', {}, el('tr', {}, headers.map(h => el('th', { text: h })))),
      el('tbody', {}, rows.map(r => el('tr', {}, r.map(c => el('td', {}, c)))))));
}

// Tampilkan pesan error per field: errs = {field: 'pesan'}; elemen <p id="err-field">
function showErrors(errs, fields) {
  fields.forEach(f => {
    const n = document.getElementById('err-' + f);
    if (n) n.textContent = errs[f] || '';
  });
  return Object.keys(errs).length === 0;
}

function todayStr() {
  const n = new Date();
  return n.getFullYear() + '-' + String(n.getMonth() + 1).padStart(2, '0') + '-' + String(n.getDate()).padStart(2, '0');
}
function fmtDate(isoDate) {
  return new Date(isoDate + 'T00:00:00').toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
}
function genId() { return Date.now().toString(36) + Math.random().toString(36).slice(2, 6); }
function emptyBox(text, linkHref, linkText) {
  return el('div', { class: 'card empty' }, text + ' ', linkHref ? el('a', { href: linkHref, text: linkText }) : null);
}
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
