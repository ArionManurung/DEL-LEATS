@extends('layouts.app')
@section('title', 'Daftar Buku')
@section('content')
<main class="container">
  <h1>Daftar Buku</h1>
  <form method="GET" action="{{ url('/') }}" class="searchbar">
    <input type="text" name="q" value="{{ $q }}" placeholder="Cari judul atau penulis..." aria-label="Cari buku">
    <button class="btn" type="submit">Cari</button>
    @if ($q !== '')
      <a class="btn btn-light" href="{{ url('/') }}">Reset</a>
    @endif
  </form>
  <p class="muted">{{ count($books) }} buku ditemukan @if ($q !== '') untuk kata kunci "{{ $q }}" @endif</p>
  <div class="card">
    <div class="table-wrap">
      <table>
        <thead><tr><th>Judul</th><th>Penulis</th><th>Tahun</th><th>Status</th></tr></thead>
        <tbody>
          @forelse ($books as $b)
          <tr data-judul="{{ $b['judul'] }}">
            <td>{{ $b['judul'] }}</td>
            <td>{{ $b['penulis'] }}</td>
            <td>{{ $b['tahun'] }}</td>
            <td><span class="badge js-status">Tersedia</span></td>
          </tr>
          @empty
          <tr><td colspan="4" class="empty">Tidak ada buku yang cocok.</td></tr>
          @endforelse
        </tbody>
      </table>
    </div>
  </div>
</main>
@endsection
@push('scripts')
<script src="{{ asset('js/home.js') }}"></script>
@endpush
