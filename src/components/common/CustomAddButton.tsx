// import React, { useState } from 'react';
// import { Modal, Box, Typography, TextField, IconButton } from '@mui/material';
// import AddCircleIcon from '@mui/icons-material/AddCircle';
// import CloseIcon from '@mui/icons-material/Close';
// // import { CustomAddButtonProps } from 'interfaces/common';
// import { CustomButton } from 'components';

// const modalStyle = {
//   position: 'absolute' as 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   width: 500,
//   bgcolor: 'background.paper',
//   boxShadow: 24,
//   p: 4,
//   borderRadius: 2,
// };

// const CustomAddButton = ({ onAdd,  color = "primary", type ="" }:CustomAddButtonProps) => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [name, setName] = useState('');

//   const handleOpen = () => {
//     setIsModalOpen(true);
//   };

//   const handleClose = () => {
//     setIsModalOpen(false);
//     setName(''); 
//   };

//   const handleAdd = async () => {
//     if (onAdd) {
//       await onAdd(name);
//     }
//     handleClose(); 
//   };

//   return (
//     <>
//       <IconButton onClick={handleOpen} sx={{ color }} >
//         <AddCircleIcon fontSize="small" />
//       </IconButton>

      
//       <Modal open={isModalOpen} onClose={handleClose}>
//         <Box sx={modalStyle}>
//           <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//             <Typography variant="h6">Add New {type}</Typography>
//             <IconButton onClick={handleClose} sx={{ color: 'black' }}>
//               <CloseIcon />
//             </IconButton>
//           </Box>
//           <Typography variant="body2" sx={{ mt: 2 }}>
//             Add new {type} name<span style={{ color: 'red' }}> *</span>
//           </Typography>
//           <Typography variant="body1" color="textSecondary" sx={{ mb: 2, fontSize: '12px' }}>
//             Include min. 40 characters to make it more interesting
//           </Typography>
//           <TextField
//             fullWidth
//             variant="outlined"
//             placeholder={`Add new ${type}`}
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             sx={{ mt: 1 }}
//           />
//           <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
//             <CustomButton
//               title="Cancel"
//               backgroundColor="transparent"
//               color="rgba(0, 0, 0, 0.87)"
//               handleClick={handleClose}
//             />
//             <CustomButton
//               title="Add"
//               backgroundColor="#1976d2"
//               color="white"
//               handleClick={handleAdd}
              
//             />
//           </Box>
//         </Box>
//       </Modal>
//     </>
//   );
// };

// export default CustomAddButton;
