import { ArrowLeft, FileText, AlertTriangle, CheckCircle2 } from "lucide-react";
import { mockDetailRecords } from "../data/dashboardData";
import styles from "../styles/DetailView.module.css";

const DetailView = ({ detailId, title, onBack }) => {
  const records = mockDetailRecords[detailId] || [];

  return (
    <div className={styles.detailContainer}>
      <div className={styles.detailHeader}>
        <button onClick={onBack} className={styles.backButton}>
          <ArrowLeft className="icon" />
        </button>
        <div>
          <h2 className={styles.detailTitle}>{title}</h2>
          <p className={styles.detailSubtitle}>修課明細紀錄</p>
        </div>
      </div>

      <div className={styles.detailBody}>
        {records.length > 0 ? (
          <div className={styles.tableWrapper}>
            <table className={styles.detailTable}>
              <thead>
                <tr className={styles.tableHeadRow}>
                  <th className={styles.tableCell}>學期</th>
                  <th className={styles.tableCell}>課程名稱</th>
                  <th className={styles.tableCell}>類別</th>
                  <th
                    className={`${styles.tableCell} ${styles.tableCellCenter}`}
                  >
                    學分
                  </th>
                  <th
                    className={`${styles.tableCell} ${styles.tableCellCenter}`}
                  >
                    成績
                  </th>
                  <th
                    className={`${styles.tableCell} ${styles.tableCellCenter}`}
                  >
                    狀態
                  </th>
                </tr>
              </thead>
              <tbody>
                {records.map((record, idx) => (
                  <tr
                    key={idx}
                    className={`${styles.tableBodyRow} ${record.status === "missing" ? styles.missingRow : ""}`}
                  >
                    <td className={styles.tableCell}>{record.semester}</td>
                    <td className={styles.tableCell}>{record.name}</td>
                    <td className={styles.tableCell}>
                      <span className={styles.badge}>{record.type}</span>
                    </td>
                    <td
                      className={`${styles.tableCell} ${styles.tableCellCenter}`}
                    >
                      {record.credit}
                    </td>
                    <td
                      className={`${styles.tableCell} ${styles.tableCellCenter}`}
                    >
                      {record.score}
                    </td>
                    <td
                      className={`${styles.tableCell} ${styles.tableCellCenter}`}
                    >
                      {record.status === "missing" ? (
                        <span
                          className={`${styles.badge} ${styles.badgeMissing}`}
                        >
                          <AlertTriangle className="icon" /> 缺修
                        </span>
                      ) : (
                        <span
                          className={`${styles.badge} ${styles.badgePassed}`}
                        >
                          <CheckCircle2 className="icon" /> 通過
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>
              <FileText className="icon" />
            </div>
            <p>尚無修課紀錄</p>
            <p>目前該類別沒有任何已登記的課程資料</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailView;
