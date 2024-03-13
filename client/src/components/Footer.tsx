import React from "react";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import MailIcon from "@mui/icons-material/Mail";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer w-full fixed bottom-3 justify-center flex">
      <div className="px-2">
        <Link to={process.env.REACT_APP_LINKEDIN_URL} target="_blank">
          <LinkedInIcon />
        </Link>
      </div>
      <div className="px-2">
        <Link to={process.env.REACT_APP_GITHUB_URL} target="_blank">
          <GitHubIcon />
        </Link>
      </div>
      <div className="px-2">
        <Link to={`mailto:${process.env.REACT_APP_EMAIL}`}>
          <MailIcon />
        </Link>
      </div>
    </div>
  );
};

export default Footer;
