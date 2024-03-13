import Snackbar from "@mui/material/Snackbar";
import Fade from "@mui/material/Fade";

type NotifyProps = { onClose: () => void; message: string };

const Notify = ({ onClose, message }: NotifyProps) => {
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    onClose();
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
