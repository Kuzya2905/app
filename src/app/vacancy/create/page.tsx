import { CreationVacancy } from "@/modules/vacancies/components/CreationVacancy";
import Layout from "@/components/Layout/Layout";

import styles from "@/app/page.module.css";

const PageVacancy = () => (
  <main className={styles.main}>
    <Layout>
      <CreationVacancy />
    </Layout>
  </main>
);

export default PageVacancy;
