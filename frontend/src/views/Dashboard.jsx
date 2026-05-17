import { GraduationCap, CheckCircle2 } from "lucide-react";
import { dashboardData } from "../data/dashboardData";
import CategoryCard from "../components/CategoryCard";
import ProgressBar from "../components/ProgressBar";
import styles from "../styles/Dashboard.module.css";

const Dashboard = ({ onNavigate }) => {
  const totalPercentage = Math.round(
    (dashboardData.totalEarned / dashboardData.totalRequired) * 100,
  );

  return (
    <div className={styles.dashboard}>
      <section className={styles.summaryCard}>
        <div className={styles.summaryCardOverlay} />

        <div className={styles.summaryHeader}>
          <div className={styles.iconBadge}>
            <GraduationCap className="icon" />
          </div>
          <div>
            <h2 className={styles.summaryTitle}>總畢業學分進度</h2>
            <p className={styles.summaryMeta}>
              已取得 {dashboardData.totalEarned} / 應修{" "}
              {dashboardData.totalRequired} 學分
            </p>
          </div>
        </div>

        <div className={styles.summaryBody}>
          <div className={styles.summaryInfo}>
            <span className={styles.summaryLabel}>達成率</span>
            <span className={styles.summaryPercentage}>{totalPercentage}%</span>
          </div>
          <ProgressBar
            current={dashboardData.totalEarned}
            max={dashboardData.totalRequired}
            progressColor="#2563eb"
          />
        </div>
      </section>

      <div className={styles.grid}>
        {dashboardData.categories.map((category) => (
          <CategoryCard
            key={category.id}
            category={category}
            onNavigate={onNavigate}
          />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
