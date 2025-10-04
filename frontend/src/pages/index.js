"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  // Scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock scroll when sidebar is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div
      className="flex flex-col min-h-screen relative"
      style={{
        backgroundColor: "white",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black/50 -z-10" />

      {/* Navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300
                    flex flex-col sm:flex-row sm:items-center sm:justify-between
                    h-auto sm:h-20 px-4 sm:px-8
                    ${scrolled
                      ? "bg-white/25 backdrop-blur-xl shadow-lg"
                      : "bg-white backdrop-blur-md shadow-md"}`}
      >
        {/* Logo + Hamburger */}
        <div className="relative w-full sm:w-auto flex items-center justify-between py-2 sm:py-0">
          <div className="absolute left-1/2 -translate-x-1/2 sm:static sm:translate-x-0">
            <img
              src="/logo.png"
              alt="SafeGrid Logo"
              className="h-40 w-auto object-contain"
            />
          </div>

          <button
            className="sm:hidden inline-flex items-center justify-center p-2 rounded-md focus:outline-none ml-auto"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen(v => !v)}
          >
            <span className="text-3xl leading-none">{open ? "✕" : "☰"}</span>
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden sm:flex items-center gap-6 text-blue-900">
          <Link href="#home" className="hover:text-yellow-400 transition">Home</Link>
          <Link href="#about" className="hover:text-yellow-400 transition">About</Link>
          <Link href="#solutions" className="hover:text-yellow-400 transition">Solutions</Link>
          <Link href="#why-us" className="hover:text-yellow-400 transition">Why Us</Link>
          <Link href="#contact" className="hover:text-yellow-400 transition">Contact</Link>
          <Link href="/services" className="hover:text-yellow-400 transition">Services</Link>
          <Link
            href="/portal"
            className="bg-yellow-400 text-blue-900 px-3 sm:px-4 py-2 rounded-lg shadow hover:bg-yellow-300 transition"
          >
            Portal
          </Link>
        </div>
      </nav>

      {/* ✅ Sidebar - moved OUTSIDE nav */}
      <div
        className={`fixed top-0 left-0 h-full w-3/4 max-w-xs bg-white/80 shadow-lg
                    transform transition-transform duration-300 ease-in-out
                    sm:hidden z-[200]
                    ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex flex-col gap-6 p-6 text-blue-900 mt-16">
          <Link href="#home" onClick={() => setOpen(false)} className="hover:text-yellow-400 transition">Home</Link>
          <Link href="#about" onClick={() => setOpen(false)} className="hover:text-yellow-400 transition">About</Link>
          <Link href="#solutions" onClick={() => setOpen(false)} className="hover:text-yellow-400 transition">Solutions</Link>
          <Link href="#why-us" onClick={() => setOpen(false)} className="hover:text-yellow-400 transition">Why Us</Link>
          <Link href="#contact" onClick={() => setOpen(false)} className="hover:text-yellow-400 transition">Contact</Link>
          <Link href="/services" onClick={() => setOpen(false)} className="hover:text-yellow-400 transition">Services</Link>
          <Link
            href="/portal"
            onClick={() => setOpen(false)}
            className="bg-yellow-400 text-blue-900 px-3 py-2 rounded-lg shadow hover:bg-yellow-300 transition text-center"
          >
            Portal
          </Link>
        </div>
      </div>

      {/* Overlay for Sidebar */}
      {open && (
        <div
          className="fixed inset-0 bg-black/30 sm:hidden z-[150]"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Hero Section */}
      <header id="home" className="mt-20 relative z-[1]">
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          spaceBetween={0}
          slidesPerView={1}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          navigation
          loop
          className="h-[70vh] md:h-[90vh]"
        >
          <SwiperSlide>
            <img
              src="carosal.jpg"
              alt="Slide 1"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center text-white">
              <h1 className="text-4xl md:text-6xl font-bold">
                Where Talent Meets Opportunity
              </h1>
              <p className="mt-4 text-lg md:text-xl max-w-xl">
                SafeGrid bridges skilled professionals with industries that need them most
              </p>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <img
              src="carosal2.jpg"
              alt="Slide 2"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center text-white">
              <h1 className="text-4xl md:text-6xl font-bold">
                Empowering People, Building Futures
              </h1>
              <p className="mt-4 text-lg md:text-xl max-w-xl">
                Connecting talent with the right opportunities to drive growth
              </p>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <img
              src="https://media.licdn.com/dms/image/v2/C561BAQFAwNTux8qJdQ/company-background_10000/company-background_10000/0/1648412739463/indian_manpower_consultants_cover?e=2147483647&v=beta&t=wmxiDyXs_5M4XQjkNVMSzU1LOvjQlYxiew9vssGIFPg"
              alt="Slide 3"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center text-white">
              <h1 className="text-4xl md:text-6xl font-bold">
                Your Workforce, Our Priority
              </h1>
              <p className="mt-4 text-lg md:text-xl max-w-xl">
                Reliable manpower solutions that power success and sustainability
              </p>
            </div>
          </SwiperSlide>
        </Swiper>
      </header>

      {/* Stats Section */}
      <section id="solutions" className="py-16 relative z-10">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { num: "5 years +", text: "Experts in recruitment" },
            { num: "100%", text: "Client Satisfaction" },
            { num: "2-3 years", text: "Average Tenure" },
            { num: "Zero", text: "Complaints" },
          ].map((stat, i) => (
            <div
              key={i}
              className="bg-gray-600/30 backdrop-blur-md shadow rounded-lg p-6"
            >
              <h3 className="text-3xl font-bold text-blue-800">{stat.num}</h3>
              <p className="mt-2">{stat.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 relative z-10">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center bg-gray-600/30 backdrop-blur-md shadow rounded-xl p-8">
          <div>
            <h1 className="text-3xl font-extrabold text-blue-800">Who We Are</h1>
            <p className="mt-4 text-amber-50">
              Safegrid Resources is dedicated to empowering businesses through
              reliable and comprehensive manpower solutions. Specializing in
              recruitment, staffing, HR consulting, and workforce training, we
              act as the bridge between talent and opportunity.
              <br />
              <br />
              Our mission is to connect skilled professionals with organizations
              where they can excel, fostering sustainable growth and mutual
              success. With a strong commitment to excellence and ethical
              practices, we provide tailored solutions to meet each client’s
              unique workforce needs.
              <br />
              <br />
              Backed by an experienced team, we ensure a rigorous screening and
              evaluation process to deliver top-tier talent that aligns
              seamlessly with client requirements. At Safegrid Resources, we
              value long-term partnerships built on trust, integrity, and
              transparency — ensuring every placement is the right fit for both
              employer and employee.
              <br />
              <br />
              Choose Safegrid Resources for expert manpower guidance and
              dependable support in navigating the evolving landscape of human
              resource management.
            </p>
          </div>
          <div>
            <img
              src="/logo.png"
              alt="About SafeGrid"
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Why Us Section */}
      <section id="why-us" className="py-16 relative z-10">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Guaranteed Job Placement",
              desc: "We connect you with employers who are hiring.",
            },
            {
              title: "Transparent Pricing",
              desc: "No hidden costs, clear breakdowns.",
            },
            {
              title: "Assured Support",
              desc: "We're here for you every step of the way.",
            },
          ].map((feature, i) => (
            <div
              key={i}
              className="shadow rounded-lg p-6 bg-white/80 backdrop-blur-md"
            >
              <h3 className="text-xl font-semibold text-blue-800">
                {feature.title}
              </h3>
              <p className="mt-2 text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Founders Section */}
      <section id="founders" className="py-20 relative z-10">
        <div className="max-w-6xl mx-auto px-6 text-center bg-gray-400/30 backdrop-blur-md shadow rounded-xl p-8">
          <h2 className="text-3xl font-bold underline text-blue-400">
            Meet Our Founders
          </h2>
          <div className="mt-10 grid md:grid-cols-2 gap-12">
            {[
              { name: "Shubham Gupta", role: "CEO & Visionary", img: "/shubham.jpg" },
              { name: "Geeta Mittal", role: "Co-Founder & CHRM", img: "/geeta.jpg" },
            ].map((f, i) => (
              <div key={i} className="bg-gray-600/50 rounded-lg shadow p-6">
                <img
                  src={f.img}
                  alt={f.name}
                  className="w-64 h-88 mx-auto p-4 shadow-md"
                />
                <h3 className="mt-4 text-xl font-semibold text-orange-500">
                  {f.name}
                </h3>
                <p className="text-white">{f.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portal Section */}
      <section id="portal-access" className="py-20 relative z-10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center gap-12 bg-white/80 backdrop-blur-md shadow rounded-xl p-8">
          <div className="flex-1">
            <img src="/logo.png" alt="SafeGrid Business" className="rounded-lg shadow-lg" />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-3xl font-bold text-blue-800">SafeGrid Portal</h2>
            <p className="mt-4 text-gray-700">
              Access your personalized dashboard for job management, applications,
              and administration — all in one secure place.
            </p>
            <Link
              href="/portal"
              className="mt-6 inline-block px-6 py-3 bg-blue-800 text-white font-semibold rounded-lg shadow hover:bg-blue-700"
            >
              Go to Portal
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        id="contact"
        className="bg-black/60 backdrop-blur-md text-gray-200 py-12 relative z-10"
      >
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-8">
          <div>
            <h4 className="font-bold text-lg text-white">Contact Us</h4>
            <p className="mt-2">Phone: +91 8960426206</p>
            <p>Email: safegridservices@gmail.com</p>
            <p>Address: RZ-73/B, H-Block, Sagarpur West, New Delhi-110046</p>
          </div>
          <div>
            <h4 className="font-bold text-lg text-white">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#home" className="hover:underline">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#about" className="hover:underline">
                  About
                </Link>
              </li>
              <li>
                <Link href="#solutions" className="hover:underline">
                  Solutions
                </Link>
              </li>
              <li>
                <Link href="#why-us" className="hover:underline">
                  Why Us
                </Link>
              </li>
              <li>
                <Link href="/portal" className="hover:underline">
                  Portal
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 text-center text-gray-400">
          © {new Date().getFullYear()} SafeGrid. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
