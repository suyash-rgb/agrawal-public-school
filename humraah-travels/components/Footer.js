import Link from "next/link";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <div className="flex flex-col mb-4">
              <span className="font-bold text-white text-lg">Humrahi</span>
              <span className="text-sm text-orange-400">
                Friends • Couples • Journeys
              </span>
            </div>
            <p className="text-sm mb-4">
              Premium travel community for friends, couples, and solo
              travellers.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="hover:text-blue-400 transition">
                <FaFacebook className="text-xl" />
              </Link>
              <Link href="#" className="hover:text-pink-400 transition">
                <FaInstagram className="text-xl" />
              </Link>
              <Link href="#" className="hover:text-blue-400 transition">
                <FaTwitter className="text-xl" />
              </Link>
              <Link href="#" className="hover:text-blue-500 transition">
                <FaLinkedin className="text-xl" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-white transition">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#destinations" className="hover:text-white transition">
                  Destinations
                </Link>
              </li>
              <li>
                <Link href="#singles" className="hover:text-white transition">
                  Singles to Mingles
                </Link>
              </li>
              <li>
                <Link href="#about" className="hover:text-white transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#contact" className="hover:text-white transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Services</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="hover:text-white transition">
                  Group Trips
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition">
                  Couple Getaways
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition">
                  Solo Adventures
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition">
                  Custom Tours
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Contact Us</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <FaPhone className="text-green-400" />
                <span>+91-XXXXX-XXXXX</span>
              </div>
              <div className="flex items-center gap-2">
                <FaEnvelope className="text-blue-400" />
                <span>hello@humrahi.com</span>
              </div>
              <div className="flex items-start gap-2">
                <FaMapMarkerAlt className="text-red-400 mt-1" />
                <span>New Delhi, India</span>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-center md:text-left">
            <p>
              &copy; 2024 Humrahi Travels. All rights reserved.
            </p>
            <div className="flex justify-center md:justify-end gap-6">
              <Link href="#" className="hover:text-white transition">
                Privacy Policy
              </Link>
              <Link href="#" className="hover:text-white transition">
                Terms of Service
              </Link>
              <Link href="#" className="hover:text-white transition">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
