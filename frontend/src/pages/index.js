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
    <div
      className="flex flex-col min-h-screen relative"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1600&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 -z-10"></div>

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
            <Link href="#home" className="hover:text-yellow-400 transition">
              Home
            </Link>
            <Link href="#about" className="hover:text-yellow-400 transition">
              About
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
              href="/services"
              className="hover:text-yellow-400 transition"
            >
              Services
            </Link>
            <Link
              href="/portal"
              className="ml-4 bg-yellow-400 text-blue-900 px-4 py-2 rounded-lg shadow hover:bg-yellow-300 transition"
            >
              Portal
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header id="home" className="mt-20">
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
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLlo8XGWDqsrtdkOm7ZXfXu8mSudA2HzNkaEU9Tn4YSZaS_ZghcZXNTRI&s"
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
              src="https://png.pngtree.com/png-vector/20240309/ourlarge/pngtree-talent-manpower-management-png-image_11916579.png"
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
              At SafeGrid, we believe that people are the foundation of every
              successful business. We specialize in connecting skilled
              professionals with industries that need them most.
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
                <h3 className="mt-4 text-xl font-semibold text-orange-500">{f.name}</h3>
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
            <p className="mt-2">Phone: +91 98182 13114</p>
            <p>Email: vkgroup2024@gmail.com</p>
            <p>Address: RZ-73/B, H-Block, Sagarpur West, New Delhi</p>
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
