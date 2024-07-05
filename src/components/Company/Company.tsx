"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTonAddress } from "@tonconnect/ui-react";
import { useDispatch, useSelector } from "react-redux";

import VacancyCard from "@/components/VacancyCard/VacancyCard";
import CompanyInfo from "@/components/CompanyInfo/CompanyInfo";
import Button from "@/components/Button/Button";
import findOneCompanyThunk from "@/lib/features/companies/findOneCompany/findOneCompanyThunk";
import findJobsByCompanyThunk from "@/lib/features/jobs/findJobsByCompany/findJobsByCompanyThunk";
import { AppDispatch } from "@/lib/store";

import { CompanyTypes } from "./Company.types";
import { CompaniesReducersTypes } from "@/lib/features/companies/types";
import { JobsReducersTypes } from "@/lib/features/jobs/types";

import { Vector } from "@/assets/svgs/Vector";

import styles from "./company.module.scss";
import VacancyCardUser from "../VacancyCardUser/VacancyCardUser";
import TabSwitcher from "../TabSwitcher/TabSwitcher";
import { buttonsTabSwitcher } from "./CompanyData";

const Company: React.FC<CompanyTypes> = ({ companyId }) => {
  const [firstLoading, setFirstLoading] = useState(true);
  const [valueActiveTab, setValueActiveTab] = useState("Active");

  const dispatch = useDispatch<AppDispatch>();
  const userAddress = useTonAddress();
  const router = useRouter();

  const foundCompany = useSelector(
    (state: CompaniesReducersTypes) =>
      state.companiesReducers.findOneCompany.foundCompany
  );
  const idVacanciesCompany = foundCompany?.vacancy;
  const isOwner =
    foundCompany?.walletAddress === userAddress && userAddress !== "";

  const { foundJobs } = useSelector(
    (state: JobsReducersTypes) => state.jobsReducers.findJobsByCompany
  );

  useEffect(() => {
    const getCompany = async () => {
      await dispatch(findOneCompanyThunk(companyId));
      setFirstLoading(false);
    };
    if (companyId) {
      getCompany();
    }
  }, [companyId, dispatch]);

  useEffect(() => {
    if (!idVacanciesCompany) return;

    const getVacancies = async () => {
      await dispatch(findJobsByCompanyThunk(companyId));
    };

    if (!firstLoading) {
      getVacancies();
    }
  }, [firstLoading, idVacanciesCompany, companyId, dispatch]);

  const handleClickVacancy = (id: string) => router.push(`/vacancy/${id}`);

  const handleTabChange = (tab) => {
    setValueActiveTab(tab);
  };

  const renderJobCard = (
    {
      id,
      name,
      experience,
      mode,
      city,
      description,
      salary,
      createdAt,
      published,
      idCompany,
    },
    userAddress,
    valueActiveTab,
    handleClickVacancy,
    foundCompany
  ) => {
    const commonProps = {
      id,
      name,
      experience,
      typeOfEmployment: mode,
      city,
      salary,
      valueActiveTab,
      idCompany,
    };

    if (userAddress === foundCompany.walletAddress) {
      if (
        (published && valueActiveTab === "Active") ||
        (!published && valueActiveTab === "Archived")
      ) {
        return <VacancyCardUser {...commonProps} key={id} />;
      }
    } else {
      return (
        <VacancyCard
          key={id}
          onClick={() => handleClickVacancy(id)}
          description={description}
          nameCompany={foundCompany.title}
          logo={foundCompany.logo}
          date={createdAt}
          {...commonProps}
        />
      );
    }

    return null;
  };

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
              <Link className={styles.blockLinkCurrent} href="">
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
                      onClick={() =>
                        router.push(`/company/${companyId}/createVacancy`)
                      }
                    >
                      Publish
                    </Button>
                  )}
                </div>

                <div className={styles.mainBlock}>
                  <div className={styles.blockTotalSort}>
                    {userAddress === foundCompany.walletAddress && (
                      <TabSwitcher
                        buttons={buttonsTabSwitcher}
                        valueActiveTab={valueActiveTab}
                        onTabChange={handleTabChange}
                      />
                    )}
                    <span className={styles.blockSort}>
                      By date of posting
                      <button className={styles.blockSortVector}>
                        <Vector />
                      </button>
                    </span>
                  </div>
                  <div className={styles.blockCards}>
                    {foundJobs ? (
                      foundJobs.map((job) =>
                        renderJobCard(
                          job,
                          userAddress,
                          valueActiveTab,
                          handleClickVacancy,
                          foundCompany
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
