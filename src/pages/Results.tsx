
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";

const Results = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const generation = location.state?.generation;

  if (!generation) {
    navigate('/');
    return null;
  }

  // Confetti-like particles animation
  const particles = Array.from({ length: 50 }, (_, i) => i);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-gray-50 to-gray-100 relative overflow-hidden">
      {/* Celebration particles */}
      {particles.map((i) => (
        <motion.div
          key={i}
          initial={{
            opacity: 0,
            scale: 0,
            x: Math.random() * window.innerWidth,
            y: window.innerHeight + 100,
          }}
          animate={{
            opacity: [0, 1, 1, 0],
            scale: [0, 1, 1, 0],
            x: Math.random() * window.innerWidth,
            y: -100,
          }}
          transition={{
            duration: 2,
            delay: i * 0.02,
            repeat: Infinity,
            repeatDelay: 3,
          }}
          className={`absolute w-3 h-3 rounded-full ${
            i % 3 === 0 ? 'bg-blue-500' : i % 3 === 1 ? 'bg-pink-500' : 'bg-yellow-500'
          }`}
        />
      ))}

      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.8,
          type: "spring",
          bounce: 0.4
        }}
        className="w-full max-w-md z-10"
      >
        <div className="glass-card p-8 rounded-xl text-center backdrop-blur-sm">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Badge variant="secondary" className="mb-4 text-lg px-4 py-1">
              🎉 Congratulations!
            </Badge>
          </motion.div>

          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-4xl font-bold mb-6"
          >
            You're {generation}!
          </motion.h2>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-gray-600 mb-8"
          >
            {generation === "Gen Z"
              ? "Born between 1997 and 2012, you're part of the digital native generation known for your tech-savvy nature and global mindset."
              : "Born after 2012, you're part of the most technologically integrated generation, growing up with AI, smart devices, and immersive technology."}
          </motion.p>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <Button
              onClick={() => navigate('/')}
              variant="outline"
              className="px-8 py-6 text-lg"
            >
              Try Again
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Results;
