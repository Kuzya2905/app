import React from "react";

import styles from "./previwVacancy.module.scss";
import Button from "@/components/Button/Button";
import { convertISOToDate } from "@/helpers/helpers";
import { PreviewVacancyTypes } from "./PreviewVacancyTypes";

const PreviewVacancy: React.FC<PreviewVacancyTypes> = ({
  closePreview,
  specification,
  basicInformation,
}) => {
  const currentDateISO = new Date().toISOString();
  return (
    <div className={styles.modalPreviewVacancy}>
      <div className={styles.previewWrapper}>
        <div className={styles.blockTop}>
          <Button
            onClick={closePreview}
            appearance="primary"
            size="s"
            className={styles.blockTopClose}
            disabled={false}
            iconСross={true}
          >
            Test
          </Button>
          <h1 className={styles.blockTopTitle}>{basicInformation[0]}</h1>
          <ul className={styles.blockTotalInfo}>
            <li className={styles.totalInfoItem}>
              {convertISOToDate(currentDateISO)}
            </li>
            <li className={styles.totalInfoItem}>{basicInformation[5]}</li>
            <li className={styles.totalInfoItem}>
              Experience from {basicInformation[3]}
            </li>
            <li className={styles.totalInfoItem}>{basicInformation[4]}</li>
            <li className={styles.totalInfoItem}>London</li>
          </ul>
        </div>
        <div className={styles.blockInformation}>
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Description</h2>
            <div className={styles.sectionText}>{specification[0]}</div>
          </div>
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Requirements</h2>
            <div className={styles.sectionText}>{specification[1]}</div>
          </div>
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Responsibilities</h2>
            <div className={styles.sectionText}>{specification[2]}</div>
          </div>
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Terms and conditions</h2>
            <div className={styles.sectionText}>{specification[3]}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewVacancy;
