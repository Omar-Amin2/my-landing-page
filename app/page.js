import HeroSection from "./components/HeroSection.js";
import Navbar from "./components/Navbar.jsx";

export default function Home() {
  return (
    <main style={{ minHeight: '100vh' }}>
      <Navbar />
      <HeroSection />
    </main>
  );
}
