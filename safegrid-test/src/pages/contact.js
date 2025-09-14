import Navbar from "@/components/Navbar";

export default function Contact() {
  return (
    <div>
      <Navbar />
      <main className="pt-24 max-w-3xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
        <p className="text-gray-700 mb-4">Have a question or want to work together? Send us a message.</p>
        <form action="#" className="bg-white p-6 rounded-xl shadow space-y-4">
          <input className="w-full border p-3 rounded" placeholder="Your name" />
          <input className="w-full border p-3 rounded" placeholder="Your email" />
          <textarea className="w-full border p-3 rounded" placeholder="Message" rows="5" />
          <button className="bg-safeblue text-white px-5 py-3 rounded font-semibold">Send Message</button>
        </form>
      </main>
    </div>
  );
}
