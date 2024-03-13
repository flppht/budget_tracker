import React from "react";
import HealingIcon from "@mui/icons-material/Healing";

const PageNotFound = () => {
  return (
    <div className="flex flex-col items-center mt-16 text-center">
      <div className="text-9xl font-semibold text-slate-700">404</div>
      <div className="text-4xl text-slate-500 justify-center mt-2">
        This page couldn't be found. <HealingIcon sx={{ fontSize: 40 }} />
      </div>
    </div>
  );
};

export default PageNotFound;
