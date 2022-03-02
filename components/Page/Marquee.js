import { motion } from "framer-motion";

const Marquee = ({ state }) => {
  return (
    <aside role="complementary" id="marquee">
      <motion.div
        className="marky-parent"
        initial={{
          y: 0,
          height: 0,
        }}
        animate={{
          height: state === "intro" ? "auto" : "0",
        }}
        transition={{
          duration: 0.6,
        }}
      >
        <div className="marky">
          <div>
            <img src="/svgs/conde-code.svg" alt="The Condé Code" />
          </div>
        </div>
      </motion.div>
      <style jsx>{`
        .marky {
          width: 100vw;
        }

        img {
          width: 100vw;
          padding: 1rem;
        }
        aside {
          position: fixed;
          bottom: 0;
          left: 0;
          width: 100vw;
          z-index: 18;
          pointer-events: none;
        }

        @media (max-height: 360px) {
          aside {
            display: none;
          }
        }
      `}</style>
    </aside>
  );
};

export default Marquee;
