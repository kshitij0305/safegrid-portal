import Link from "next/link";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
      <div className="max-w-6xl mx-auto px-6 md:px-8 py-3 flex items-center justify-between">
        {/* Logo + Name */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-brandBlue rounded-md flex items-center justify-center text-white font-bold">
            SG
          </div>
          <Link href="/" className="text-xl font-extrabold text-brandBlue">SafeGrid</Link>
        </div>

        {/* Nav Links */}
        <nav className="hidden md:flex items-center gap-6 text-gray-700">
          <Link href="/">Home</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/portal" className="ml-4 bg-brandYellow text-brandBlue px-4 py-2 rounded-md font-semibold shadow">
            Portal Login
          </Link>
        </nav>
      </div>
    </header>
  );
}
