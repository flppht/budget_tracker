import React, { ReactElement } from "react";
const classnames = require("classnames");

type ButtonProps = {
  className: string;
  type: "submit" | "reset" | "button";
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
};

const Button = ({ className, type, children, ...rest }: ButtonProps) => {
  const classString = classnames(
    "rounded-full text-white px-2 py-1 mb-1 align-middle w-1/2 self-center shadow-sm",
    className
  );

  return (
    <button type={type} className={classString} {...rest}>
      {children}
    </button>
  );
};

export default Button;
