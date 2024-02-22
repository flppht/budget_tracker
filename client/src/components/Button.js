import React from "react";
const classnames = require("classnames");

const Button = (props) => {
  const classString = classnames(
    "rounded-full text-white px-2 py-1 align-middle w-1/2 self-center shadow-sm",
    props.className
  );

  const handleClick = () => {
    if (props.onClick) {
      props.onClick();
    }
  };

  return (
    <button type={props.type} className={classString} onClick={handleClick}>
      {props.children}
    </button>
  );
};

export default Button;
