import Navbar from "@/components/Navbar";

export default function About() {
  return (
    <div>
      <Navbar />
      <main className="pt-24 max-w-5xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4">About SafeGrid</h1>
        <p className="text-gray-700">SafeGrid connects employers and employees with a secure, easy-to-use platform. Our mission is to make hiring accessible and transparent.</p>
      </main>
    </div>
  );
}
