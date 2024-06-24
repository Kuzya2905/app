import React from "react";

import Button from "@/components/Button/Button";
import { convertISOToDate, transformValueExperience } from "@/helpers/helpers";

import { PreviewVacancyTypes } from "./PreviewVacancyTypes";

import styles from "./previewVacancy.module.scss";

const PreviewVacancy: React.FC<PreviewVacancyTypes> = ({
  closePreview,
  jobDescription,
  basicInformation,
}) => {
  const currentDateISO = new Date().toISOString();

  return (
    <div className={styles.modalPreviewVacancy}>
      <div className={styles.previewWrapper}>
        <div className={styles.blockTop}>
          <Button
            onClick={closePreview}
            appearance="close"
            size="xl"
            className={styles.blockTopClose}
            disabled={false}
          />
          <h1 className={styles.blockTopTitle}>{basicInformation[0]}</h1>
          <ul className={styles.blockTotalInfo}>
            <li className={styles.totalInfoItem}>
              {convertISOToDate(currentDateISO)}
            </li>
            <li className={styles.totalInfoItem}>
              From ${basicInformation[5]}
            </li>
            <li className={styles.totalInfoItem}>
              <>{transformValueExperience(Number(basicInformation[3]))}</>
            </li>
            <li className={styles.totalInfoItem}>{basicInformation[4]}</li>
            <li className={styles.totalInfoItem}>London</li>
          </ul>
        </div>
        <div className={styles.blockInformation}>
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Description</h2>
            <div className={styles.sectionText}>{jobDescription[0]}</div>
          </div>
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Requirements</h2>
            <div className={styles.sectionText}>{jobDescription[1]}</div>
          </div>
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Responsibilities</h2>
            <div className={styles.sectionText}>{jobDescription[2]}</div>
          </div>
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Terms and conditions</h2>
            <div className={styles.sectionText}>{jobDescription[3]}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewVacancy;
