<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>@yield('title') - 📚 Online Library</title>
<link rel="stylesheet" href="{{ asset('css/style.css') }}">
@stack('styles')
</head>
<body>
<header><div class="container"><nav><a class="brand" href="{{ url('/') }}">📚 Online Library</a><ul>
<li><a href="{{ url('/') }}" class="{{ request()->is('/') ? 'active' : '' }}">Daftar Buku</a></li>
<li><a href="{{ url('/pinjam') }}" class="{{ request()->is('pinjam*') ? 'active' : '' }}">Peminjaman</a></li>
</ul></nav></div></header>
@yield('content')
<script src="{{ asset('js/common.js') }}"></script>
@stack('scripts')
</body>
</html>
