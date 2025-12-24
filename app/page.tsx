import Hero from "@/components/Hero";
import Navbar from "@/components/HomeNav";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Hero />
    </div>
  );
}
