import { useState } from "react";
import styles from "./Navigation.module.css";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { s } from "framer-motion/client";
const Navigation = () => {
  const [navOpen, setNavOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const navItems: string[] = ["booking", "confirmation"];
  const variants = {
    open: {
      x: 0,
      transition: {
        ease: "easeOut",
        duration: 0.3,
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
    closed: {
      x: "-100%",
    },
  };
  const itemVariants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: -50 },
  };

  return (
    <>
      <button
        className={styles.navButton}
        onClick={() => {
          setNavOpen(!navOpen);
        }}
      >
        <img src="/navicon.svg" />
      </button>
      <motion.div
        initial="closed"
        animate={navOpen ? "open" : "closed"}
        variants={variants}
        className={styles.navigation}
      >
        {navItems.map((navItem) => {
          return (
            <motion.div
              whileTap={{ scale: 0.9 }}
              className={styles.navItem}
              variants={itemVariants}
              onClick={() => {
                navigate(`/${navItem}`);
                setNavOpen(false);
              }}
            >
              {navItem}
            </motion.div>
          );
        })}
      </motion.div>
    </>
  );
};

export default Navigation;
