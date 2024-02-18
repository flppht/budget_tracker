import React from "react";
const classnames = require("classnames");

const Button = (props) => {
  const classString = classnames(
    "rounded-full text-white px-2 py-1 align-middle w-1/2 self-center shadow-sm",
    props.className
  );

  return (
    <button type={props.type} className={classString}>
      {props.children}
    </button>
  );
};

export default Button;
