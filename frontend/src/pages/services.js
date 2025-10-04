"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Services() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  // Scroll effect
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

  const services = [
    {
      title: "Security Staffing",
      desc: "Trained guards, VIP protection, armed security, and bouncers for events and businesses.",
      img: "/security.jpeg",
    },
    {
      title: "Electrical Services",
      desc: "Skilled electricians for installation, repair, and maintenance of electrical systems.",
      img: "/electrical.jpeg",
    },
    {
      title: "Housekeeping & Facility Care",
      desc: "Professional cleaning and upkeep for homes, offices, and hospitality facilities.",
      img: "/housekeeping.jpeg",
    },
    {
      title: "Management Staffing",
      desc: "Trained guards, VIP protection, armed security, and bouncers for events and businesses.",
      img: "/management.png",
    },
    {
      title: "Accountants & Finance Professionals",
      desc: "Skilled electricians for installation, repair, and maintenance of electrical systems.",
      img: "/accounting.png",
    },
    {
      title: "Teaching staff",
      desc: "Professional cleaning and upkeep for homes, offices, and hospitality facilities.",
      img: "/teaching.png",
    },
  ];

  const industries = [
    { title: "Administrative Services", img: "/admin.jpeg" },
    { title: "Banking, Finance & Broking", img: "/finance.jpeg" },
    { title: "Customer Service & Support", img: "/customer.jpeg" },
    { title: "Education & Healthcare", img: "/edu.jpeg" },
    { title: "Home Services & Hospitality", img: "/home.jpeg" },
    { title: "Legal & Real Estate", img: "/legal.jpeg" },
    { title: "Management & HR", img: "/management.png" },
    { title: "Manufacturing & Industrial", img: "/manufacturing.jpeg" },
    { title: "Marketing, Advertising & Web Services", img: "/marketing.jpeg" },
    { title: "Front Office", img: "/frontoffice.jpeg" },
    { title: "Hotel & Restaurant Management", img: "/hotel.jpeg" },
    { title: "Manpower Management", img: "/manpower.jpeg" },
  ];

  return (
    <div
      className="min-h-screen relative text-white"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1920&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm -z-10"></div>

      {/* ✅ Navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300
                    flex flex-col sm:flex-row sm:items-center sm:justify-between
                    h-auto sm:h-20 px-4 sm:px-8
                    ${scrolled
                      ? "bg-white/25 backdrop-blur-xl shadow-lg"
                      : "bg-white backdrop-blur-md shadow-md"}`}
      >
        {/* Logo center on mobile + hamburger */}
        <div className="relative w-full sm:w-auto flex items-center justify-between py-2 sm:py-0">
          <div className="absolute left-1/2 -translate-x-1/2 sm:static sm:translate-x-0">
            <img
              src="/logo.png"
              alt="SafeGrid Logo"
              className="h-40 w-auto object-contain"
            />
          </div>

          {/* Hamburger */}
          <button
            className="sm:hidden inline-flex items-center justify-center p-2 rounded-md focus:outline-none ml-auto"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="text-3xl leading-none">{open ? "✕" : "☰"}</span>
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden sm:flex items-center gap-6 text-blue-900">
          <Link href="/" className="hover:text-yellow-400 transition">
            Home
          </Link>
          <Link href="/services" className="text-yellow-400 font-semibold">
            Services
          </Link>
          <Link href="#solutions" className="hover:text-yellow-400 transition">
            Solutions
          </Link>
          <Link href="#why-us" className="hover:text-yellow-400 transition">
            Why Us
          </Link>
          <Link href="#contact" className="hover:text-yellow-400 transition">
            Contact
          </Link>
          <Link
            href="/portal"
            className="bg-yellow-400 text-blue-900 px-3 sm:px-4 py-2 rounded-lg shadow hover:bg-yellow-300 transition"
          >
            Portal
          </Link>
        </div>
      </nav>

      {/* ✅ Sidebar - Outside nav */}
      <div
        className={`fixed top-0 left-0 h-full w-3/4 max-w-xs bg-white/80 shadow-lg
                    transform transition-transform duration-300 ease-in-out
                    sm:hidden z-[200]
                    ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex flex-col gap-6 p-6 text-blue-900 mt-16">
          <Link href="/" onClick={() => setOpen(false)} className="hover:text-yellow-400 transition">Home</Link>
          <Link href="/services" onClick={() => setOpen(false)} className="text-yellow-400 font-semibold">Services</Link>
          <Link href="#solutions" onClick={() => setOpen(false)} className="hover:text-yellow-400 transition">Solutions</Link>
          <Link href="#why-us" onClick={() => setOpen(false)} className="hover:text-yellow-400 transition">Why Us</Link>
          <Link href="#contact" onClick={() => setOpen(false)} className="hover:text-yellow-400 transition">Contact</Link>
          <Link
            href="/portal"
            onClick={() => setOpen(false)}
            className="bg-yellow-400 text-blue-900 px-3 py-2 rounded-lg shadow hover:bg-yellow-300 transition text-center"
          >
            Portal
          </Link>
        </div>
      </div>

      {/* Overlay under sidebar */}
      {open && (
        <div
          className="fixed inset-0 bg-black/30 sm:hidden z-[150]"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Content */}
      <main className="pt-28 pb-20 max-w-6xl mx-auto px-6">
        {/* Tagline */}
        <section className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-yellow-400">
            Empowering Industries with Reliable Manpower
          </h2>
          <p className="mt-4 text-lg text-gray-200 max-w-3xl mx-auto">
            At SafeGrid, we connect businesses with the skilled workforce they need to thrive.  
            From security to finance, healthcare to industrial sectors — we provide trusted manpower solutions tailored for every field.
          </p>
        </section>

        {/* Services Section */}
        <section className="mb-20">
          <h3 className="text-3xl font-semibold mb-8 text-center">Our Services</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, i) => (
              <div
                key={i}
                className="bg-white/80 text-gray-900 rounded-xl shadow-lg overflow-hidden hover:scale-105 hover:shadow-xl transition"
              >
                <img
                  src={service.img}
                  alt={service.title}
                  className="w-full h-40 object-cover"
                />
                <div className="p-6">
                  <h4 className="text-xl font-bold text-blue-800">
                    {service.title}
                  </h4>
                  <p className="mt-3 text-gray-700">{service.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Industries Section */}
        <section>
          <h3 className="text-3xl font-semibold mb-8 text-center">
            Industries We Serve
          </h3>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
            {industries.map((industry, i) => (
              <div
                key={i}
                className="bg-white/80 text-gray-900 rounded-xl shadow-lg overflow-hidden hover:scale-105 hover:shadow-xl transition"
              >
                <img
                  src={industry.img}
                  alt={industry.title}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h4 className="text-lg font-semibold text-blue-800">
                    {industry.title}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
