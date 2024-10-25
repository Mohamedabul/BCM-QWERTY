import React, { useState } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Paper,
  Typography,
  IconButton,
  Collapse,
  Fade,
  useTheme,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// Sample data for the table
const rows = [
  {
    businessCapability: "Customer Relationship",
    domain: "Contact Management",
    subDomain1: "Classify Demand",
    noApplication: "3",
    details: "Additional information about Customer Relationship",
  },
  {
    businessCapability: "Enterprise Support",
    domain: "Contact Management",
    subDomain1: "Contact Interaction",
    noApplication: "6",
    details: "Details for Enterprise Support.",
  },
  {
    businessCapability: "Finance",
    domain: "Contact Management",
    subDomain1: "Inbound Contact",
    noApplication: "4",
    details: "Finance-related details.",
  },
  {
    businessCapability: "Finance",
    domain: "Contact Management",
    subDomain1: "Manage Interaction",
    noApplication: "1",
    details: "Finance-related details.",
  },
  {
    businessCapability: "Finance",
    domain: "Contact Management",
    subDomain1: "Outbound Contact",
    noApplication: "-",
    details: "Finance-related details.",
  },
  {
    businessCapability: "Finance",
    domain: "Contact Management",
    subDomain1: "Route Contact",
    noApplication: "2",
    details: "Finance-related details.",
  },
];

const CapabilityTable = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [expandedRow, setExpandedRow] = useState<number | null>(null);
  const theme = useTheme();

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const toggleRowExpand = (index: number) => {
    setExpandedRow(expandedRow === index ? null : index);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}>
      <TableContainer>
        <Table stickyHeader aria-label="dynamic capability table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '16px' }}>Business Capability Names</TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '16px' }}>Domain</TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '16px' }}>Sub-domain</TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '16px' }}>No. of Applications</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
              <React.Fragment key={index}>
                <TableRow
                  hover
                  onClick={() => toggleRowExpand(index)}
                  sx={{
                    cursor: 'pointer',
                    '&:hover': {
                      backgroundColor: theme.palette.action.hover,
                    },
                    transition: 'background-color 0.3s ease',
                  }}
                >
                  <TableCell>{row.businessCapability}</TableCell>
                  <TableCell>{row.domain}</TableCell>
                  <TableCell>{row.subDomain1}</TableCell>
                  <TableCell>{row.noApplication}</TableCell>
                  {/* <TableCell align="right">
                    <IconButton size="small">
                      <MoreVertIcon />
                    </IconButton>
                    <IconButton size="small" onClick={() => toggleRowExpand(index)}>
                      <ExpandMoreIcon
                        sx={{
                          transform: expandedRow === index ? 'rotate(180deg)' : 'rotate(0deg)',
                          transition: 'transform 0.3s',
                        }}
                      />
                    </IconButton>
                  </TableCell> */}
                </TableRow>
                <TableRow>
                  <TableCell colSpan={5} sx={{ padding: 0, borderBottom: 'none' }}>
                    <Collapse in={expandedRow === index} timeout="auto" unmountOnExit>
                      <Fade in={expandedRow === index}>
                        <Box
                          sx={{
                            backgroundColor: theme.palette.background.default,
                            padding: '16px 24px',
                            borderTop: `1px solid ${theme.palette.divider}`,
                          }}
                        >
                          <Typography variant="body2" color="text.secondary">
                            {row.details}
                          </Typography>
                        </Box>
                      </Fade>
                    </Collapse>
                  </TableCell>
                </TableRow>
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box display="flex" justifyContent="space-between" alignItems="center" padding="16px">
        <Typography>Show rows:</Typography>
        <TablePagination
          rowsPerPageOptions={[10, 25, 50]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
    </Paper>
  );
};

export default CapabilityTable;