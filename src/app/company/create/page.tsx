import Layout from "@/components/Layout/Layout";
import CompanyCreation from "@/components/CompanyCreation/CompanyCreation";

import styles from "@/app/page.module.css";

const PageCompanyCreation = () => (
  <main className={styles.main}>
    <Layout wide={true}>
      <CompanyCreation />
    </Layout>
  </main>
);

export default PageCompanyCreation;
