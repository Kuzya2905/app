import Layout from "@/components/Layout/Layout";
import Vacancy from "@/components/Vacancy/Vacancy";
import { PageCompanyTypes } from "./page.types";

import styles from "@/app/page.module.css";

const PageVacancy: React.FC<PageCompanyTypes> = ({ params }) => (
  <main className={styles.main}>
    <Layout wide={true}>
      <Vacancy vacancyId={params.idVacancy} />
    </Layout>
  </main>
);

export default PageVacancy;
