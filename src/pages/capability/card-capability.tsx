import { useEffect, useMemo, useState } from "react";
import { getRandomColor } from "utils/helperFunctions";
import DomainCardWithMenu from "pages/domain/domaincardwithmenu";
import CustomMenu from "components/common/CustomMenu";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Accordion, Box, AccordionSummary, AccordionDetails, Typography, Grid } from "@mui/material";
import GridItem from "utils/GridItem";
import { ShimmerBox } from "utils/ShimmerBox";
import { objectToQueryString } from "components/common/helper";
import CreateCapability from "./create-capability";
import { HiTemplate } from 'react-icons/hi';
import { createDomain, deleteCorecapability, fetchDomainByCapability, fetchTemplateDomainByCapability, patchCorecapability } from "apis";

const CapabilityCard = ({ id, name, isEditable, onUpdate, isEdited }: any) => {
  const [domainList, setDomainList] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [open, setOpen] = useState(false);

  const bgColor = useMemo(() => getRandomColor(), []);

  // Fetch domain list based on capability
  const handleExpand = async () => {
    setLoading(true);
    const params = { core_id: id };
    const queryString = objectToQueryString(params);

    try {
      const data = isEditable
        ? await fetchDomainByCapability(queryString)
        : await fetchTemplateDomainByCapability(queryString);
      setDomainList(data);
    } catch (error) {
      console.error("Error fetching domain by capability:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);
  const handleEditClick = () => {
    setIsEditModalOpen(true);
    handleMenuClose();
  };

  // Update capability name
  const updateCapabilityName = async (newName: string) => {
    try {
      await patchCorecapability(id, JSON.stringify({ name: newName }));
      if (onUpdate) onUpdate();  // Refresh parent component
    } catch (error) {
      console.error("Error updating capability name:", error);
    }
  };

  // Handle domain creation
  const handleCreateDomain = async (obj: object) => {
    await createDomain(JSON.stringify({ ...obj, core_id: id }));
    setOpen(false);
    handleExpand();  // Refresh the domain list after creation
  };

  // Delete capability
  const handleDeleteCapability = async () => {
    try {
      await deleteCorecapability(id);
      if (onUpdate) onUpdate();  // Refresh parent component
    } catch (error) {
      console.error("Error deleting capability:", error);
    }
  };

  return (
    <Grid item xs={3}>
      <GridItem sx={{ backgroundColor: bgColor, position: "relative" }}>
        {isEditable && (
          <CustomMenu
            anchorEl={anchorEl}
            onOpen={handleMenuOpen}
            onClose={handleMenuClose}
            onEdit={handleEditClick}
            onDelete={handleDeleteCapability}
            capabilityName={name}
            label="Business Capability"
            editEndpoint={`${process.env.REACT_APP_API_URL}coreCapability/${id}`}
            deleteEndpointCall={`${process.env.REACT_APP_API_URL}coreCapability/${id}`}
            onSave={(newName) => {
              updateCapabilityName(newName);
              setIsEditModalOpen(false);
            }}
          />
        )}
        {isEditable && !isEdited && (
          <HiTemplate style={{position: "absolute", zIndex:10, top: 8, left: 4, color: 'white', fontSize: "20px"}}/>
        )}
        <Accordion
          sx={{
            backgroundColor: bgColor,
            boxShadow: "none",
            color: "white",
            margin: 0,
            padding: 0,
            minWidth: "100%",
          }}
          onChange={() => handleExpand()}
        >
          <AccordionSummary
            expandIcon={null}
            aria-controls="panel1a-content"
            id="panel1a-header"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "60px",
              margin: 0,
              padding: 0,
              minWidth: "100%",
            }}
          >
            <Typography
              sx={{
                textAlign: "center",
                width: "100%",
                fontWeight: "bold",
                maxWidth: "100%",
              }}
            >
              {name}
            </Typography>
          </AccordionSummary>

          <AccordionDetails
            sx={{
              margin: "",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minWidth: "100%",
            }}
          >
            <Box sx={{ minWidth: "100%", textAlign: "center", height: "100%", marginX: 2 }}>
              {loading ? (
                <>
                  <ShimmerBox sx={{ height: "100px", minWidth: "100%" }} />
                  <ShimmerBox sx={{ height: "100px", minWidth: "100%" }} />
                  <ShimmerBox sx={{ height: "100px", minWidth: "100%" }} />
                </>
              ) : (
                domainList.map((domain: any) => (
                  <Box key={domain.id} sx={{ marginY: "14%", minWidth: "100%" }}>
                    <DomainCardWithMenu
                      name={domain.name}
                      id={domain.id}
                      isEditable={isEditable}
                      onSave={handleExpand}
                    />
                  </Box>
                ))
              )}
              {isEditable && (
                <div style={{ position: "relative", textAlign: "center", marginTop: '10%' }}>
                  <hr
                    style={{
                      border: "0",
                      height: "1px",
                      background: "white",
                      marginTop: "7%",
                    }}
                  />
                  <AddCircleIcon
                    onClick={() => setOpen(true)}
                    sx={{
                      color: "black",
                      backgroundColor: "white",
                      borderRadius: "50%",
                      position: "absolute",
                      top: "-12px",
                      left: "50%",
                      transform: "translateX(-50%)",
                      cursor: "pointer",
                    }}
                  />
                </div>
              )}
            </Box>
          </AccordionDetails>
        </Accordion>
      </GridItem>

      <CreateCapability
        open={open}
        onClose={() => setOpen(false)}
        label="Domain"
        clickHandler={handleCreateDomain}
      />
    </Grid>
  );
};

export default CapabilityCard;
