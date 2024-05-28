import Layout from "@/components/Layout/Layout";
import Companies from "@/components/Companies/Companies";

import styles from "@/app/page.module.css";

const PageCompanies = () => (
  <main className={styles.main}>
    <Layout>
      <Companies />
    </Layout>
  </main>
);

export default PageCompanies;
