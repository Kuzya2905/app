import Layout from "@/components/Layout/Layout";
import Jobs from "@/components/Jobs/Jobs";

import styles from "@/app/page.module.css";

const PageVacancies = () => (
  <main className={styles.main}>
    <Layout>
      <Jobs />
    </Layout>
  </main>
);

export default PageVacancies;
