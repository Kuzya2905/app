"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useTonWallet } from "@tonconnect/ui-react";
import Button from "../Button/Button";

import { CompanyInfoTypes } from "./CompanyInfo.types";

import styles from "./CompanyInfo.module.scss";

const CompanyInfo: React.FC<CompanyInfoTypes> = ({ dataCompany }) => {
  const wallet = useTonWallet();
  const router = useRouter();

  return (
  <div className={styles.main}>
    <section className={styles.mainSection}>
      <div className={styles.sectionBlock}>
        <div className={styles.containerImg}>
          <Image
            src={dataCompany.logo}
            alt="Company image"
            width={320}
            height={320}
          />
        </div>
        <div className={styles.sectionBlockInfo}>
          <div className={styles.infoTitle}>
            <h1 className={styles.infoTitleH1}>{dataCompany.title}</h1>
            <Link className={styles.infoTitleLink} href={dataCompany.link}>
              {dataCompany.nameLink}
            </Link>
          </div>
          <div className={styles.infoData}>
            <div className={styles.infoSection}>
              <span className={styles.infoSectionTitle}>City</span>
              <span className={styles.infoSectionText}>{dataCompany.city}</span>
            </div>
            <div className={styles.infoSection}>
              <span className={styles.infoSectionTitle}>Industry</span>
              <span className={styles.infoSectionText}>
                {dataCompany.industry}
              </span>
            </div>
            <div className={styles.infoSection}>
              <span className={styles.infoSectionTitle}>Company size</span>
              <span className={styles.infoSectionText}>
                {dataCompany.sizeCompany}
              </span>
            </div>
          </div>
        </div>
        <div className={styles.infoIcons}>
          {dataCompany.linksContact.map(({ icon, id }) => (
            <Link key={id} className={styles.iconsListLink} href={""}>
              {icon}
            </Link>
          ))}
        </div>
        { wallet ? (
          <Button
            appearance="secondary"
            size="l"
            onClick={() => router.push('/company-edit')}
          >
            Edit
          </Button>
        ) : (
          <></>
        )

        }
      </div>
    </section>
    <section className={styles.sectionBot}>
      <h2 className={styles.sectionBotTitle}>About company</h2>
      <div className={styles.sectionBotText}>{dataCompany.description}</div>
    </section>
  </div>
)};

export default CompanyInfo;
