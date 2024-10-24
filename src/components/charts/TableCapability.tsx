import React from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Paper, Typography } from '@mui/material';

// Sample data for the table
const rows = [
  {
    businessCapability: "Customer Relationship",
    domain: "Contact Management",
    subDomain1: "Classify Demand",
  },
  {
    businessCapability: "Customer Relationship",
    domain: "Contact Management",
    subDomain1: "Contact Interaction",
  },
  {
    businessCapability: "Customer Relationship",
    domain: "Contact Management",
    subDomain1: "Inbound Contact",
    // subDomain2: "Human Resources Management",
  },
  {
    businessCapability: "Customer Relationship",
    domain: "Contact Management",
    subDomain1: "Manage Interaction",
    // subDomain2: "Financial Planning & Analysis",
  },
  {
    businessCapability: "Customer Relationship",
    domain: "Contact Management",
    subDomain1: "Outbound Contact",
    // subDomain2: "Financial Planning & Analysis",
  },
  {
    businessCapability: "Customer Relationship",
    domain: "Contact Management",
    subDomain1: "Route Contact",
    // subDomain2: "Financial Planning & Analysis",
  },
];

const CapabilityTable = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="capability table">
          <TableHead>
            <TableRow>
              <TableCell>Business Capability names</TableCell>
              <TableCell>Domain</TableCell>
              <TableCell>Sub-domain</TableCell>
              {/* <TableCell>Sub-domain</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
              <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                <TableCell>{row.businessCapability}</TableCell>
                <TableCell>{row.domain}</TableCell>
                <TableCell>{row.subDomain1}</TableCell>
                {/* <TableCell>{row.subDomain2}</TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default CapabilityTable;
