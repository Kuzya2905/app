import Link from "next/link";

import VacancyFormRePost from "@/modules/vacancies/components/VacancyFormRePost/VacancyFormRePost";

import styles from "./styles.module.scss";

const RePostVacancy = () => (
  <div className={styles.creation}>
    <div className={styles.creationWrapper}>
      <div className={styles.wrapperBlockLinks}>
        <Link className={styles.blockLink} href="/">
          Main
        </Link>
        <span className={styles.blockSlash}>/</span>
        <Link className={styles.blockLink} href="/companies">
          Companies
        </Link>
        <span className={styles.blockSlash}>/</span>
        <Link className={styles.blockLinkCurrent} href={""}>
          Stellar
        </Link>
      </div>
      <h1 className={styles.title}>Re-posting a vacancy</h1>
      <VacancyFormRePost />
    </div>
  </div>
);

export default RePostVacancy;
