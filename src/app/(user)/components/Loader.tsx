"use client";

import { motion } from "framer-motion";

const Loader = () => {
  // Single bar animation variant
  const barVariants = {
    animate: {
      scaleY: [1, 1.4, 1],
      opacity: [0.5, 1, 0.5],
      transition: {
        duration: 0.6,
        repeat: Infinity,
        repeatType: "mirror" as const, // type-safe, allowed values: 'loop' | 'mirror' | 'reverse'
      },
    },
  };

  const barStyle = {
    width: "8px",
    height: "40px",
    borderRadius: "4px",
    backgroundColor: "#0dcaf0", // same as bootstrap bg-info
    marginRight: "8px",
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "60vh",
      }}
    >
      {[0, 1, 2, 3].map((i) => (
        <motion.div
          key={i}
          style={barStyle}
          variants={barVariants}
          animate="animate"
          transition={{ delay: i * 0.1 }}
        />
      ))}
    </div>
  );
};

export default Loader;
