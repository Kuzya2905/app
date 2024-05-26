import Layout from "@/components/Layout/Layout";
import CompanyEdit from "@/components/CompanyEdit/CompanyEdit";

import styles from "@/app/page.module.css";

const PageCompanyEdit = () => (
  <main className={styles.main}>
    <Layout wide={true}>
      <CompanyEdit />
    </Layout>
  </main>
);

export default PageCompanyEdit;
