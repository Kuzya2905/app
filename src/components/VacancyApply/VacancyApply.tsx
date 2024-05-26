"use client";

import React from "react";
import Link from "next/link";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";

import CompanyCard from "@/components/CompanyCard/CompanyCard";
import { schema } from "./VacancySchemaYup";
import Input from "@/components/Input/Input";
import Button from "@/components/Button/Button";
import Checkbox from "@/components/Checkbox/Checkbox";
import { VacancyForm } from "./VacancyForm.types";
import { VacancyApplyTypes } from "./VacancyApply.types";

import styles from "./vacancyApply.module.scss";

const VacancyApply: React.FC<VacancyApplyTypes> = ({
  dataCompany,
  idCompany,
}) => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const router = useRouter();
  const handleClickCompany = (id: string) => router.push(`/company/${id}`);

  const onSubmit: SubmitHandler<VacancyForm> = (data) => console.log(data);

  const error: SubmitErrorHandler<VacancyForm> = (data) => console.log(data);

  const buttonDisabled = watch("agree") ? false : true;

  return (
    <div className={styles.asideBlock}>
      {dataCompany && idCompany ? (
        <CompanyCard
          onClick={() => handleClickCompany(idCompany)}
          logo={dataCompany.logo}
          title={dataCompany.title}
          description={dataCompany.description}
          city={dataCompany.city}
          vacancyNumber={dataCompany.vacancyNumber}
        />
      ) : (
        <div className={styles.sectionCard}>No company information</div>
      )}
      <section className={styles.sectionApply}>
        <h2 className={styles.sectionApplyTitle}>Apply</h2>
        <form
          onSubmit={handleSubmit(onSubmit, error)}
          className={styles.applyForm}
        >
          <div className={styles.blockInput}>
            <Input<VacancyForm>
              name="firstName"
              isIcon={false}
              className={styles.inputContainer}
              placeholder="First Name"
              register={register}
              error={errors.firstName}
            />
          </div>
          <div className={styles.blockInput}>
            <Input<VacancyForm>
              name="lastName"
              isIcon={false}
              className={styles.inputContainer}
              placeholder="Last Name"
              register={register}
              error={errors.lastName}
            />
          </div>
          <div className={styles.blockInput}>
            <Input<VacancyForm>
              name="eMail"
              isIcon={false}
              className={styles.inputContainer}
              placeholder="E-mail"
              register={register}
              error={errors.eMail}
            />
          </div>
          <div className={styles.blockInput}>
            <Input<VacancyForm>
              name="telegram"
              isIcon={false}
              className={styles.inputContainer}
              placeholder="Telegram"
              register={register}
              error={errors.telegram}
            />
          </div>
          <div className={styles.blockInput}>
            <Input<VacancyForm>
              name="linkResume"
              isIcon={false}
              className={styles.inputContainer}
              placeholder="Link to resume"
              register={register}
              error={errors.linkResume}
            />
          </div>
          <div className={styles.blockCheckbox}>
            <label className={styles.checkbox}>
              <Checkbox<VacancyForm> nameGroup="agree" register={register} />
              <span className={styles.checkboxText}>
                I agree to the
                <Link className={styles.checkboxTextAccented} href={""}>
                  processing of personal data.
                </Link>
              </span>
            </label>
          </div>
          <Button
            disabled={buttonDisabled}
            type="submit"
            appearance="secondary"
            size="l"
            className={styles.buttonStyle}
          >
            Apply now
          </Button>
        </form>
      </section>
    </div>
  );
};

export default VacancyApply;
