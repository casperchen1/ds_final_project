import { useState } from "react";
import Dashboard from "./views/Dashboard";
import DetailView from "./views/DetailView";
import styles from "./styles/App.module.css";

function App() {
  const [currentDetail, setCurrentDetail] = useState({
    detailId: null,
    title: "",
  });

  const handleNavigate = (detailId, title) => {
    setCurrentDetail({ detailId, title });
  };

  const handleBack = () => {
    setCurrentDetail({ detailId: null, title: "" });
  };

  return (
    <div className={styles.app}>
      <div className={styles.appContainer}>
        <header className={styles.pageHeader}>
          <p className={styles.pageSubtitle}>畢業進度儀表板</p>
          <h1 className={styles.pageTitle}>課程修習檢視</h1>
        </header>

        {currentDetail.detailId ? (
          <DetailView
            detailId={currentDetail.detailId}
            title={currentDetail.title}
            onBack={handleBack}
          />
        ) : (
          <Dashboard onNavigate={handleNavigate} />
        )}
      </div>
    </div>
  );
}

export default App;
