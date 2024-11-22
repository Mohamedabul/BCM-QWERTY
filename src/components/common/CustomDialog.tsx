import React from "react";
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface CustomDialogProps {
  open: boolean;
  onClose: () => void;
  loading: boolean;
  applications: any[];
  mappedApplications: any[];
  orphans: any[];
}

const CustomDialog: React.FC<CustomDialogProps> = ({
  open,
  onClose,
  loading,
  applications,
  mappedApplications,
  orphans,
}) => {
  return (
    <Dialog
      PaperProps={{
        className: "dialog-paper",
      }}
      open={open}
      onClose={onClose}
    >
      <DialogTitle className="dialog-title">
        Upload Status
        <IconButton
          aria-label="close"
          onClick={onClose}
          className="close-button"
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent className="dialog-content">
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" p={2}>
            <CircularProgress />
            <Typography variant="body1" sx={{ ml: 2, color: "black" }}>
              Uploading in Progress...
            </Typography>
          </Box>
        ) : (
          <>
            <div className="dialog-row">
              <Typography className="dialog-typography">Total Number of Record present</Typography>
              <span className="dialog-value">{applications}</span>
            </div>
            <div className="dialog-row">
              <Typography className="dialog-typography">
              Total Number of Records Mapped
              </Typography>
              <span className="dialog-value">{mappedApplications}</span>
            </div>
            <div className="dialog-row">
              <Typography className="dialog-typography">
              Total Number of Records under Orphan
              </Typography>
              <span className="dialog-value">{orphans}</span>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CustomDialog;
