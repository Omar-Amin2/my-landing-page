import Footer from "./components/Footer.jsx";
import HeroSection from "./components/HeroSection.jsx";
import Navbar from "./components/Navbar.jsx";

export default function Home() {


  return (
    <main style={{ minHeight: '100vh' }}>
      <Navbar />
      <HeroSection />
      <Footer />
    </main>
  );
}
