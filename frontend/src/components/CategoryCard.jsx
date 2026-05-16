import { CheckCircle2, AlertTriangle, FileText } from "lucide-react";
import ProgressBar from "./ProgressBar";
import styles from "../styles/CategoryCard.module.css";

const CategoryCard = ({ category, onNavigate }) => {
  const Icon = category.icon;

  return (
    <div
      className={styles.card}
      style={{
        "--card-header-bg": category.headerBg,
        "--accent-color": category.accentColor,
      }}
    >
      <div className={styles.cardHeader}>
        <div className={styles.iconWrapper}>
          <Icon className="icon" />
        </div>
        <div>
          <h3 className={styles.cardTitle}>{category.title}</h3>
          <div className={styles.cardMeta}>
            進度: <span>{category.earned}</span> / {category.required}{" "}
            {category.unit || "學分"}
          </div>
        </div>
      </div>

      <div className={styles.cardBody}>
        <ProgressBar
          current={category.earned}
          max={category.required}
          progressColor={category.progressColor}
        />

        <div className={styles.itemList}>
          {category.items.map((item, idx) => (
            <div key={idx} className={styles.itemRow}>
              <span className={styles.itemLabel}>
                <span className={styles.itemDot} />
                {item.name}
              </span>
              {item.status === "completed" && <CheckCircle2 className="icon" />}
              {item.status === "warning" && <AlertTriangle className="icon" />}
            </div>
          ))}
        </div>

        {category.warnings.length > 0 && (
          <div className={styles.warningBox}>
            <div className={styles.warningInner}>
              <AlertTriangle className="icon" />
              <ul className={styles.warningList}>
                {category.warnings.map((warn, idx) => (
                  <li key={idx}>{warn}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>

      <div className={styles.cardFooter}>
        <button
          onClick={() => onNavigate(category.detailId, category.title)}
          className={styles.ctaButton}
          style={{ "--accent-color": category.accentColor }}
        >
          <FileText className="icon" />
          查看修課明細
        </button>
      </div>
    </div>
  );
};

export default CategoryCard;
