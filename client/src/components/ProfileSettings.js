import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../utility/AuthContext";

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
      label: "Profile settings",
      fn: () => {
        // window.location.href = "/profile";
      },
    },
    {
      value: "logout",
      label: "Log out",
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
        className="rounded-sm hover:bg-slate-200 p-1 text-left last:border-t border-t-slate-300/60"
        onClick={option.fn}
      >
        {option.label}
      </div>
    );
  });

  return (
    <div className="relative">
      <div className="absolute top-full text-sm text-gray-700 border rounded p-2 bg-gray-100 shadow">
        {renderedOptions}
      </div>
    </div>
  );
};

export default ProfileSettings;
