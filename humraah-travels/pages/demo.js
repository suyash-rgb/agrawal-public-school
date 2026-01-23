import { FaMapMarkedAlt, FaStar, FaCheckCircle } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Demo() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col items-center justify-center p-6 min-h-screen"
      >
        {/* Main Card */}
        <div className="card w-full max-w-2xl bg-base-100 shadow-2xl">
          <div className="card-body text-center">
            <h2 className="card-title justify-center text-3xl mb-2">
              <FaMapMarkedAlt className="text-primary mr-2" />
              Demo Page
            </h2>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
              Tailwind Test
            </h1>
            <h1 className="text-4xl font-bold text-secondary mb-4">
              Tailwind Sanity Check
            </h1>
            <p className="mt-2 text-lg">
              This is a test page using Tailwind, DaisyUI, and Framer Motion.
            </p>

            {/* DaisyUI Alert */}
            <div className="alert alert-info mt-6">
              <FaCheckCircle className="text-xl" />
              <span>Tailwind CSS v4 and DaisyUI are working perfectly!</span>
            </div>

            {/* DaisyUI Badges */}
            <div className="flex flex-wrap justify-center gap-2 mt-6">
              <div className="badge badge-primary">Tailwind</div>
              <div className="badge badge-secondary">DaisyUI</div>
              <div className="badge badge-accent">Framer Motion</div>
              <div className="badge badge-success">Next.js</div>
            </div>

            {/* DaisyUI Stats */}
            <div className="grid grid-cols-3 gap-4 mt-8">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="stat bg-base-200 rounded-lg p-4"
              >
                <div className="stat-figure text-primary text-3xl">
                  <FaStar />
                </div>
                <div className="stat-title">Quality</div>
                <div className="stat-value text-primary">100%</div>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="stat bg-base-200 rounded-lg p-4"
              >
                <div className="stat-figure text-secondary text-3xl">⚡</div>
                <div className="stat-title">Speed</div>
                <div className="stat-value text-secondary">Fast</div>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="stat bg-base-200 rounded-lg p-4"
              >
                <div className="stat-figure text-accent text-3xl">✨</div>
                <div className="stat-title">Style</div>
                <div className="stat-value text-accent">Modern</div>
              </motion.div>
            </div>

            {/* Buttons */}
            <div className="card-actions justify-center mt-8 gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn btn-primary btn-lg"
              >
                Explore More
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn btn-outline btn-secondary btn-lg"
              >
                Back Home
              </motion.button>
            </div>
          </div>
        </div>

        {/* Floating Cards */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="mt-12 max-w-md w-full"
        >
          <div className="card bg-gradient-to-r from-cyan-400 to-blue-500 shadow-lg text-white">
            <div className="card-body">
              <h3 className="card-title text-white">Testing Complete!</h3>
              <p>All styling frameworks are configured and working.</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}