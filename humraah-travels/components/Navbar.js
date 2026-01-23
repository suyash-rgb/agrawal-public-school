import Link from "next/link";
import { FaPhone, FaBars, FaTimes } from "react-icons/fa";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="flex flex-col">
              <span className="font-bold text-green-700 text-lg">Humrahi</span>
              <span className="text-xs text-orange-500 leading-none">
                Friends • Couples • Journeys
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="hover:text-green-700 transition">
              Home
            </Link>
            <Link href="#destinations" className="hover:text-green-700 transition">
              Destinations
            </Link>
            <Link href="#singles" className="hover:text-green-700 transition">
              Singles to Mingles
            </Link>
            <Link href="#about" className="hover:text-green-700 transition">
              About
            </Link>
            <Link href="#contact" className="hover:text-green-700 transition">
              Contact
            </Link>
          </div>

          {/* CTA Button - Desktop */}
          <button className="hidden md:flex btn btn-success gap-2 text-white">
            <FaPhone /> Call Now
          </button>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden btn btn-ghost"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 border-t">
            <div className="flex flex-col gap-3 py-4">
              <Link
                href="/"
                className="px-4 py-2 hover:bg-gray-100 rounded transition"
              >
                Home
              </Link>
              <Link
                href="#destinations"
                className="px-4 py-2 hover:bg-gray-100 rounded transition"
              >
                Destinations
              </Link>
              <Link
                href="#singles"
                className="px-4 py-2 hover:bg-gray-100 rounded transition"
              >
                Singles to Mingles
              </Link>
              <Link
                href="#about"
                className="px-4 py-2 hover:bg-gray-100 rounded transition"
              >
                About
              </Link>
              <Link
                href="#contact"
                className="px-4 py-2 hover:bg-gray-100 rounded transition"
              >
                Contact
              </Link>
              <button className="btn btn-success gap-2 text-white mt-2 w-full">
                <FaPhone /> Call Now
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
