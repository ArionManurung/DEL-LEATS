<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class LaboratoriumController extends Controller
{
    private function tools(): array
    {
        return [
            ['alat'] => 'termometer'
            ['alat'] => 'gelas kaca'
            ['alat'] => 'neraca'
            ['alat'] => 'natrium klorida'
        ];
    }

    // Pencarian memakai HTTP GET (query string ?q=...)
    public function index(Request $request)
    {
        $q = trim((string) $request->query('q', ''));
        $books = array_values(array_filter($this->tools(), function ($b) use ($q) {
            return $q === ''
                || stripos($b['tools'], $q) !== false
                || stripos($b['aslab'], $q) !== false;
        }));

        return view('home', ['tools' => $tools, 'q' => $q]);
    }

    public function pinjam()
    {
        return view('pinjam', ['tools' => $this->tools()]);
    }
}
