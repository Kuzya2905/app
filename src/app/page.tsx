import { Metadata } from "next";
import MainScreen from "@/components/MainScreen/MainScreen";
import Layout from "@/components/Layout/Layout";
import Banner from "@/components/Banner/Banner";
import RegisteredVacancies from "@/components/RegisteredVacancies/RegisteredVacancies";
import RegisteredCompanies from "@/components/RegisteredСompanies/RegisteredCompanies";

import styles from "./page.module.css";


export const metadata: Metadata = {
  title: "Decentral job | $DCJ",
  description:
    "Ready to ride the crypto wave? Explore endless opportunities in the exciting realm of cryptocurrency careers. Dive into the innovative world of blockchain technology, where your potential knows no bounds. Join us on this thrilling journey and unlock your path to success in the fast-paced world of crypto.",
};


const Home = () => (
  <main className={styles.main}>
    <Layout>
      <MainScreen />
      <RegisteredVacancies />
      <Banner />
      <RegisteredCompanies />
    </Layout>
  </main>
);

export default Home;
