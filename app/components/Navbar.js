"use client"
import Image from "next/image";
import { useEffect } from "react";

export default function Navbar() {
  useEffect(() => {
    const rootElement = document.getElementById('__next');
    if (rootElement) {
      rootElement.removeAttribute('pwa-launched');
      rootElement.removeAttribute('pwa-extension-id');
      rootElement.removeAttribute('pwa-extension-url-root');
    }
  }, []);

  return (
    <nav className="flex items-center justify-between px-6 py-4" style={{ backgroundColor: "#1a1a1a", color: "white" }}>
      {/* Logo Section */}
      <div className="flex items-center gap-2">
        <Image src="/GOE_Icon.png" alt="GOE Icon" width={80} height={80} />
      </div>

      {/* Navigation Links */}
      <ul className="hidden md:flex items-center gap-6 text-sm">
        <li className="hover:text-gold cursor-pointer">GOE</li>
        <li className="hover:text-gold cursor-pointer">EgyBook</li>
        <li className="hover:text-gold cursor-pointer">EgyExplore</li>
        <li className="hover:text-gold cursor-pointer">EgyTales</li>
        <li className="hover:text-gold cursor-pointer">EgyTreasure</li>
      </ul>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1 cursor-pointer">
          <Image src="/globe.svg" alt="Language Icon" width={16} height={16} />
          <span>EN</span>
        </div>
        <button className="px-4 py-2 bg-gold text-black rounded hover:bg-opacity-90">
          Login
        </button>
        <button className="px-4 py-2 bg-gold text-black rounded hover:bg-opacity-90">
          Sign up
        </button>
      </div>
    </nav>
  );
}