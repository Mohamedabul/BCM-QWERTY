// Menu.tsx
import React, { useState, useEffect } from "react";
import {
  Menu,
  MenuItem,
  IconButton,
  Modal,
  Box,
  Typography,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CloseIcon from "@mui/icons-material/Close";
import { CustomButton } from "components";
import { MenuProps } from "interfaces/common";
import { patchEndpoint, deleteEndpoint } from "apis";

const modalStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};
type EditCapabilityProps = {
  open?: boolean;
  onClose?: () => void;
  capabilityName: string;
  label: string;
  onSave?: (name: string) => void;
  color?: string;
  editEndpoint?: string;
  deleteEndpointCall?: string;
  menuStyle?: object;
};

const CustomMenu: React.FC<MenuProps & EditCapabilityProps> = ({
  anchorEl,
  onClose,
  onDelete,
  onOpen,
  onEdit,
  onSave,
  capabilityName,
  label,
  color,
  editEndpoint,
  deleteEndpointCall,
  menuStyle,
  useCustomEditDialog = false,
  useCustomDeleteDialog = false,
}) => {
  const [isEditOpen, setEditOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [name, setName] = useState<string>(capabilityName ?? "");

  const handleEditOpen = () => {
    if (useCustomEditDialog) {
      // If custom dialog is requested, call onEdit directly and skip the internal modal
      onEdit();
      onClose();
    } else {
      // Otherwise, use the internal edit modal
      setEditOpen(true);
      onClose();
    }
  };

  const handleEditClose = () => {
    setEditOpen(false);
  };

  const handleSave = async () => {
    if (!editEndpoint) {
      console.error("Edit endpoint is missing");
      return;
    }
    try {
      const response = await patchEndpoint(editEndpoint ?? "",JSON.stringify({ name }))
      if (!response.ok) {
        throw new Error(`Failed to edit ${label}: ${response.statusText}`);
      }

      onSave?.(name);
      console.log(`Saved ${label} name:`, name);
      handleEditClose();
    } catch (error) {
      console.error(`Error saving ${label}:`, error);
    }
  };

  const confirmDelete = async () => {
    if (!deleteEndpointCall) {
      console.error("Delete endpoint is missing");
      return;
    }
    try {
      const response = await deleteEndpoint(deleteEndpointCall ?? "")

      if (!response.ok) {
        throw new Error(`Failed to delete ${label}: ${response.statusText}`);
      }

      if (onDelete) onDelete();
      console.log(`Confirmed deletion of ${label}:`, name);
      setIsDeleteDialogOpen(false);
    } catch (error) {
      console.error(`Error deleting ${label}:`, error);
    }
  };
  const handleDeleteOpen = () => {
    if (useCustomDeleteDialog) {
      // If custom delete dialog is requested, call onDelete directly and skip the internal delete dialog
      onDelete();
      onClose();
    } else {
      // Otherwise, open the internal delete dialog
      setIsDeleteDialogOpen(true);
      onClose();
    }
  };
  const handleDeleteClose = () => {
    setIsDeleteDialogOpen(false);
  };

  useEffect(() => {
    setName(capabilityName);
  }, [capabilityName]);

  return (
    <>
      <IconButton
        onClick={onOpen}
        sx={{
          position: "absolute",
          top: 0,
          right: 0,
          zIndex: 2,
          ...menuStyle,
        }}
      >
        <MoreVertIcon sx={{ fontSize: 20, color: color }} />
      </IconButton>

      <Menu
        sx={{ opacity: 0.8 }}
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={onClose}
      >
        <MenuItem onClick={handleEditOpen}>Edit</MenuItem>
        <MenuItem onClick={handleDeleteOpen}>Delete</MenuItem>
      </Menu>

      {/* Modal for editing capability */}
      <Modal open={isEditOpen} onClose={handleEditClose}>
        <Box sx={modalStyle}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h6">Edit {label} Information</Typography>
            <IconButton onClick={handleEditClose} sx={{ color: "black" }}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Typography variant="body2" sx={{ mt: 2 }}>
            Edit {label} name<span style={{ color: "red" }}> *</span>
          </Typography>
          <Typography
            variant="body1"
            color="textSecondary"
            sx={{ mb: 2, fontSize: "12px" }}
          >
            Include min. 40 characters to make it more interesting
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            color="secondary"
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{
              "&:focus": {
                backgroundColor:"blue",
              },
            }}
          />
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
            <CustomButton
              title="Cancel"
              backgroundColor="transparent"
              color="rgba(0, 0, 0, 0.87)"
              handleClick={handleEditClose}
            />
            <CustomButton
              title="Save"
              backgroundColor="#1976d2"
              color="white"
              handleClick={handleSave}
            />
          </Box>
        </Box>
      </Modal>
      <Dialog
        open={isDeleteDialogOpen}
        onClose={handleDeleteClose}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
      >
        <DialogTitle id="delete-dialog-title">Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-dialog-description">
            Are you sure you want to delete the {label} "{capabilityName}"? 
            <DialogContentText id="delete-dialog-description" sx={{color: "warning.main"}}>
            All items associated with this will be permanently deleted.
            </DialogContentText>
            <DialogContentText id="delete-dialog-description" sx={{color: "red"}}>
            This action cannot be undone.
            </DialogContentText>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <CustomButton
            title="Cancel"
            handleClick={handleDeleteClose}
            backgroundColor="#1976d2"
            color="#fff"
          />
          <CustomButton
            title="Delete"
            handleClick={confirmDelete}
            color="white"
            backgroundColor="red"
          />
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CustomMenu;
