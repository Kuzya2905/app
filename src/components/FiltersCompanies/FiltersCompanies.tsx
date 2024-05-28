"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import Checkbox from "@/components/Checkbox/Checkbox";
import { CompanySize, Industry } from "./FilterCompanyData";
import Input from "@/components/Input/Input";
import Button from "@/components/Button/Button";
import Radio from "@/components/Radio/Radio";
import { schema } from "./FilterCompaniesSchemaYup";
import { FilterCompaniesForm } from "./FilterCompaniesForm.types";

import styles from "./filtersCompanies.module.scss";

const FiltersCompanies = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FilterCompaniesForm>({
    resolver: yupResolver(schema),
    defaultValues: {
      industry: null,
      additionally: null,
    },
  });

  const onSubmit: SubmitHandler<FilterCompaniesForm> = (data) =>
    console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.sectionFilters}>
      <h2 className={styles.filtersTitle}>Filters</h2>
      <div className={styles.block}>
        <h2 className={styles.blockTitle}>Industry</h2>
        <div className={styles.blockList}>
          {Industry.map(({ nameSection, id, disabled, active }) => (
            <label key={id} className={styles.checkboxesListItem}>
              <Checkbox<FilterCompaniesForm>
                name={nameSection}
                disabled={disabled}
                nameGroup="industry"
                register={register}
                active={active}
              />
              <span>{nameSection}</span>
            </label>
          ))}
        </div>
      </div>
      <div className={styles.block}>
        <h2 className={styles.blockTitle}>Company size</h2>
        <div className={styles.blockList}>
          <Radio<FilterCompaniesForm>
            data={CompanySize}
            nameGroup="size"
            register={register}
          />
        </div>
      </div>
      <div className={styles.blockInput}>
        <h3 className={styles.blockInputTitle}>City</h3>
        <Input<FilterCompaniesForm>
          name="city"
          isIcon={false}
          className={styles.inputContainer}
          placeholder="Any"
          register={register}
          error={errors.city}
        />
      </div>
      <div className={styles.block}>
        <h2 className={styles.blockTitle}>Additionally</h2>
        <div className={styles.blockList}>
          <label className={styles.blockListItem}>
            <Checkbox<FilterCompaniesForm>
              name="Open positions"
              nameGroup="additionally"
              register={register}
            />
            <span>Open positions</span>
          </label>
        </div>
      </div>
      <Button
        type="reset"
        onClick={() => {
          reset();
        }}
        appearance="secondary"
        size="l"
        className={styles.buttonStyle}
      >
        Reset all
      </Button>
      <Button
        type="submit"
        appearance="secondary"
        size="l"
        className={styles.buttonStyle}
      >
        Submit
      </Button>
    </form>
  );
};

export default FiltersCompanies;
