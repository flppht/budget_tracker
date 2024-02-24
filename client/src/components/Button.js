import React from "react";
const classnames = require("classnames");

const Button = ({ className, type, children, ...rest }) => {
  const classString = classnames(
    "rounded-full text-white px-2 py-1 align-middle w-1/2 self-center shadow-sm",
    className
  );

  return (
    <button type={type} className={classString} {...rest}>
      {children}
    </button>
  );
};

export default Button;
