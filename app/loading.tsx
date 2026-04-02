export default function Loading() {
  return (
    <main className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 bg-[#050816]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.18),_transparent_34%),radial-gradient(circle_at_bottom_left,_rgba(168,85,247,0.16),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(34,211,238,0.14),_transparent_28%)]" />
      <div className="absolute inset-0 opacity-30 [background-image:radial-gradient(rgba(255,255,255,0.65)_1px,transparent_1px)] [background-size:28px_28px]" />

      <div className="relative w-full max-w-lg">
        <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-r from-blue-500/20 via-violet-500/20 to-cyan-400/20 blur-3xl animate-pulse" />

        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/8 backdrop-blur-2xl shadow-[0_30px_80px_-25px_rgba(59,130,246,0.45)] p-8 sm:p-10 text-center text-white">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/80 to-transparent" />
          <div className="absolute -top-20 left-1/2 h-52 w-52 -translate-x-1/2 rounded-full bg-gradient-to-br from-blue-500/25 via-violet-500/20 to-cyan-400/20 blur-3xl" />

          <div className="relative mx-auto flex h-24 w-24 items-center justify-center">
            <div className="absolute inset-0 rounded-full border border-white/10" />
            <div className="absolute inset-2 rounded-full border border-cyan-300/30 animate-[spin_10s_linear_infinite]" />
            <div className="absolute inset-4 rounded-full border border-violet-300/30 animate-[spin_6s_linear_infinite_reverse]" />
            <div className="h-16 w-16 rounded-full bg-gradient-to-tr from-blue-500 via-cyan-400 to-violet-400 shadow-[0_0_30px_rgba(56,189,248,0.45)] flex items-center justify-center">
              <span className="text-xl font-black tracking-[0.2em] drop-shadow-sm">RP</span>
            </div>
          </div>

          <h1 className="mt-8 text-3xl sm:text-4xl font-bold tracking-tight">
            Loading portfolio
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-300 max-w-sm mx-auto">
            A refined experience is being prepared for you.
          </p>

          <div className="mt-8 flex items-center justify-center gap-3" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-cyan-300 shadow-[0_0_20px_rgba(103,232,249,0.85)] animate-bounce [animation-delay:-0.25s]" />
            <span className="h-2.5 w-2.5 rounded-full bg-blue-400 shadow-[0_0_20px_rgba(96,165,250,0.85)] animate-bounce [animation-delay:-0.1s]" />
            <span className="h-2.5 w-2.5 rounded-full bg-violet-400 shadow-[0_0_20px_rgba(167,139,250,0.85)] animate-bounce" />
          </div>

          <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-xs sm:text-sm text-slate-300">
            Please wait a moment — everything is coming together.
          </div>

          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent" />
        </div>
      </div>
    </main>
  )
}
