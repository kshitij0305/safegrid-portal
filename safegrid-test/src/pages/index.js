import { useEffect, useState } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function Home() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="flex flex-col min-h-screen relative">
      {/* Navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 h-20 transition-all duration-300 flex items-center ${
          scrolled
            ? "bg-white/10 backdrop-blur-xl shadow-lg"
            : "bg-white/20 backdrop-blur-md shadow-md"
        }`}
      >
        <div className="max-w-6xl w-full mx-auto px-6 flex justify-between items-center relative">
          <div className="absolute left-0 top-1/2 -translate-y-1/2">
            <img
              src="/logo.png"
              alt="SafeGrid Logo"
              className="h-40 w-auto object-contain"
            />
          </div>

          <div className="ml-auto space-x-6 text-gray-200 flex items-center">
            <Link href="#home" className="hover:text-yellow-400 transition">Home</Link>
            <Link href="#about" className="hover:text-yellow-400 transition">About</Link>
            <Link href="#solutions" className="hover:text-yellow-400 transition">Solutions</Link>
            <Link href="#why-us" className="hover:text-yellow-400 transition">Why Us</Link>
            <Link href="#contact" className="hover:text-yellow-400 transition">Contact</Link>
            <Link
              href="/portal"
              className="ml-4 bg-yellow-400 text-blue-900 px-4 py-2 rounded-lg shadow hover:bg-yellow-300 transition"
            >
              Portal
            </Link>
          </div>
        </div>
      </nav>

      {/* Rest of your content (Hero, Stats, About, etc.) */}
    </div>
  );
}
