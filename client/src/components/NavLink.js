import React from "react";
import { Link } from "react-router-dom";

function NavLink({ path, icon, text }) {
  return (
    <Link to={path} className="w-16">
      <div className="flex flex-col items-center dark:text-white/80">
        {icon} <p className="text-sm">{text}</p>
      </div>
    </Link>
  );
}

export default NavLink;
