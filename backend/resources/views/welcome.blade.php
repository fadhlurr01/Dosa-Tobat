<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Dosa & Tobat™ REST API Server</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;600&display=swap" rel="stylesheet">
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        body { font-family: 'Plus Jakarta Sans', sans-serif; }
        code, pre { font-family: 'JetBrains Mono', monospace; }
    </style>
</head>
<body class="bg-slate-950 text-slate-100 min-h-screen flex flex-col justify-between selection:bg-emerald-500 selection:text-white relative overflow-x-hidden">
    <!-- Ambient Lights -->
    <div class="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
    <div class="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>

    <!-- Header Navbar -->
    <header class="w-full px-6 py-4 border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-md sticky top-0 z-30">
        <div class="max-w-6xl mx-auto flex items-center justify-between">
            <div class="flex items-center gap-3">
                <div class="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center font-black text-sm shadow-lg shadow-emerald-600/20">
                    DT
                </div>
                <div>
                    <h1 class="font-black text-base text-emerald-400 tracking-tight leading-none">DOSA & TOBAT™</h1>
                    <span class="text-[10px] text-slate-400 tracking-wider uppercase font-semibold">Laravel REST API Backend</span>
                </div>
            </div>
            <div class="flex items-center gap-3">
                <div class="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-xs font-bold">
                    <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    API Server Online
                </div>
                <a href="https://fadhlurr01.github.io/Dosa-Tobat/" target="_blank" class="px-4 py-1.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-md shadow-emerald-700/20 flex items-center gap-1.5">
                    Buka Aplikasi Web
                    <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                </a>
            </div>
        </div>
    </header>

    <!-- Main Content -->
    <main class="max-w-6xl mx-auto px-6 py-10 flex-1 w-full space-y-8">
        <!-- Hero Status Card -->
        <div class="p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900/90 to-emerald-950/30 border border-slate-800 shadow-2xl relative overflow-hidden">
            <div class="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                <div class="md:col-span-2 space-y-3">
                    <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-bold text-slate-300">
                        ⚡ Laravel v{{ Illuminate\Foundation\Application::VERSION }} (PHP v{{ PHP_VERSION }})
                    </div>
                    <h2 class="text-2xl sm:text-3xl font-black text-white tracking-tight">
                        Backend API & Database <br><span class="text-emerald-400">Telah Aktif & Siap Digunakan.</span>
                    </h2>
                    <p class="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-xl">
                        Server ini mengelola data autentikasi pengguna, jurnal muhasabah 5 langkah, tracking pemulihan tobat, katalog dosa, dan konten dakwah ke Database MySQL Laragon (<code class="text-emerald-400 font-bold">dosa&taubat</code>).
                    </p>
                </div>
                <div class="p-5 rounded-2xl bg-slate-950/80 border border-slate-800/80 space-y-3">
                    <div class="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Status Database</div>
                    <div class="space-y-2 text-xs">
                        <div class="flex justify-between items-center text-slate-300">
                            <span>Driver:</span>
                            <span class="font-mono font-bold text-emerald-400">MySQL (Laragon)</span>
                        </div>
                        <div class="flex justify-between items-center text-slate-300">
                            <span>Database:</span>
                            <span class="font-mono font-bold text-emerald-400">dosa&taubat</span>
                        </div>
                        <div class="flex justify-between items-center text-slate-300">
                            <span>Host / Port:</span>
                            <span class="font-mono text-slate-400">127.0.0.1:3306</span>
                        </div>
                        <div class="flex justify-between items-center text-slate-300">
                            <span>API Prefix:</span>
                            <span class="font-mono text-emerald-400 font-bold">/api/v1</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- API Endpoints Grid -->
        <div class="space-y-4">
            <h3 class="text-sm font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                <svg class="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
                Daftar REST API Endpoints Aktif
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div class="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2 hover:border-emerald-500/40 transition-colors">
                    <div class="flex items-center justify-between">
                        <span class="text-xs font-bold text-slate-200">Autentikasi & Akun</span>
                        <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-bold">POST/GET</span>
                    </div>
                    <p class="text-[11px] font-mono text-slate-400">/api/v1/auth/register</p>
                    <p class="text-[11px] font-mono text-slate-400">/api/v1/auth/login</p>
                    <p class="text-[11px] font-mono text-slate-400">/api/v1/auth/demo/{id}</p>
                </div>

                <div class="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2 hover:border-emerald-500/40 transition-colors">
                    <div class="flex items-center justify-between">
                        <span class="text-xs font-bold text-slate-200">Katalog Dosa & Dalil</span>
                        <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-bold">GET</span>
                    </div>
                    <p class="text-[11px] font-mono text-slate-400">/api/v1/categories</p>
                    <p class="text-[11px] font-mono text-slate-400">/api/v1/sins</p>
                    <p class="text-[11px] font-mono text-slate-400">/api/v1/sins/{id}</p>
                </div>

                <div class="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2 hover:border-emerald-500/40 transition-colors">
                    <div class="flex items-center justify-between">
                        <span class="text-xs font-bold text-slate-200">Jurnal & Muhasabah</span>
                        <span class="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-bold">CRUD</span>
                    </div>
                    <p class="text-[11px] font-mono text-slate-400">/api/v1/journals</p>
                    <p class="text-[11px] font-mono text-slate-400">/api/v1/journeys</p>
                    <p class="text-[11px] font-mono text-slate-400">/api/v1/ibadah/toggle</p>
                </div>
            </div>
        </div>

        <!-- Quick Launch CTA -->
        <div class="p-6 rounded-3xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div class="space-y-1 text-center sm:text-left">
                <h4 class="text-sm font-bold text-white">Ingin membuka antarmuka visual aplikasi Dosa & Tobat?</h4>
                <p class="text-xs text-slate-400">Buka antarmuka pengguna di GitHub Pages atau jalankan dev server frontend.</p>
            </div>
            <div class="flex items-center gap-3">
                <a href="/api/health" target="_blank" class="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-all border border-slate-700">
                    Cek JSON Health
                </a>
                <a href="https://fadhlurr01.github.io/Dosa-Tobat/" target="_blank" class="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-md shadow-emerald-700/20">
                    Buka Aplikasi Web ➔
                </a>
            </div>
        </div>
    </main>

    <!-- Footer -->
    <footer class="w-full px-6 py-4 border-t border-slate-800/80 text-center text-xs text-slate-500">
        © {{ date('Y') }} Dosa & Tobat™ • Sistem Pemulihan Jiwa Berbasis Syar'i
    </footer>
</body>
</html>
