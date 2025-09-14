import { useEffect, useState } from "react";
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

  // ✅ Background (choose image or color)
  const useBackgroundImage = true;
  const backgroundImage =
    "url('https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1600&q=80')";
  const backgroundColor = "#0f172a"; // fallback solid color

  return (
    <div
      className="flex flex-col min-h-screen relative"
      style={{
        background: useBackgroundImage
          ? `${backgroundImage} no-repeat center center/cover`
          : backgroundColor,
      }}
    >
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/50 z-0"></div>

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
            <a href="#home" className="hover:text-yellow-400 transition">
              Home
            </a>
            <a href="#about" className="hover:text-yellow-400 transition">
              About
            </a>
            <a href="#solutions" className="hover:text-yellow-400 transition">
              Solutions
            </a>
            <a href="#services" className="hover:text-yellow-400 transition">
              Services
            </a>
            <a href="#why-us" className="hover:text-yellow-400 transition">
              Why Us
            </a>
            <a href="#contact" className="hover:text-yellow-400 transition">
              Contact
            </a>
            <a
              href="/portal"
              className="ml-4 bg-yellow-400 text-blue-900 px-4 py-2 rounded-lg shadow hover:bg-yellow-300 transition"
            >
              Login / Register
            </a>
          </div>
        </div>
      </nav>

      <main className="relative z-10">
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
                  SafeGrid bridges skilled professionals with industries that
                  need them most
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
                  for individuals and businesses alike
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
                  We provide reliable manpower solutions that power success and
                  sustainability
                </p>
              </div>
            </SwiperSlide>
          </Swiper>
        </header>

        {/* Stats Section */}
        <section id="solutions" className="py-16 relative z-10">
          <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { num: "5 years +", text: "experts in recruitment" },
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
              <h1 className="text-3xl font-extrabold text-blue-800">
                Who We Are
              </h1>
              <p className="mt-4 text-amber-50">
                At SafeGrid, we believe that people are the foundation of every
                successful business. As a manpower solutions provider, we
                specialize in connecting skilled professionals with industries
                that need them most. Whether it’s technical expertise,
                operational support, or specialized roles, we ensure
                organizations get the right talent at the right time. Our
                mission is simple — to empower individuals with opportunities
                while helping businesses thrive through a dependable and
                future-ready workforce.
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

        {/* Services Section */}
        <section id="services" className="py-20 relative z-10">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-orange-500">
              Our Services
            </h2>
            <p className="mt-4 text-gray-200 max-w-2xl mx-auto">
              We deliver reliable manpower and business solutions across
              multiple industries — empowering organizations with skilled talent
              they can trust.
            </p>

            <div className="mt-12 grid sm:grid-cols-2 md:grid-cols-3 gap-8">
              {[
                {
                  title: "Solar Solutions",
                  img: "https://images.unsplash.com/photo-1509395176047-4a66953fd231?auto=format&fit=crop&w=800&q=80",
                  desc: "End-to-end solar installations for residential, commercial, and industrial projects.",
                },
                {
                  title: "Security Services",
                  img: "data:image/jpeg;base64,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",
                  desc: "Trained and reliable security professionals ensuring safety at all times.",
                },
                {
                  title: "Facility Management",
                  img: "data:image/jpeg;base64,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",
                  desc: "Comprehensive facility care — from housekeeping to technical maintenance.",
                },
                {
                  title: "Skilled Manpower",
                  img: "https://images.unsplash.com/photo-1596495577886-d920f1fb7238?auto=format&fit=crop&w=800&q=80",
                  desc: "Providing skilled workforce for construction, operations, and specialized industries.",
                },
                {
                  title: "Healthcare Staff",
                  img: "data:image/jpeg;base64,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",
                  desc: "Qualified nurses, attendants, and medical staff for hospitals and healthcare facilities.",
                },
                {
                  title: "Corporate Solutions",
                  img: "https://images.unsplash.com/photo-1552581234-26160f608093?auto=format&fit=crop&w=800&q=80",
                  desc: "Business outsourcing solutions tailored to finance, admin, and customer support.",
                },
              ].map((service, i) => (
                <div
                  key={i}
                  className="bg-white/90 backdrop-blur-md rounded-xl shadow-lg overflow-hidden hover:scale-105 transition"
                >
                  <img
                    src={service.img}
                    alt={service.title}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-6 text-left">
                    <h3 className="text-xl font-semibold text-blue-800">
                      {service.title}
                    </h3>
                    <p className="mt-2 text-gray-600 text-sm">{service.desc}</p>
                  </div>
                </div>
              ))}
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
              { title: "Transparent Pricing", desc: "No hidden costs, clear breakdowns." },
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
                {
                  name: "Shubham Gupta",
                  role: "CEO & Visionary",
                  img: "/shubham.jpg",
                },
                {
                  name: "Geeta Mittal",
                  role: "Co-Founder & CHRM",
                  img: "/geeta.jpg",
                },
              ].map((f, i) => (
                <div
                  key={i}
                  className="bg-gray-600/50 rounded-lg shadow p-6"
                >
                  <img
                    src={f.img}
                    alt={f.name}
                    className="w-64 h-88 mx-auto p-4 shadow-md"
                  />
                  <h3 className="mt-4 text-xl font-semibold text-orange">
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
              <img
                src="/logo.png"
                alt="SafeGrid Business"
                className="rounded-lg shadow-lg"
              />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-3xl font-bold text-blue-800">SafeGrid Portal</h2>
              <p className="mt-4 text-gray-700">
                Access your personalized dashboard for job management,
                applications, and administration — all in one secure place.
              </p>
              <a
                href="/portal"
                className="mt-6 inline-block px-6 py-3 bg-blue-800 text-white font-semibold rounded-lg shadow hover:bg-blue-700"
              >
                Go to Portal
              </a>
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
                  <a href="#home" className="hover:underline">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#about" className="hover:underline">
                    About
                  </a>
                </li>
                <li>
                  <a href="#solutions" className="hover:underline">
                    Solutions
                  </a>
                </li>
                <li>
                  <a href="#services" className="hover:underline">
                    Services
                  </a>
                </li>
                <li>
                  <a href="#why-us" className="hover:underline">
                    Why Us
                  </a>
                </li>
                <li>
                  <a href="/portal" className="hover:underline">
                    Portal
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 text-center text-gray-400">
            © {new Date().getFullYear()} SafeGrid. All rights reserved.
          </div>
        </footer>
      </main>
    </div>
  );
}
