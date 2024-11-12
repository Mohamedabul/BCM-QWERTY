import React from 'react';
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
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CustomMenu from './CustomMenu';
import CustomEditDialog from './CustomEditDialog';
import CustomDeleteDialog from './CustomDeleteDialog';

interface TableData {
  businessCapabilityName: string;
  domain: string;
  subDomain: string;
  applicationName: string;
  applicationVersion?: string;
}

interface CustomTableProps {
  data: TableData[];
}

const CustomTable: React.FC<CustomTableProps> = ({ data }) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [selectedRow, setSelectedRow] = React.useState<TableData | null>(null);
    const [editDialogOpen, setEditDialogOpen] = React.useState(false);
    const [editData, setEditData] = React.useState<TableData | null>(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>, row: TableData) => {
    setAnchorEl(event.currentTarget);
    setSelectedRow(row);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setSelectedRow(null);
  };

  const handleEditClick = (row: TableData) => {
    setEditData(row);
    setEditDialogOpen(true);
  };

  const handleEditDialogClose = () => {
    setEditDialogOpen(false);
    setEditData(null);
  };
  const handleEditSave = () => {
    console.log("Saved data:", editData);
    setEditDialogOpen(false);
  };

  const handleEditChange = (field: string, value: string) => {
    if (editData) {
      setEditData({ ...editData, [field]: value });
    }
  }
  const handleDeleteClick = () => {
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    // Handle deletion logic here
    console.log("Deleted data:", selectedRow);
    setDeleteDialogOpen(false);
    setSelectedRow(null);
  };

  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
  };



  return (
    <TableContainer sx={{ borderRadius: '12px' }}>
      <Table>
        <TableHead sx={{ backgroundColor: 'transparent' }}>
          <TableRow>
            <TableCell sx={{ borderBottom: "none" }}>
              <Typography variant="subtitle2" color="gray" fontWeight= 'bold' fontSize={16}>
                Business Capability names
              </Typography>
            </TableCell>
            <TableCell sx={{ borderBottom: "none" }}>
              <Typography variant="subtitle2" color="gray" fontWeight= 'bold' fontSize={16}>
                Domain
              </Typography>
            </TableCell>
            <TableCell sx={{ borderBottom: "none" }}>
              <Typography variant="subtitle2" color="gray" fontWeight= 'bold'   fontSize={16}>
                Sub-domain
              </Typography>
            </TableCell>
            <TableCell sx={{ borderBottom: "none" }}>
              <Typography variant="subtitle2" color="gray" fontWeight= 'bold' fontSize={16}>
                Application Name
              </Typography>
            </TableCell>
            <TableCell sx={{ borderBottom: "none" }} />
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index} hover>
              <TableCell sx={{ borderBottom: "none" }}>
                <Typography variant="body2" color="black">{row.businessCapabilityName}</Typography>
              </TableCell>
              <TableCell sx={{ borderBottom: "none" }}>
                <Typography variant="body2" color="black">{row.domain}</Typography>
              </TableCell>
              <TableCell sx={{ borderBottom: "none" }}>
                <Typography
                  variant="body2"
                  color="black"
                //   sx={{ color: row.subDomain === 'Accounting' ? '#FF69B4' : 'inherit' }}
                >
                  {row.subDomain}
                </Typography>
              </TableCell >
              <TableCell sx={{ borderBottom: "none" }}>
                <Typography variant="body2" color="black">
                  {row.applicationName}
                  {row.applicationVersion && (
                    <Typography variant="caption" color="textSecondary" component="span">
                      {" "}
                      {row.applicationVersion}
                    </Typography>
                  )}
                </Typography>
              </TableCell>
              <TableCell align="right" sx={{ borderBottom: "none" }} >
                <IconButton onClick={(event) => handleOpenMenu(event, row)} style={{ transform: 'rotate(90deg)', color: 'black' }} >
                  <MoreVertIcon />
                </IconButton>
                {selectedRow === row && (
                  <CustomMenu
                    anchorEl={anchorEl}
                    onClose={handleCloseMenu}
                    onOpen={(event) => handleOpenMenu(event, row)}
                    onDelete={handleDeleteClick}
                    onEdit={() => handleEditClick(row)}
                    capabilityName={''} label={''}   
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
    </TableContainer>
  );
};

export default CustomTable;
