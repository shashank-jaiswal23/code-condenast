import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";

export const SlideUp = ({ children }) => {
  const [ref, inView, entry] = useInView({
    /* Optional options */
    triggerOnce: true,
    threshold: 0,
  });

  return (
    <div ref={ref}>
      <motion.div
        initial={{
          opacity: 0,
          y: 36,
        }}
        animate={{
          opacity: inView ? 1 : 0,
          y: inView ? 0 : 36,
        }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export const SlideLeft = ({ children }) => {
  const [ref, inView, entry] = useInView({
    /* Optional options */
    triggerOnce: true,
    threshold: 0,
  });

  return (
    <div ref={ref}>
      <motion.div
        initial={{
          opacity: 0,
          x: 36,
        }}
        animate={{
          opacity: inView ? 1 : 0,
          x: inView ? 0 : 36,
        }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {children}
      </motion.div>
    </div>
  );
};
