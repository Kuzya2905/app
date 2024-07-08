import React, { useEffect } from "react";
import cn from "classnames";
import Image from "next/image";

import CircleCheck from "@/assets/svgs/CircleCheck.svg";
import CloseSmall from "@/assets/svgs/CloseSmall.svg";
import StopSign from "@/assets/svgs/StopSign.svg";

import { ToastNotificationTypes } from "./ToastNotification.types";

import styles from "./toastNotification.module.scss";

const ToastNotification: React.FC<ToastNotificationTypes> = ({
  message,
  onClose,
  status = "positive",
}) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={cn(styles.notification, {
        [styles.negativeNotification]: status === "negative",
      })}
    >
      {status === "negative" ? (
        <Image className={styles.statusSign} src={StopSign} alt={"Stop sign"} />
      ) : (
        <Image
          className={styles.statusSign}
          src={CircleCheck}
          alt={"Circle Check"}
        />
      )}

      <span className={styles.message}>{message}</span>
      <button className={styles.closeButton} onClick={onClose}>
        <Image
          className={styles.closeSmall}
          src={CloseSmall}
          alt={"Close Small"}
        />
      </button>
    </div>
  );
};

export default ToastNotification;
