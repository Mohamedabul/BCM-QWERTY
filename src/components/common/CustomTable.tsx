import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box,
  IconButton,
  Dialog,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  TablePagination,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CustomMenu from "./CustomMenu";
import CustomEditDialog from "./CustomEditDialog";
import CustomDeleteDialog from "./CustomDeleteDialog";
import { deleteApplication, patchApplication } from "apis";

interface TableData {
  id: string;
  businessCapabilityName: string;
  domain: string;
  subDomain: string;
  applicationName: string;
  applicationVersion?: string;
  core_id: string;
  domain_id: string;
  subdomain_id: string;
  //
  region_id: string; 
  country_id: string; 
  status: string; 
}

interface CustomTableProps {
  data: TableData[];
  loading: boolean;
  // actionButton: any;
  page: any;
  setPage: any;
  totalCount: any;
  setTotalCount: any;
  pageSize: any;
  setPageSize: any;
  editCallback: any;
}

const CustomTable: React.FC<CustomTableProps> = ({
  data,
  // actionButton,
  page,
  setPage,
  totalCount,
  setTotalCount,
  pageSize,
  setPageSize,
  editCallback
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedRow, setSelectedRow] = React.useState<TableData | null>(null);
  const [editDialogOpen, setEditDialogOpen] = React.useState(false);
  const [editData, setEditData] = React.useState<TableData | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);

  const handleOpenMenu = (
    event: React.MouseEvent<HTMLElement>,
    row: TableData
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedRow(row);
    console.log("Selected row for deletion/edit:", row);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    // setSelectedRow(null);
  };

  const handleEditClick = (row: TableData) => {
    setEditData({
      ...row,
      core_id: row.core_id || "",
      domain_id: row.domain_id || "",
      subdomain_id: row.subdomain_id || "",
      //
      region_id: row.region_id || "", 
    country_id: row.country_id || "", 
    status: row.status || "",
    });
    setEditDialogOpen(true);
  };

  const handleEditDialogClose = () => {
    setEditDialogOpen(false);
    setEditData(null);
  };
  const handleEditSave = async () => {
    if (!editData) return;

    try {
      const payload = {
        core_id: editData.core_id,
        domain_id: editData.domain_id,
        subdomain_id: editData.subdomain_id,
        //
        region_id: editData.region_id, 
        country_id: editData.country_id, 
        status: editData.status,
        //
        name: editData.applicationName,
        applicationVersion: editData.applicationVersion,
      };

      const response = await patchApplication(
        editData.id,
        JSON.stringify(payload)
      );
      if (!response.ok) {
        throw new Error("Failed to update the application");
      }

      const result = await response.json();
      console.log("Edit saved successfully:", result);

      // Close the dialog after successful edit
      setEditDialogOpen(false);
      setEditData(null);
      await editCallback();

      // Refresh the data (fetch the updated data here if needed)
    } catch (error) {
      console.error("Error saving edit:", error);
      alert("An error occurred while saving the edit. Please try again.");
    }
  };

  const handleEditChange = (field: string, value: string) => {
    if (editData) {
      setEditData({ ...editData, [field]: value });
    }
  };
  const handleDeleteClick = () => {
    setDeleteDialogOpen(true);
  };

  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage + 1);
  };

  const handleDeleteConfirm = async () => {
    if (!selectedRow) {
      console.error("No selected row to delete");
      return;
    }
    console.log("Deleting application with ID:", selectedRow.id);
    try {
      const response = await deleteApplication(selectedRow.id);
      console.log("Response status:", response.status);
      if (!response.ok) {
        console.error(
          "Failed to delete application. Status code:",
          response.status
        );
        throw new Error("Failed to delete the application");
      }

      console.log("Deleted data:", selectedRow);
      
      setDeleteDialogOpen(false);
      setSelectedRow(null);
      await editCallback();
    } catch (error) {
      console.error("Error deleting application:", error);
      alert(
        "An error occurred while deleting the application. Please try again."
      );
    }
  };

  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
  };

  return (
    <TableContainer
      sx={{
        borderRadius: "12px",
        maxHeight: 600,
        overflowY: "auto",
        "&::-webkit-scrollbar": {
          width: "8px",
        },
        "&::-webkit-scrollbar-track": {
          backgroundColor: "#f1f1f1",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "#888",
          borderRadius: "4px",
        },
        "&::-webkit-scrollbar-thumb:hover": {
          backgroundColor: "#555",
        },
      }}
    >
      <Table stickyHeader>
        <TableHead>
          <TableRow sx={{ "& th": { backgroundColor: "#e2e2e2" } }}>
            <TableCell align="center" sx={{ borderBottom: "none" }}>
              <Typography
                variant="subtitle2"
                color="black"
                fontWeight="bold"
                fontSize={16}
              >
                Business Capability
              </Typography>
            </TableCell>
            <TableCell align="center" sx={{ borderBottom: "none" }}>
              <Typography
                variant="subtitle2"
                color="black"
                fontWeight="bold"
                fontSize={16}
              >
                Domain
              </Typography>
            </TableCell>
            <TableCell align="center" sx={{ borderBottom: "none" }}>
              <Typography
                variant="subtitle2"
                color="black"
                fontWeight="bold"
                fontSize={16}
              >
                Sub-domain
              </Typography>
            </TableCell>
            <TableCell align="center" sx={{ borderBottom: "none" }}>
              <Typography
                variant="subtitle2"
                color="black"
                fontWeight="bold"
                fontSize={16}
              >
                Application
              </Typography>
            </TableCell>
            <TableCell sx={{ borderBottom: "none", textAlign: "right" }}>
              {/* {actionButton} */}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index} hover>
              <TableCell align="center" sx={{ borderBottom: "none" }}>
                <Typography variant="body2" color="black">
                  {row.businessCapabilityName || "-"}
                </Typography>
              </TableCell>
              <TableCell align="center" sx={{ borderBottom: "none" }}>
                <Typography variant="body2" color="black">
                  {row.domain || "-"}
                </Typography>
              </TableCell>
              <TableCell align="center" sx={{ borderBottom: "none" }}>
                <Typography
                  variant="body2"
                  color="black"
                  //   sx={{ color: row.subDomain === 'Accounting' ? '#FF69B4' : 'inherit' }}
                >
                  {row.subDomain || "-"}
                </Typography>
              </TableCell>
              <TableCell align="center" sx={{ borderBottom: "none" }}>
                <Typography variant="body2" color="black">
                  {row.applicationName || "-"}
                </Typography>
              </TableCell>
              <TableCell align="right" sx={{ borderBottom: "none" }}>
                <IconButton
                  onClick={(event) => handleOpenMenu(event, row)}
                  style={{ transform: "rotate(90deg)", color: "black" }}
                >
                  <MoreVertIcon />
                </IconButton>
                {selectedRow === row && (
                  <CustomMenu
                    anchorEl={anchorEl}
                    onClose={handleCloseMenu}
                    onOpen={(event) => handleOpenMenu(event, row)}
                    onDelete={handleDeleteClick}
                    onEdit={() => handleEditClick(row)}
                    capabilityName={""}
                    label={""}
                    useCustomEditDialog={true}
                    useCustomDeleteDialog={true}
                  />
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {editData && (
        <CustomEditDialog
          open={editDialogOpen}
          onClose={handleEditDialogClose}
          onSave={handleEditSave}
          data={editData}
          onChange={handleEditChange}
        />
      )}
      <CustomDeleteDialog
        open={deleteDialogOpen}
        onClose={handleDeleteDialogClose}
        onConfirm={handleDeleteConfirm}
        title={`Delete ${selectedRow?.businessCapabilityName}`}
      />
      <TablePagination
        component="div"
        count={totalCount}
        page={page - 1}
        onPageChange={handleChangePage}
        rowsPerPage={pageSize}
        onRowsPerPageChange={(event) => {
          setPageSize(parseInt(event.target.value, 10));
          setPage(1);
        }}
        rowsPerPageOptions={[10, 50, 100]}
        sx={{
          position: "sticky",
          bottom: 0,
          backgroundColor: "white",
          zIndex: 1,
        }}
        labelDisplayedRows={({ from, to, count, page }) =>
          `Page ${page + 1} of ${Math.ceil(count / pageSize)} (${count})`
        }
      />
    </TableContainer>
  );
};

export default CustomTable;
