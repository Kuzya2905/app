"use client";

import React, { useEffect, useState } from "react";
import ReactSelect from "react-select";

import DropdownIndicator from "./DropdownIndicator";
import IconOption from "./IconOption";
import { SelectTypes, VARIANT } from "./Select.types";

import { stylesSelect } from "./StylesSelect";

import styles from "./styles.module.scss";

const Select: React.FC<SelectTypes> = ({
  onChange,
  objValue,
  data,
  valueDefault,
  placeholder,
  variant = VARIANT.SMALL,
  enteredValueColor = "#666666",
  error,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const getValue = (obj: { value: string }) =>
    obj ? data?.find((option) => option.value === obj.value) : "";

  const preparedStyles = stylesSelect(variant, enteredValueColor, error);
  return (
    <div className={styles.selectWrapper}>
      <ReactSelect
        defaultValue={{ value: valueDefault, label: valueDefault }}
        placeholder={placeholder}
        styles={preparedStyles}
        options={data}
        components={{ Option: IconOption, DropdownIndicator }}
        value={getValue(objValue as { value: string })}
        onChange={(newValue) => onChange((newValue as { value: string }).value)}
      />
      {error && (
        <span role="alert" className={styles.errorMessage}>
          {error.message}
        </span>
      )}
    </div>
  );
};

export default Select;
