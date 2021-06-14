import clsx from "clsx";
import { forwardRef } from "react";
import React from "react";
import css from "./CardBase.module.scss";

export const CardBase = forwardRef<HTMLButtonElement, JSX.IntrinsicElements["button"]>(({ children, disabled = false, ...props }, ref) => {
  const { className: className, ...rest } = props;

  return (
    <button disabled={disabled} ref={ref} className={clsx(className, css.button)} {...rest}>
      {children}
    </button>
  );
});
