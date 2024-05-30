import { EditVacancy } from "@/modules/vacancies/components/EditVacancy";
import Layout from "@/components/Layout/Layout";

import styles from "@/app/page.module.css";

const PageVacancy = () => (
  <main className={styles.main}>
    <Layout>
      <EditVacancy />
    </Layout>
  </main>
);

export default PageVacancy;
