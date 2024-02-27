import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import Fade from "@mui/material/Fade";

const Notify = ({ onClose, message }) => {
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    onClose(false);
  };

  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open
        autoHideDuration={4000}
        onClose={handleClose}
        message={message}
        TransitionComponent={Fade}
      />
    </div>
  );
};

export default Notify;
