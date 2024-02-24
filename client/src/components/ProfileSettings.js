import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../utility/AuthContext";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";

const ProfileSettings = ({ btnEl, setIsOpen }) => {
  const { setLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    const handler = (event) => {
      if (!btnEl.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handler, true);

    return () => {
      document.removeEventListener("click", handler);
    };
  }, []);

  const options = [
    {
      value: "settings",
      label: "Settings",
      icon: <SettingsIcon sx={{ fontSize: 20 }} />,
      fn: () => {
        // window.location.href = "/profile";
      },
    },
    {
      value: "logout",
      label: "Log out",
      icon: <LogoutIcon sx={{ fontSize: 20 }} />,
      fn: () => logOut(),
    },
  ];

  const logOut = () => {
    localStorage.removeItem("accessToken");
    setLoggedIn({
      username: "",
      id: 0,
      status: false,
    });
    window.location.href = "/";
  };

  const renderedOptions = options.map((option) => {
    return (
      <div
        key={option.value}
        className="flex items-center text-xs rounded-sm hover:bg-slate-200 p-1 text-left last:border-t border-t-slate-300/60"
        onClick={option.fn}
      >
        <div className="mr-1">{option.icon}</div>
        <div className="text-nowrap">{option.label}</div>
      </div>
    );
  });

  return (
    <div className="relative">
      <div className="absolute top-full text-sm text-gray-700 border rounded p-2 bg-slate-100 shadow">
        {renderedOptions}
      </div>
    </div>
  );
};

export default ProfileSettings;
