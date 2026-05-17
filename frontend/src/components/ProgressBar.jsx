import styles from "../styles/ProgressBar.module.css";

const ProgressBar = ({ current, max, progressColor }) => {
  const percentage =
    max > 0 ? Math.min(Math.round((current / max) * 100), 100) : 100;

  return (
    <div
      className={styles.wrapper}
      style={{
        "--progress-width": `${percentage}%`,
        "--progress-color": progressColor,
      }}
    >
      <div className={styles.track} />
    </div>
  );
};

export default ProgressBar;
