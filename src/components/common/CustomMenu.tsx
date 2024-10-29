// Menu.tsx
import React, { useState, useEffect } from 'react';
import { Menu, MenuItem, IconButton, Modal, Box, Typography, TextField,Dialog,
         DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CloseIcon from '@mui/icons-material/Close';
import { CustomButton } from 'components';
import { MenuProps } from 'interfaces/common';

const modalStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};
type EditCapabilityProps = {
  open?: boolean;
  onClose?: () => void;
  capabilityName: string;
  onSave?: (name: string) => void;
};

const CustomMenu: React.FC<MenuProps & EditCapabilityProps> = ({ anchorEl, onClose, onDelete, onOpen,onEdit,onSave,capabilityName }) => {
  const [isEditOpen, setEditOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [name, setName] = useState<string>(capabilityName??'');

  const handleEditOpen = () => {
    setEditOpen(true);
    onClose(); 
  };

  const handleEditClose = () => {
    setEditOpen(false);
  };

  const handleSave = () => {
    onSave?.(name);
    console.log('Saved capability name:', name);
    handleEditClose();
  };
  const handleDeleteOpen = () => {
    setIsDeleteDialogOpen(true);
    onClose();
  };
  const handleDeleteClose = () => {
    setIsDeleteDialogOpen(false);
  };
  const confirmDelete = () => {
    if (onDelete) onDelete();
    console.log("Confirmed deletion of capability:", name);
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
          position: 'absolute',
          top: '8px',
          right: '8px',
          zIndex: 2,
          padding: '4px',
        }}
      >
        <MoreVertIcon sx={{ fontSize: 18 }} />
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
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6">Edit Business Capability Information</Typography>
            <IconButton onClick={handleEditClose} sx={{ color: 'black' }}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Typography variant="body2" sx={{ mt: 2 }}>
            Edit Business Capability name<span style={{ color: 'red' }}> *</span>
          </Typography>
          <Typography variant="body1" color="textSecondary" sx={{ mb: 2, fontSize: '12px' }}>
            Include min. 40 characters to make it more interesting
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
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
            Are you sure you want to delete the capability "{capabilityName}"? This action cannot be undone.
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











// import React from 'react';
// import { Menu, MenuItem, IconButton } from '@mui/material';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
// import { MenuProps } from 'interfaces/common';



// const CustomMenu: React.FC<MenuProps> = ({ anchorEl, onClose, onEdit, onDelete, onOpen }) => {
//   return (
//     <>
//       <IconButton
//         onClick={onOpen}
//         sx={{
//           position: 'absolute',
//           top: '8px',
//           right: '8px',
//           zIndex: 2,
//           padding: '4px',
//         }}
//       >
//         <MoreVertIcon sx={{ fontSize: 18 }} />
//       </IconButton>

//       <Menu
//         sx={{ opacity: 0.8 }}
//         anchorEl={anchorEl}
//         open={Boolean(anchorEl)}
//         onClose={onClose}
//       >
//         <MenuItem onClick={onEdit}>Edit</MenuItem>
//         <MenuItem onClick={onDelete}>Delete</MenuItem>
//       </Menu>
//     </>
//   );
// };

// export default CustomMenu;



