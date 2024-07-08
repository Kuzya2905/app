import RePostVacancy from "@/modules/vacancies/components/RePostVacancy/RePostVacancy";
import Layout from "@/components/Layout/Layout";

import styles from "@/app/page.module.css";

const PageVacancy = () => (
  <main className={styles.main}>
    <Layout>
      <RePostVacancy />
    </Layout>
  </main>
);

export default PageVacancy;
