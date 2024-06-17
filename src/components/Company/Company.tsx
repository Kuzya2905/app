"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTonAddress } from "@tonconnect/ui-react";
import { useDispatch, useSelector } from "react-redux";

import VacancyCard from "@/components/VacancyCard/VacancyCard";
import CompanyInfo from "@/components/CompanyInfo/CompanyInfo";
import Button from "../Button/Button";
import findOneCompanyThunk from "@/lib/features/companies/findOneCompany/findOneCompanyThunk";

import { AppDispatch } from "@/lib/store";
import { CompanyData, CompanyTypes, VacancyCardType } from "./Company.types";
import { RootState } from "@/lib/features/companies/types";

import { Vector } from "@/assets/svgs/Vector";

import styles from "./company.module.scss";

const Company: React.FC<CompanyTypes> = ({ companyId }) => {
  const [companyData, setCompanyData] = useState<CompanyData | null>(null);
  const firstLoading = useRef(true);

  const dispatch = useDispatch<AppDispatch>();

  const foundCompany = useSelector(
    (state: RootState) => state.companiesReducers.findOneCompany.foundCompany
  );

  const getCompany = async () => {
    await dispatch(findOneCompanyThunk(companyId));
    setCompanyData(foundCompany);
    firstLoading.current = false;
  };

  useEffect(() => {
    getCompany();
  }, []);

  const companiesJSON = localStorage.getItem("CardsCompanies");
  const dataCompany =
    companiesJSON &&
    JSON.parse(companiesJSON).find(
      (company: { id: number }) => company.id === Number(companyId)
    );

  const vacanciesJSON = localStorage.getItem("CardsVacancies");
  const vacancies = vacanciesJSON && JSON.parse(vacanciesJSON);

  const vacanciesCompany: VacancyCardType[] = vacancies.filter(
    (vacancy: VacancyCardType) => vacancy.idCompany === Number(companyId)
  );

  const userAddress = useTonAddress();

  const router = useRouter();
  const handleClickVacancy = (id: number) => router.push(`/vacancy/${id}`);

  const isOwner =
    userAddress &&
    userAddress ===
      { ...dataCompany, walletAddress: userAddress }.walletAddress;

  return (
    <>
      {firstLoading.current ? (
        <div className={styles.canvas}>
          <div className={styles.canvasWrapper}>
            <div className={styles.loading}>Loading...</div>
          </div>
        </div>
      ) : companyData ? (
        <div className={styles.canvas}>
          <div className={styles.canvasWrapper}>
            <div className={styles.wrapperBlockLinks}>
              <Link className={styles.blockLink} href="/">
                Main
              </Link>
              <span className={styles.blockSlash}>/</span>
              <Link className={styles.blockLink} href="/companies">
                Companies
              </Link>
              <span className={styles.blockSlash}>/</span>
              <Link className={styles.blockLinkCurrent} href={""}>
                {companyData.title}
              </Link>
            </div>
            <div className={styles.wrapperBlockMain}>
              <main className={styles.main}>
                <div className={styles.mainTitleWrapper}>
                  <h1 className={styles.mainTitle}>Active jobs</h1>
                  {isOwner && (
                    <Button
                      appearance="primary"
                      size="m"
                      onClick={() => router.push("/vacancy/create")}
                    >
                      Publish
                    </Button>
                  )}
                </div>

                <div className={styles.mainBlock}>
                  <div className={styles.blockTotalSort}>
                    <span className={styles.blockTotal}>
                      Total vacancies: {vacanciesCompany.length}
                    </span>
                    <span className={styles.blockSort}>
                      By date of posting
                      <button className={styles.blockSortVector}>
                        <Vector />
                      </button>
                    </span>
                  </div>
                  <div className={styles.blockCards}>
                    {vacanciesCompany.map(
                      ({
                        idVacancy,
                        name,
                        experience,
                        typeOfEmployment,
                        city,
                        description,
                        salary,
                        date,
                      }) => (
                        <VacancyCard
                          onClick={() => handleClickVacancy(idVacancy)}
                          key={idVacancy}
                          name={name}
                          experience={experience}
                          typeOfEmployment={typeOfEmployment}
                          city={city}
                          description={description}
                          salary={salary}
                          company={dataCompany.title}
                          logo={dataCompany.logo}
                          date={date}
                        />
                      )
                    )}
                  </div>
                </div>
              </main>
              <aside>{<CompanyInfo dataCompany={companyData} />}</aside>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.canvas}>
          <div className={styles.canvasWrapper}>No company data available</div>
        </div>
      )}
    </>
  );
};

export default Company;
