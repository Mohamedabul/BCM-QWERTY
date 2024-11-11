import { useEffect, useMemo, useState } from "react";
import { getRandomColor, handleChange } from "utils/helperFunctions";
import DomainCardWithMenu from "pages/domain/domaincardwithmenu";
import CustomMenu from "components/common/CustomMenu";
import AddCircleIcon from "@mui/icons-material/AddCircle";
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
import { objectToQueryString } from "components/common/helper";
import CreateCapability from "./create-capability";

const CapabilityCard = (props: any) => {
  const { isEditable } = props;
  const [domainList, setDomainList] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [name, setName] = useState(props.name);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const bgColor = useMemo(() => getRandomColor(), []);
  const [open, setOpen] = useState(false);

  const handleExpand = async () => {
    setLoading(true);
  
    // Set the endpoint based on the `isEditable` flag
    const endpoint = `${process.env.REACT_APP_API_URL}${
      isEditable ? "domainByCapability" : "template/domainByCapability"
    }`;
  
    const params = { core_id: props.id };
    const queryString = objectToQueryString(params);
  
    try {
      const resp = await fetch(`${endpoint}?${queryString}`);
      if (!resp.ok) {
        console.error("Error fetching domain by capability:", resp.statusText);
        return;
      }
      const data = await resp.json();
      setDomainList(data);
    } catch (error) {
      console.error("Error fetching domain by capability:", error);
    } finally {
      setLoading(false);
    }
  };
  // const handleExpand = async () => {
  //   setLoading(true);
  //   const params = { core_id: props.id };
  //   const queryString = objectToQueryString(params);
  //   const resp = await fetch(
  //     process.env.REACT_APP_API_URL + `domainByCapability?${queryString}`
  //   );
  //   const data = await resp.json();
  //   setDomainList(data);
  //   setLoading(false);
  // };

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
    try {
      setName(newName);
      const resp = await fetch(
        process.env.REACT_APP_API_URL + `coreCapability/${props.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: newName }),
        }
      );

      if (resp.ok) {
        console.log("Capability name updated successfully");
      } else {
        console.log("Failed to update capability name");
      }
    } catch (error) {
      console.log("Error updating capability name:", error);
    }
  };

  const handleClick = async (obj:object, callback:any) => {
    const response = await fetch(
      process.env.REACT_APP_API_URL + "domain",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({...obj,core_id: props.id}),
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to create capability: ${response.statusText}`);
    }

    console.log("Capability created successfully");
    callback();
    handleExpand();
    setOpen(false);
  };

  const deleteCapability = async () => {
    try {
      const resp = await fetch(
        process.env.REACT_APP_API_URL + `coreCapability/${props.id}`,
        {
          method: "DELETE",
        }
      );
      if (resp.ok) {
        console.log("Capability deleted successfully");
        props.fetchCabability();
      } else {
        console.log("Failed to delete capability");
      }
    } catch (error) {
      console.log("Error deleting capability:", error);
    }
  };
  
  return (
    <Grid item xs={3}>
      <GridItem sx={{ backgroundColor: bgColor, position: "relative" }}>
        {props.isEditable && (
          <CustomMenu
            anchorEl={anchorEl}
            onOpen={handleMenuOpen}
            onClose={handleMenuClose}
            onEdit={handleEditClick}
            onDelete={handleDeleteClick}
            capabilityName={props.name}
            label="Buissiness Capability"
            editEndpoint={`${process.env.REACT_APP_API_URL}coreCapability/${props.id}`}
            deleteEndpoint={`${process.env.REACT_APP_API_URL}coreCapability/${props.id}`}
            onSave={(newName) => {
              updateCapabilityName(newName);
              setIsEditModalOpen(false);
            }}
          />
        )}
        <Accordion
          sx={{
            minheight: "100",
            backgroundColor: bgColor,
            boxShadow: "none",
            color: "white",
            margin: 0,
            padding: 0,
            minWidth: "100%",
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
              height: "60px",
              margin: 0,
              padding: 0,
              maxWidth: "100%",
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
              margin: '',
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minWidth: "100%",
            }}
          >
            <Box
              sx={{
                minWidth: "100%",
                textAlign: "center",
                height: "100%",
                marginX: 2,
              }}
            >
              {loading ? (
                <>
                  <ShimmerBox sx={{ height: "100px", minWidth: "100%" }} />
                  <ShimmerBox sx={{ height: "100px", minWidth: "100%" }} />
                  <ShimmerBox sx={{ height: "100px", minWidth: "100%" }} />
                </>
              ) : (
                domainList.map((domain: any, index: any) => (
                  <Box key={domain.id} sx={{ marginY:"14%",minWidth: "100%"}}>
                    <DomainCardWithMenu
                      name={domain.name}
                      id={domain.id}
                      isEditable={props.isEditable}
                      onSave={handleExpand}
                    />
                    {index < domainList.length - 1 && (
                      <hr
                        style={{
                          border: "0",
                          height: "1px",
                          background: "black",
                        }}
                      />
                    )}
                  </Box>
                ))
              )}
              {props.isEditable && (
                <>
                  <div style={{ position: "relative", textAlign: "center", marginTop:'10%' }}>
                    <hr
                      style={{
                        border: "0",
                        height: "1px",
                        background: "white",
                        marginTop: "7%",
                      }}
                    />
                    <AddCircleIcon
                      onClick={() => {
                        setOpen(true);
                      }}
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
                </>
              )}
            </Box>
          </AccordionDetails>
        </Accordion>
      </GridItem>
      <CreateCapability
        open={open}
        onClose={() => setOpen(false)}
        label="Domain"
        clickHandler={handleClick}
      />
    </Grid>
  );
};

export default CapabilityCard;
