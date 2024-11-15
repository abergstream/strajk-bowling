import { Link } from "react-router-dom";
import styles from "./LandingPage.module.css";
import { motion } from "framer-motion";
const LandingPage = () => {
  return (
    <motion.div
      exit={{ y: "-100%" }}
      transition={{ duration: 0.25 }}
      key="landingPage"
      className={styles.wrapper}
    >
      <Link to="/booking" className={styles.linkWrapper}>
        <img src="/logo.svg" />
        <div className={styles.title}>STRAJK</div>
        <div className={styles.subTitle}>BOWLING</div>
      </Link>
    </motion.div>
  );
};

export default LandingPage;
