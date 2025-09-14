import { useEffect, useState } from "react";
import Link from "next/link";

export default function Services() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const services = [
    {
      title: "Security Staffing",
      desc: "Trained guards, VIP protection, armed security, and bouncers for events and businesses.",
      img: "https://img.freepik.com/free-photo/security-guard-concept_23-2149203484.jpg",
    },
    {
      title: "Electrical Services",
      desc: "Skilled electricians for installation, repair, and maintenance of electrical systems.",
      img: "https://img.freepik.com/free-photo/electrician-working-with-fusebox_23-2148430730.jpg",
    },
    {
      title: "Housekeeping & Facility Care",
      desc: "Professional cleaning and upkeep for homes, offices, and hospitality facilities.",
      img: "https://img.freepik.com/free-photo/cleaning-service-with-professional-tools_23-2149262384.jpg",
    },
  ];

  const industries = [
    { title: "Administrative & Front Office", img: "https://img.freepik.com/free-photo/business-people-working-office_23-2148430912.jpg" },
    { title: "Banking, Finance & Broking", img: "https://img.freepik.com/free-photo/finance-graphs_23-2148171481.jpg" },
    { title: "Customer Service & Support", img: "https://img.freepik.com/free-photo/customer-service-operators_23-2148430907.jpg" },
    { title: "Education & Healthcare", img: "https://img.freepik.com/free-photo/medical-students-class_23-2148430919.jpg" },
    { title: "Home Services & Hospitality", img: "https://img.freepik.com/free-photo/hotel-receptionist-service_23-2148430933.jpg" },
    { title: "Legal & Real Estate", img: "https://img.freepik.com/free-photo/law-concept-with-gavel-scale-justice_23-2148425698.jpg" },
    { title: "Management & HR", img: "https://img.freepik.com/free-photo/human-resources-recruitment-job-team-concept_23-2148430945.jpg" },
    { title: "Manufacturing & Industrial", img: "https://img.freepik.com/free-photo/factory-workers-industrial-production_23-2148430927.jpg" },
    { title: "Marketing, Advertising & Web Services", img: "https://img.freepik.com/free-photo/digital-marketing-technology-concept_23-2148481879.jpg" },
    { title: "Security Services", img: "https://img.freepik.com/free-photo/security-guard-uniform_23-2148430960.jpg" },
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
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm -z-10"></div>

      {/* Navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 h-20 transition-all duration-300 flex items-center ${
          scrolled
            ? "bg-blue-900/80 backdrop-blur-xl shadow-lg"
            : "bg-blue-900/60 backdrop-blur-md"
        }`}
      >
        <div className="max-w-6xl w-full mx-auto px-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-orange-400">SafeGrid</h1>
          <div className="space-x-6 text-gray-200 flex items-center">
            <Link href="/" className="hover:text-orange-400 transition">Home</Link>
            <Link href="/services" className="text-orange-400 font-semibold">Services</Link>
            <Link
              href="/portal"
              className="bg-orange-500 text-white px-4 py-2 rounded-lg shadow hover:bg-orange-400 transition"
            >
              Portal
            </Link>
          </div>
        </div>
      </nav>

      {/* Rest of the page content (services + industries grid) */}
    </div>
  );
}
