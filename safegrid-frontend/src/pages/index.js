import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function Home() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="flex flex-col min-h-screen relative">
      {/* Navbar */}
<nav
  className={`fixed top-0 left-0 right-0 z-50 h-20 transition-all duration-300 flex items-center overflow-visible ${
    scrolled
      ? "bg-white/10 backdrop-blur-xl shadow-lg"
      : "bg-white/20 backdrop-blur-md shadow-md"
  }`}
>
  <div className="max-w-6xl w-full mx-auto px-6 flex justify-between items-center relative">
    {/* Logo (big + centered vertically) */}
    <div className="absolute left-0 top-1/2 -translate-y-1/2">
      <img
        src="/logo.png"
        alt="SafeGrid Logo"
        className="h-40 w-auto object-contain"
      />
    </div>

    {/* Navigation Links */}
    <div className="ml-auto space-x-6 text-gray-200 flex items-center">
      <a href="#home" className="hover:text-yellow-400 transition">Home</a>
      <a href="#about" className="hover:text-yellow-400 transition">About</a>
      <a href="#solutions" className="hover:text-yellow-400 transition">Solutions</a>
      <a href="#why-us" className="hover:text-yellow-400 transition">Why Us</a>
      <a href="#contact" className="hover:text-yellow-400 transition">Contact</a>
      <a
        href="/portal"
        className="ml-4 bg-yellow-400 text-blue-900 px-4 py-2 rounded-lg shadow hover:bg-yellow-300 transition"
      >
        Portal
      </a>
    </div>
  </div>
</nav>

      {/* Hero with Swiper Carousel */}
      <header id="home" className="mt-20 relative z-10">
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
            <img src="/solar1.jpg" alt="Solar Installation 1" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center text-white">
              <h1 className="text-4xl md:text-6xl font-bold">Green Energy Solutions</h1>
              <p className="mt-4 text-lg md:text-xl max-w-xl">
                Sustainable solar energy for a better tomorrow.
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <img src="/solar2.jpg" alt="Solar Installation 2" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center text-white">
              <h1 className="text-4xl md:text-6xl font-bold">Cut Your Electricity Bills</h1>
              <p className="mt-4 text-lg md:text-xl max-w-xl">
                Affordable solar solutions that save money every month.
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <img src="/solar3.jpg" alt="Solar Installation 3" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center text-white">
              <h1 className="text-4xl md:text-6xl font-bold">Powering a Sustainable Future</h1>
              <p className="mt-4 text-lg md:text-xl max-w-xl">
                Join the clean energy revolution with SafeGrid.
              </p>
            </div>
          </SwiperSlide>
        </Swiper>
      </header>

      {/* Stats section */}
      <section id="solutions" className="py-16 bg-gray-100 relative z-10">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-3xl font-bold text-blue-800">25+</h3>
            <p className="mt-2">Years Warranty</p>
          </div>
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-3xl font-bold text-blue-800">100%</h3>
            <p className="mt-2">Bill Reduction</p>
          </div>
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-3xl font-bold text-blue-800">3-5 Years</h3>
            <p className="mt-2">Payback Time</p>
          </div>
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-3xl font-bold text-blue-800">Zero</h3>
            <p className="mt-2">Operating Costs</p>
          </div>
        </div>
      </section>

      {/* About / Vision with Image */}
      <section id="about" className="py-20 bg-white relative z-10">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-blue-800">Who We Are</h2>
            <p className="mt-4 text-gray-700">
              We specialize in sustainable energy solutions, delivering premium solar systems with warranty,
              quality, and transparency at our core. Our mission is to bring clean energy to every home and business.
            </p>
          </div>
          <div>
            <img
              src="/about-image.jpg"
              alt="About SafeGrid"
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Why Us / Features */}
      <section id="why-us" className="py-16 bg-gray-50 relative z-10">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-8">
          <div className="shadow rounded-lg p-6 bg-white">
            <h3 className="text-xl font-semibold text-blue-800">Certified Quality</h3>
            <p className="mt-2 text-gray-600">Panels certified to industry standards, backed by strong warranty.</p>
          </div>
          <div className="shadow rounded-lg p-6 bg-white">
            <h3 className="text-xl font-semibold text-blue-800">Transparent Pricing</h3>
            <p className="mt-2 text-gray-600">No hidden costs, clear breakdowns, cost efficiency.</p>
          </div>
          <div className="shadow rounded-lg p-6 bg-white">
            <h3 className="text-xl font-semibold text-blue-800">Support & Sustainability</h3>
            <p className="mt-2 text-gray-600">Ongoing maintenance and eco-friendly solutions for long term impact.</p>
          </div>
        </div>
      </section>

      {/* Founders Section */}
      <section id="founders" className="py-20 bg-white relative z-10">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-blue-800">Meet Our Founders</h2>
          <div className="mt-10 grid md:grid-cols-2 gap-12">
            <div className="bg-gray-100 rounded-lg shadow p-6">
              <img
                src="/founder1.jpg"
                alt="Founder 1"
                className="w-32 h-32 mx-auto rounded-full shadow-md"
              />
              <h3 className="mt-4 text-xl font-semibold text-blue-800">Founder One</h3>
              <p className="text-gray-600">CEO & Visionary</p>
              <p className="mt-2 text-sm text-gray-500">
                Driving force behind SafeGrid’s innovation and mission for renewable energy.
              </p>
            </div>
            <div className="bg-gray-100 rounded-lg shadow p-6">
              <img
                src="/founder2.jpg"
                alt="Founder 2"
                className="w-32 h-32 mx-auto rounded-full shadow-md"
              />
              <h3 className="mt-4 text-xl font-semibold text-blue-800">Founder Two</h3>
              <p className="text-gray-600">Co-Founder & Operations</p>
              <p className="mt-2 text-sm text-gray-500">
                Ensures quality delivery, customer satisfaction, and efficient project execution.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Portal Access Section */}
      <section id="portal-access" className="py-20 bg-blue-50 relative z-10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1">
            <img src="/business.jpg" alt="SafeGrid Business" className="rounded-lg shadow-lg" />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-3xl font-bold text-blue-800">SafeGrid Portal</h2>
            <p className="mt-4 text-gray-700">
              Access your personalized dashboard for job management, applications,
              and administration — all in one secure place.
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
      <footer id="contact" className="bg-gray-800 text-gray-200 py-12 relative z-10">
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
              <li><a href="#home" className="hover:underline">Home</a></li>
              <li><a href="#about" className="hover:underline">About</a></li>
              <li><a href="#solutions" className="hover:underline">Solutions</a></li>
              <li><a href="#why-us" className="hover:underline">Why Us</a></li>
              <li><a href="/portal" className="hover:underline">Portal</a></li>
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
