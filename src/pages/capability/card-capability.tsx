import { useMemo, useState } from "react";
import { getRandomColor, handleChange } from "utils/helperFunctions";
import DomainCard from "pages/domain/card-domain";
import EditIcon from '@mui/icons-material/Edit';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditCapability from "pages/capability/edit-capability";

import {
  Accordion,
  Box,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import GridItem from "utils/GridItem";
import { ShimmerBox } from "utils/ShimmerBox";

const CapabilityCard = (props: any) => {
  const [domainList, setDomainList] = useState<any>([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
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
  const handleCloseModal = () => {
    setIsEditModalOpen(false);
  };
  const handleDeleteClick = () => {
    setIsDeleteDialogOpen(true);
    handleMenuClose();
  };
  const handleCloseDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
  };
  const confirmDelete = () => {
    console.log("Confirmed deletion of capability:", props.name);
    setIsDeleteDialogOpen(false);
  };

  return (
    <Grid item xs={3}>
      <GridItem sx={{ backgroundColor: bgColor,position:'relative' }}>
      <IconButton
          onClick={handleMenuOpen}
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
        <Menu sx={{opacity:0.8}}
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleEditClick}>Edit</MenuItem>
          <MenuItem onClick={handleDeleteClick}>Delete</MenuItem>
        </Menu>
        {isEditModalOpen && (
          <EditCapability
            open={isEditModalOpen}
            onClose={handleCloseModal}
            capabilityName={props.name}
            onSave={(newName) => {
              console.log("New capability name:", newName);
              setIsEditModalOpen(false); 
            }}
          />
        )}
        <Dialog
          open={isDeleteDialogOpen}
          onClose={handleCloseDeleteDialog}
          aria-labelledby="delete-dialog-title"
          aria-describedby="delete-dialog-description"
        >
          <DialogTitle id="delete-dialog-title">Confirm Deletion</DialogTitle>
          <DialogContent>
            <DialogContentText id="delete-dialog-description">
              Are you sure you want to delete the capability "{props.name}"?
              This action cannot be undone.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDeleteDialog} color="primary">
              Cancel
            </Button>
            <Button onClick={confirmDelete} color="warning">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
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
              {props.name}
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
