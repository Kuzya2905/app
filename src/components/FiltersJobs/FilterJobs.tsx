"use client";

import React from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import Checkbox from "@/components/Checkbox/Checkbox";
import {
  Design,
  Development,
  Experience,
  Other,
  Qualification,
  Technical,
  Company,
  EmploymentType,
} from "./FilterJobsData";
import Input from "@/components/Input/Input";
import Button from "@/components/Button/Button";
import BlockCheckboxesTag from "@/components/BlockCheckboxesTag/BlockCheckboxesTag";
import Radio from "@/components/Radio/Radio";
import Select from "@/components/Select/Select";
import { schema } from "./FilterJobsSchemaYup";
import { FilterJobsForm } from "./FilterJobsForm.types";

import styles from "./filterJobs.module.scss";

const FiltersJobs = () => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<FilterJobsForm>({
    resolver: yupResolver(schema),
    defaultValues: {
      design: null,
      development: null,
      technical: null,
      other: null,
      qualification: null,
      type: null,
      company: null,
    },
  });

  const onSubmit: SubmitHandler<FilterJobsForm> = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.sectionFilters}>
      <h2 className={styles.filtersTitle}>Filters</h2>
      <div className={styles.block}>
        <h2 className={styles.blockTitle}>Specialization</h2>
        <div className={styles.listCheckboxesTag}>
          <BlockCheckboxesTag<FilterJobsForm>
            data={Development}
            register={register}
            nameGroup="development"
          />
          <BlockCheckboxesTag<FilterJobsForm>
            data={Technical}
            nameGroup="technical"
            register={register}
          />
          <BlockCheckboxesTag<FilterJobsForm>
            data={Design}
            nameGroup="design"
            register={register}
          />
          <BlockCheckboxesTag<FilterJobsForm>
            data={Other}
            nameGroup="other"
            register={register}
          />
        </div>
      </div>
      <div className={styles.block}>
        <h2 className={styles.blockTitle}>Qualification</h2>
        <div className={styles.blockList}>
          {Qualification.map(({ nameSection, id, disabled }) => (
            <label key={id} className={styles.blockListItem}>
              <Checkbox
                name={nameSection}
                nameGroup="qualification"
                disabled={disabled}
                register={register}
              />
              <span>{nameSection}</span>
            </label>
          ))}
        </div>
      </div>
      <div className={styles.block}>
        <h2 className={styles.blockTitle}>Experience</h2>
        <div className={styles.blockList}>
          <Radio<FilterJobsForm>
            data={Experience}
            nameGroup="experience"
            register={register}
          />
        </div>
      </div>
      <div className={styles.blockInput}>
        <h3 className={styles.blockInputTitle}>Employment type</h3>
        <div className={styles.blockInputWrapper}>
          <Controller
            name="type"
            control={control}
            render={({ field: { onChange, value } }) => {
              return (
                <div>
                  <Select
                    onChange={onChange}
                    objValue={value}
                    data={EmploymentType}
                    placeholder="Any"
                  />
                </div>
              );
            }}
          />
        </div>
        <label className={styles.checkbox}>
          <Checkbox<FilterJobsForm> nameGroup="remote" register={register} />
          <span>Remote</span>
        </label>
      </div>
      <div className={styles.blockInput}>
        <h3 className={styles.blockInputTitle}>Company</h3>
        <div className={styles.blockInputWrapper}>
          <Controller
            name="company"
            control={control}
            render={({ field: { onChange, value } }) => (
              <div>
                <Select
                  onChange={onChange}
                  objValue={value}
                  data={Company}
                  placeholder="Choose a company"
                />
              </div>
            )}
          />
        </div>
      </div>
      <div className={styles.blockInput}>
        <h3 className={styles.blockInputTitle}>City</h3>
        {register && (
          <Input
            name="city"
            isIcon={false}
            className={styles.inputContainer}
            placeholder="Dubai"
            register={register}
            error={errors.city}
          />
        )}
      </div>
      <div className={styles.blockButtons}>
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
      </div>
    </form>
  );
};

export default FiltersJobs;
