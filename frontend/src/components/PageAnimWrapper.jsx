import { motion } from "framer-motion";

export function PageAnimWrapper({ children }) {
  return (
    <motion.div
      layout
      className="flex w-full justify-center"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
}