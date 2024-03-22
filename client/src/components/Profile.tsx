import { useEffect } from "react";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout, removeAccessToken, removeTheme } from "../store";

type ProfileProps = {
  btnEl: React.RefObject<HTMLButtonElement>;
  setIsOpen: (value: boolean) => void;
};

const Profile = ({ btnEl, setIsOpen }: ProfileProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const handler = (event) => {
      if (!btnEl?.current?.contains(event.target)) {
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
        navigate("/settings");
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
    dispatch(logout());
    dispatch(removeTheme());
    dispatch(removeAccessToken());
    navigate("/");
  };

  const renderedOptions = options.map((option) => {
    return (
      <div
        key={option.value}
        className="flex items-center text-sm rounded-sm hover:bg-slate-200 dark:hover:bg-slate-300 p-1 text-left last:border-t border-t-slate-300/60"
        onClick={option.fn}
      >
        <div className="mr-1">{option.icon}</div>
        <div className="text-nowrap">{option.label}</div>
      </div>
    );
  });

  return (
    <div className="relative">
      <div className="absolute top-full text-sm text-gray-700 border rounded p-2 bg-slate-100 dark:bg-gray-200 shadow">
        {renderedOptions}
      </div>
    </div>
  );
};

export default Profile;
