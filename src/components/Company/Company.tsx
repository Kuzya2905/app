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
import { CompanyTypes, VacancyCardType } from "./Company.types";
import { RootState } from "@/lib/features/companies/types";

import { Vector } from "@/assets/svgs/Vector";

import styles from "./company.module.scss";
import findOneJobThunk from "@/lib/features/jobs/findOneJob/findOneJobThunk";

const Company: React.FC<CompanyTypes> = ({ companyId }) => {
  const [vacancies, setVacancies] = useState<VacancyCardType[] | null>(null);
  const [firstLoading, setFirstLoading] = useState(true);

  const dispatch = useDispatch<AppDispatch>();

  const foundCompany = useSelector(
    (state: RootState) => state.companiesReducers.findOneCompany.foundCompany
  );
  const idVacanciesCompany = foundCompany?.vacancy;

  useEffect(() => {
    const getCompany = async () => {
      await dispatch(findOneCompanyThunk(companyId));
      setFirstLoading(false);
    };
    getCompany();
  }, [companyId, dispatch]);

  useEffect(() => {
    if (!idVacanciesCompany) return;

    const getVacancies = async () => {
      const vacanciesCompany = await Promise.all(
        idVacanciesCompany.map(async (id: string) => {
          const vacancyData = await dispatch(findOneJobThunk(id));
          return vacancyData.payload as VacancyCardType;
        })
      );
      setVacancies(vacanciesCompany);
    };

    if (!firstLoading) {
      getVacancies();
    }
  }, [firstLoading, idVacanciesCompany, dispatch]);

  const userAddress = useTonAddress();

  const router = useRouter();
  const handleClickVacancy = (id: number) => router.push(`/vacancy/${id}`);

  const isOwner =
    userAddress &&
    userAddress ===
      { ...foundCompany, walletAddress: userAddress }.walletAddress;

  return (
    <>
      {firstLoading ? (
        <div className={styles.canvas}>
          <div className={styles.canvasWrapper}>
            <div className={styles.loading}>Loading...</div>
          </div>
        </div>
      ) : foundCompany ? (
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
                {foundCompany.title}
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
                      Total vacancies: {vacancies?.length}
                    </span>
                    <span className={styles.blockSort}>
                      By date of posting
                      <button className={styles.blockSortVector}>
                        <Vector />
                      </button>
                    </span>
                  </div>
                  <div className={styles.blockCards}>
                    {vacancies ? (
                      vacancies.map(
                        ({
                          id,
                          name,
                          experience,
                          typeOfEmployment,
                          city,
                          description,
                          salary,
                          date,
                        }) => (
                          <VacancyCard
                            onClick={() => handleClickVacancy(id)}
                            key={id}
                            name={name}
                            experience={experience}
                            typeOfEmployment={typeOfEmployment}
                            city={city}
                            description={description}
                            salary={salary}
                            company={foundCompany.title}
                            logo={foundCompany.logo}
                            date={date}
                          />
                        )
                      )
                    ) : (
                      <div>Loading...</div>
                    )}
                  </div>
                </div>
              </main>
              <aside>{<CompanyInfo dataCompany={foundCompany} />}</aside>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.canvas}>
          <div className={styles.canvasWrapper}>
            <div className={styles.noDataCompany}>
              No company data available
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Company;
