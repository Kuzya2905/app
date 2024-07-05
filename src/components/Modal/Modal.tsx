import React, { useEffect } from "react";

import Button from "@/components/Button/Button";

import { ModalTypes } from "./Modal.types";

import styles from "./modal.module.scss";

const Modal: React.FC<ModalTypes> = ({ title, children, onClose }) => {
  useEffect(() => {
    const htmlStyle = document.documentElement.style;
    htmlStyle.overflow = "hidden";
    return () => {
      htmlStyle.overflow = "";
    };
  }, []);

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>{title}</h2>
          <Button
            onClick={onClose}
            appearance="close"
            size="m"
            className={styles.modalCloseButton}
          />
        </div>
        <div className={styles.modalBody}>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
