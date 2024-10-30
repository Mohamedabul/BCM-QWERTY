import React from 'react'

function EditCapability() {
  return (
    <div>create-Capability</div>
  )
}

export default EditCapability








// import React, { useState, useEffect } from "react";
// import Box from "@mui/material/Box";
// import Modal from "@mui/material/Modal";
// import Typography from "@mui/material/Typography";
// import TextField from "@mui/material/TextField";
// import { CustomButton } from "components";
// import IconButton from "@mui/material/IconButton";
// import CloseIcon from "@mui/icons-material/Close";
// import { IResourceComponentsProps } from "@refinedev/core";
// import { colors } from "@mui/material";

// const modalStyle = {
//   position: "absolute" as "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 500,
//   colors: 'black',
//   bgcolor: "background.paper",
//   boxShadow: 24,
//   p: 4,
//   borderRadius: 2,
// };

// type EditCapabilityProps = {
//   open?: boolean;
//   onClose?: () => void;
//   capabilityName?: string;
//   onSave?: (name: string) => void;
// };

// type CombinedProps = IResourceComponentsProps<any, any> & EditCapabilityProps;

// function EditCapability({
//   open = true, 
//   onClose = () => {},
//   capabilityName = "Default Capability",
//   onSave = (name) => console.log("Saved capability name:", name),
// }: CombinedProps) {
//   const [name, setName] = useState<string>(capabilityName);

//   useEffect(() => {
//     setName(capabilityName);
//   }, [capabilityName]);

//   const handleSave = () => {
//     onSave(name);
//     onClose();
//   };

//   return (
//    <Modal open={open} onClose={onClose}>
//       <Box sx={modalStyle}>
//         <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", }}>
//           <Typography variant="h6">Edit Business Capability Information</Typography>
//           <IconButton onClick={onClose}
//             sx={{ color: "black" }}>
//             <CloseIcon />
//           </IconButton>
//         </Box>
//         <Typography variant="body2" sx={{ mt: 2}}>
//           Edit Business Capability name<span style={{ color: "red" }}> *</span>
//         </Typography>
//         <Typography variant="body1" color="textSecondary" sx={{ mb: 2, fontSize: "12px" }}>
//           Include min. 40 characters to make it more interesting
//         </Typography>
//         <TextField
//           fullWidth
//           variant="outlined"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//         />
//         <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
//         <CustomButton 
//             title="Cancel"
//             backgroundColor="transparent"
//             color="rgba(0, 0, 0, 0.87)"
//             handleClick={onClose}
//           />
//           <CustomButton 
//             title="Save"
//             backgroundColor="#1976d2"
//             color="white"
//             handleClick={handleSave}
//           />
//         </Box>
//       </Box>
//     </Modal>
//   )
// };

// export default EditCapability