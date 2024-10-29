import { useEffect, useMemo, useState } from "react";
import { getRandomColor, handleChange } from "utils/helperFunctions";
import DomainCard from "pages/domain/card-domain";
import CustomMenu from "components/common/CustomMenu";
import {
  Accordion,
  Box,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Grid,
  } from "@mui/material";
import GridItem from "utils/GridItem";
import { ShimmerBox } from "utils/ShimmerBox";

const CapabilityCard = (props: any) => {
  const [domainList, setDomainList] = useState<any>([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [name, setName] = useState(props.name);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const bgColor = useMemo(() => getRandomColor(), []);

  const handleExpand = async () => {
    const resp = await fetch(process.env.REACT_APP_API_URL+"domain");
    const data = await resp.json();
    setDomainList(data);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleEditClick = () => {
    setIsEditModalOpen(true);
    handleMenuClose();
  };
  
  const handleDeleteClick = async () => {
    setIsDeleteDialogOpen(true);
    await deleteCapability();
    handleMenuClose();
  };

  const updateCapabilityName = async (newName: string) => {
    try{
      setName(newName);
      const resp = await fetch(process.env.REACT_APP_API_URL+`coreCapability/${props.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: newName }),
      });
      
      if(resp.ok){
        console.log("Capability name updated successfully");
        
      }else{
        console.log("Failed to update capability name");
      }
    }catch(error){
      console.log("Error updating capability name:", error);
    }
  };

  const deleteCapability = async () => {
    try{
      const resp = await fetch(process.env.REACT_APP_API_URL+`coreCapability/${props.id}`, {
        method: "DELETE",
      });
      if(resp.ok){
        console.log("Capability deleted successfully");
      }else{
        console.log("Failed to delete capability");
      }
    }catch(error){
      console.log("Error deleting capability:", error);
    }
  };
    
  return (
    <Grid item xs={3}>
      <GridItem sx={{ backgroundColor: bgColor,position:'relative' }}>
        <CustomMenu
          anchorEl={anchorEl}
          onOpen={handleMenuOpen}
          onClose={handleMenuClose}
          onEdit={handleEditClick}
          onDelete={handleDeleteClick}
          capabilityName={props.name}
          onSave={(newName) => {
            updateCapabilityName(newName);
            setIsEditModalOpen(false); 
            
          }}
        />
        <Accordion
          sx={{
            height: "100",
            backgroundColor: bgColor,
            boxShadow: "none",
            color: 'white'
          }}
          onChange={handleChange(handleExpand)}
        >
          <AccordionSummary
            expandIcon={null}
            aria-controls="panel1a-content"
            id="panel1a-header"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "60px", //changed from 100% to 60px for unique height 
            }}
          >
            <Typography
              sx={{ textAlign: "center", width: "100%", fontWeight: "bold" }}
            >
              {name}
            </Typography>
          </AccordionSummary>
          <AccordionDetails
            sx={{
              padding: 0,
              margin: 0,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Box
              sx={{
                maxWidth: "200px",
                width: "100%",
                textAlign: "center",
                padding: "10px 0",
                height: "100%",
              }}
            >
              {domainList.length === 0 ? (
                <>
                  <ShimmerBox sx={{ height: "100px" }} />
                  <ShimmerBox sx={{ height: "100px" }} />
                  <ShimmerBox sx={{ height: "100px" }} />
                </>
              ) : (
                domainList.map((domain: any, index: any) => (
                  <>
                    <DomainCard key={domain.id} name={domain.name} />
                    {index < domainList.length - 1 && (
                      <hr
                        style={{
                          border: "0",
                          height: "1px",
                          background: "black",
                        }}
                      />
                    )}
                  </>
                ))
              )}
            </Box>
          </AccordionDetails>
        </Accordion>
      </GridItem>
    </Grid>
  );
};

export default CapabilityCard;

