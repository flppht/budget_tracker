import React from "react";
import { Link } from "react-router-dom";

type NavLinkProps = {
  path: string,
  icon: React.JSX.Element,
  text: string,
}

function NavLink({ path, icon, text }: NavLinkProps) {
  return (
    <Link to={path} className="w-16">
      <div className="flex flex-col items-center dark:text-white/80">
        {icon} <p className="text-sm">{text}</p>
      </div>
    </Link>
  );
}

export default NavLink;
