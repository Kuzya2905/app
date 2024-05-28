import Link from "next/link";

import { VacancyFormEdit } from "@/modules/vacancies/components/vacancyFormEdit";

import styles from "./styles.module.scss";

export const EditVacancy = () => (
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
      <h1 className={styles.title}>Job editing</h1>
      <VacancyFormEdit />
    </div>
  </div>
);
