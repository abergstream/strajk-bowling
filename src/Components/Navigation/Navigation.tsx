import { useState } from "react";
import styles from "./Navigation.module.css";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

type variantsType = {
  open: {
    x: number;
    transition: {
      ease: string;
      duration: number;
      staggerChildren: number;
      delayChildren: number;
    };
  };
  closed: {
    x: string;
  };
};
type itemVariantsType = {
  open: {
    opacity: number;
    x: number;
  };
  closed: {
    opacity: number;
    x: number;
  };
};
const Navigation = () => {
  const [navOpen, setNavOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const navItems: string[] = ["booking", "confirmation"];
  const variants: variantsType = {
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
  const itemVariants: itemVariantsType = {
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
