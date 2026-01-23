import { FaPlaneDeparture } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen bg-base-200 flex flex-col items-center justify-center"
    >
      <div className="text-center">
        <h1 className="text-5xl font-bold mb-4 flex items-center justify-center">
          <FaPlaneDeparture className="mr-3 text-primary" /> Humraah Travels
        </h1>
        <p className="text-lg mb-6">
          Discover breathtaking destinations and unforgettable journeys.
        </p>
        <button className="btn btn-primary">Book Your Trip</button>
      </div>
    </motion.div>
  );
}