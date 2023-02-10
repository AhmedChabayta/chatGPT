/* eslint-disable react/button-has-type */
/* eslint-disable react/require-default-props */
import React from "react";

interface IProps extends React.HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}
const Button = (props: IProps) => {
  const { children, type, className, ...rest } = props;
  const buttonType = type || "button";
  return (
    <button
      className={`${className} cursor-pointer border-none`}
      type={buttonType}
      {...rest}
    >
      {children}
    </button>
  );
};
export default Button;
