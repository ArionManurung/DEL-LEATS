@extends('layouts.app')
@section('title', 'Peminjaman')
@section('content')
<main class="container">
  <h1>Form Peminjaman</h1>
  <form id="form" class="card" novalidate>
    <label for="nama">Nama</label>
    <input type="text" id="nama" maxlength="100" autocomplete="name">
    <p class="error" id="err-nama"></p>

    <label for="nim">NIM</label>
    <input type="text" id="nim" maxlength="15">
    <p class="error" id="err-nim"></p>

    <label for="judul">Judul Buku</label>
    <select id="judul">
      <option value="">-- Pilih buku --</option>
      @foreach ($books as $b)
        <option value="{{ $b['judul'] }}">{{ $b['judul'] }}</option>
      @endforeach
    </select>
    <p class="error" id="err-judul"></p>

    <button type="submit" class="btn">Pinjam Buku</button>
  </form>

  <h2 style="margin-top:2rem">Daftar Pinjaman</h2>
  <div id="loans"></div>
</main>
@endsection
@push('scripts')
<script src="{{ asset('js/pinjam.js') }}"></script>
@endpush
