"use client";

import React from "react";
import Link from "next/link";

import { vacancyInfo } from "./VacancyData";
import { cardsVacancies } from "@/components/RegisteredVacancies/RegisteredVacanciesDate";
import { cardsCompanies } from "@/components/Companies/CompaniesData";
import { convertISOToDate, yearDeclensionEn } from "@/helpers/helpers";
import { useTonAddress } from "@tonconnect/ui-react";
import VacancyInfo from "../VacancyInfo/VacancyInfo";
import VacancyApply from "@/components/VacancyApply/VacancyApply";
import { CompanyTypes } from "./Vacancy.types";

import styles from "./vacancy.module.scss";

const Vacancy: React.FC<CompanyTypes> = ({ vacancyId }) => {
  const pathname = usePathname();
  const userFriendlyAddress = useTonAddress();

  const matchedId = pathname.match(/\d+/);
  const idCompany = matchedId ? matchedId[0] : null;

  const dataVacancy = cardsVacancies.find(
    (vacancy) => vacancy.idVacancy === Number(vacancyId)
  );

  const idCompany = String(dataVacancy?.idCompany);

  const dataCompany = cardsCompanies.find(({ id }) => id === Number(idCompany));

  return (
    <>
      {dataVacancy ? (
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
              <Link
                className={styles.blockLinkCurrent}
                href={`/company/${idCompany}`}
              >
                {dataCompany?.title}
              </Link>
              <span className={styles.blockSlash}>/</span>
              <Link className={styles.blockLinkCurrent} href={""}>
                {dataVacancy?.name}
              </Link>
            </div>
            <div className={styles.blockTop}>
              <h1 className={styles.blockTopTitle}>{dataVacancy.name}</h1>
              <ul className={styles.blockTotalInfo}>
                <li className={styles.totalInfoItem}>
                  {convertISOToDate(dataVacancy.date)}
                </li>
                <li className={styles.totalInfoItem}>
                  From $ {dataVacancy.salary}
                </li>
                <li className={styles.totalInfoItem}>
                  Experience from {yearDeclensionEn(dataVacancy.experience)}
                </li>
                <li className={styles.totalInfoItem}>{dataVacancy.mode}</li>
                <li className={styles.totalInfoItem}>{dataVacancy.city}</li>
              </ul>
            </div>
            <div className={styles.wrapperBlockMain}>
              <div className={styles.blockInformation}>
                <div className={styles.sectionDescription}>
                  <h2 className={styles.descriptionTitle}>Description</h2>
                  <div className={styles.descriptionText}>
                    {vacancyInfo.description}
                  </div>
                </div>
                <div className={styles.sectionOther}>
                  <h3 className={styles.otherTitle}>Requirements</h3>
                  <div className={styles.otherBlock}>
                    {vacancyInfo.requirements.map((item) => (
                      <span key={item} className={styles.otherItem}>
                        <span className={styles.otherItemVector}></span>
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
                <div className={styles.sectionOther}>
                  <h3 className={styles.otherTitle}>Responsibilities</h3>
                  <div className={styles.otherBlock}>
                    {vacancyInfo.responsibilities.map((item) => (
                      <span key={item} className={styles.otherItem}>
                        <span className={styles.otherItemVector}></span>
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
                <div className={styles.sectionOther}>
                  <h3 className={styles.otherTitle}>TermsAndConditions</h3>
                  <div className={styles.otherBlock}>
                    {vacancyInfo.termsAndConditions.map((item) => (
                      <span key={item} className={styles.otherItem}>
                        <span className={styles.otherItemVector}></span>
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <aside className={styles.aside}>
                {
                  dataCompany && userFriendlyAddress && userFriendlyAddress === {...dataCompany, walletAddress: userFriendlyAddress}.walletAddress ? (
                    <VacancyInfo dataVacancy={dataVacancy}></VacancyInfo>
                  ) : (
                   <VacancyApply dataCompany={dataCompany} idCompany={idCompany} /> 
                  )
                }              
              </aside>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.canvas}>
          <div className={styles.canvasWrapper}>No Vacancy data available</div>
        </div>
      )}
    </>
  );
};

export default Vacancy;
