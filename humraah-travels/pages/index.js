"use client";

import { motion } from "framer-motion";
import { FaWhatsapp, FaPhone, FaCompass } from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Button } from "@mui/material";

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8 },
    },
  };

  const pillVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6 },
    },
    hover: {
      scale: 1.05,
      transition: { duration: 0.3 },
    },
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      {/* Hero Section */}
      <section className="relative flex-grow">
        {/* Background Image with Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1600&h=900&fit=crop')",
          }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-6 py-12">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center max-w-4xl mx-auto"
          >
            {/* Logo */}
            <motion.div
              variants={itemVariants}
              className="mb-8 flex justify-center"
            >
              <div className="bg-white rounded-2xl p-6 shadow-2xl w-48 h-48 flex items-center justify-center">
                <div className="text-center">
                  <div className="font-bold text-green-700 text-3xl mb-1">
                    Humrahi
                  </div>
                  <div className="text-orange-500 text-xs">
                    Friends • Couples • Journeys
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Heading */}
            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg"
            >
              Har Safar Ka Ek Humrahi
            </motion.h1>

            {/* Subheading */}
            <motion.p
              variants={itemVariants}
              className="text-xl md:text-2xl text-gray-100 mb-12 drop-shadow-md font-bold"
            >
              Premium travel community jo friends, couples, aur solo travellers
              ke liye thoughtfully curated
              trips plan karti hai
            </motion.p>

            {/* Pill Buttons */}
            <motion.div
              variants={containerVariants}
              className="flex flex-wrap justify-center gap-4 mb-12"
            >
              {["Explore", "Relax", "Connect", "Travel"].map((pill) => (
                <motion.button
                  key={pill}
                  variants={pillVariants}
                  whileHover="hover"
                  className="px-8 py-3 rounded-full border-2 border-white text-white font-semibold hover:bg-white hover:text-gray-800 transition backdrop-blur-sm bg-white/10"
                >
                  {pill}
                </motion.button>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              variants={containerVariants}
              className="flex flex-col sm:flex-row justify-center gap-6 flex-wrap"
            >
              <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<FaWhatsapp />}
                  sx={{
                    backgroundColor: "#22c55e",
                    "&:hover": {
                      backgroundColor: "#16a34a",
                    },
                    padding: "12px 32px",
                    fontSize: "1.1rem",
                    fontWeight: 600,
                    minWidth: "200px",
                    textTransform: "none",
                    borderRadius: "12px",
                  }}
                >
                  WhatsApp Enquiry
                </Button>
              </motion.div>

              <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<FaPhone />}
                  sx={{
                    backgroundColor: "#f97316",
                    "&:hover": {
                      backgroundColor: "#ea580c",
                    },
                    padding: "12px 32px",
                    fontSize: "1.1rem",
                    fontWeight: 600,
                    minWidth: "200px",
                    textTransform: "none",
                    borderRadius: "12px",

                  }}
                >
                  Call Now
                </Button>
              </motion.div>

              <motion.div
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  variant="contained"
                  size="large"
                  startIcon={<FaCompass />}
                  sx={{
                    backgroundColor: "#3b82f6",
                    "&:hover": {
                      backgroundColor: "#2563eb",
                    },
                    padding: "12px 32px",
                    fontSize: "1.1rem",
                    fontWeight: 600,
                    minWidth: "200px",
                    textTransform: "none",
                    borderRadius: "12px",
                  }}
                >
                  Explore Trips
                </Button>
              </motion.div>
            </motion.div>
            <motion.p
              variants={itemVariants}
              className="text-xl md:text-2xl text-gray-100 mb-12 drop-shadow-md font-bold italic"
            >
              Travel with purpose. Connect with people. Create memories.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}