import Company from "@/components/Company/Company";
import Layout from "@/components/Layout/Layout";
import { PageCompanyTypes } from "./page.types";

import styles from "@/app/page.module.css";

const PageCompany: React.FC<PageCompanyTypes> = ({ params }) => (
  <main className={styles.main}>
    <Layout wide={true}>
      <Company companyId={params.idCompany} />
    </Layout>
  </main>
);

export default PageCompany;
