import styles from "./SectionTitle.module.css";
const SectionTitle: React.FC<{ title: string }> = ({ title }) => {
  return <div className={styles.sectionTitle}>{title}</div>;
};

export default SectionTitle;
