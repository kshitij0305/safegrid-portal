import { useEffect, useState } from "react";

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
      {/* Overlay */}
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
            <a href="/" className="hover:text-orange-400 transition">Home</a>
            <a href="/services" className="text-orange-400 font-semibold">Services</a>
            <a
              href="/portal"
              className="bg-orange-500 text-white px-4 py-2 rounded-lg shadow hover:bg-orange-400 transition"
            >
              Portal
            </a>
          </div>
        </div>
      </nav>

      {/* Page Content */}
      <main className="pt-28 pb-20 max-w-6xl mx-auto px-6">
        {/* 🚀 Tagline Banner */}
        <section className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-orange-400">
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
                <img src={service.img} alt={service.title} className="w-full h-40 object-cover" />
                <div className="p-6">
                  <h4 className="text-xl font-bold text-blue-800">{service.title}</h4>
                  <p className="mt-3 text-gray-700">{service.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Industries Section */}
        <section>
          <h3 className="text-3xl font-semibold mb-8 text-center">Industries We Serve</h3>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
            {industries.map((industry, i) => (
              <div
                key={i}
                className="bg-white/80 text-gray-900 rounded-xl shadow-lg overflow-hidden hover:scale-105 hover:shadow-xl transition"
              >
                <img src={industry.img} alt={industry.title} className="w-full h-40 object-cover" />
                <div className="p-4">
                  <h4 className="text-lg font-semibold text-blue-800">{industry.title}</h4>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
