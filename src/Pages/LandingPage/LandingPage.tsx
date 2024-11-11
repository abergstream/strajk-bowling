import { Link } from "react-router-dom";
import styles from "./LandingPage.module.css";
import { motion } from "framer-motion";
const LandingPage = () => {
  return (
    <motion.div exit={{ opacity: 0 }} className={styles.wrapper}>
      <Link to="/booking" className={styles.linkWrapper}>
        <img src="/logo.svg" />
        <div className={styles.title}>STRAJK</div>
        <div className={styles.subTitle}>BOWLING</div>
      </Link>
    </motion.div>
  );
};

export default LandingPage;
