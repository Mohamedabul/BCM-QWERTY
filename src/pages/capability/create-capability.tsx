import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import CustomButton from "components/common/CustomButton";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { IResourceComponentsProps, useCreate } from "@refinedev/core";

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

type CreateCapabilityProps = {
  open: boolean;
  onClose: () => void;
  capabilityName?: string;
  label: string,
  clickHandler: any;
};

type CombinedProps = IResourceComponentsProps<any, any> & CreateCapabilityProps;

const CreateCapability: React.FC<CombinedProps> = ({
  open = true,
  onClose = () => {},
  capabilityName = "",
  label,
  clickHandler
}) => {
  const [name, setName] = useState<string>(capabilityName);

  const { mutate } = useCreate();

  useEffect(() => {
    setName(capabilityName);
  }, [capabilityName]);
  const handleSave = async () => {
    try {
      await clickHandler({name},() => {
        setName("");
        onClose();
      });
    } catch (error) {
      console.error("Error creating capability:", error);
      alert("Failed to create capability. Please try again.");
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Typography variant="h6" component="h2">
            Add new {label} Information
          </Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Typography variant="body2" color="textSecondary" mb={2}>
          Add new {label} Information
        </Typography>
        <Typography variant="body2" color="textSecondary" mb={3}>
          Include min. 40 characters to make it more interesting
        </Typography>
        <TextField
          fullWidth
          variant="outlined"
          label={`Add new ${label} name`}
          color="secondary"
          value={name}
          onChange={(e) => setName(e.target.value)}
          margin="normal"
        />
        <Box display="flex" justifyContent="space-between" mt={3}>
          <CustomButton
            title="Cancel"
            backgroundColor="transparent"
            color="rgba(0, 0, 0, 0.87)"
            handleClick={onClose}
          />

          <CustomButton
            handleClick={handleSave}
            backgroundColor="#2979ff"
            color="white"
            title="Save"
          />
        </Box>
      </Box>
    </Modal>
  );
};

export default CreateCapability;
