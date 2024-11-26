import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import GridItem from "utils/GridItem";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import { CustomButton } from "components";
import CapabilityCard from "./card-capability";
import CreateCapability from "./create-capability";
import { useEffect, useState } from "react";
import { createCorecapability, fetchTemplateCorecapability, fetchCorecapability } from "apis";

function AllCapabilities({ isEditable }: any) {
  const [cabablityList, setCapabilityList] = useState<any[]>([]);
  const [open, setOpen] = useState(false);

  const handleCreateOpen = () => {
    setOpen(true);
  };

  const handleCreateClose = () => {
    setOpen(false);
  };

  const handleSaveCapability = (name: string) => {
    // Save the new capability to the capability list or database
    console.log("New capability name:", name);
    fetchCabability(); // Re-fetch to update list if needed
    handleCreateClose(); // Close the modal after saving
  };
  const handleClick = async (obj:object, callback:any) => {
    const response = await createCorecapability(JSON.stringify(obj));

    console.log("Capability created successfully");
    callback();
    fetchCabability();
    handleCreateClose();
  };

  const fetchCabability = async () => {
    try {
      let data;
      if (isEditable){
        data = await fetchCorecapability();
      }else{
        data = await fetchTemplateCorecapability();
      }
      
      setCapabilityList(data);
    } catch (error) {
      console.error("Error fetching capabilities:", error);
    }
   
  };
  useEffect(() => {
    fetchCabability();
  }, []);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box
        display="flex"
        justifyContent="flex-end"
        alignContent={"center"}
        alignItems="center"
        justifyItems={"left"}
        marginBottom={2}
        gap={2}
      >
        {isEditable && (
          <CustomButton
            icon={<AddIcon />}
            type="button"
            title="New Capability"
            color="white"
            backgroundColor="#2979ff"
            handleClick={handleCreateOpen}
          />
        )}
      </Box>
      <Grid container spacing={2}>
        {cabablityList.map((cabablity) => (
          <CapabilityCard
            isEditable={isEditable}
            key={cabablity.id}
            name={cabablity.name}
            id={cabablity.id}
            fetchCabability={fetchCabability}
            isEdited={cabablity.is_edited}
            
          />
        ))}
      </Grid>
      <CreateCapability
        open={open}
        onClose={handleCreateClose}
        label="Business Capability"
        clickHandler={handleClick}
      />
    </Box>
  );
}

export default AllCapabilities;
