import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Select, MenuItem, Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CustomButton from './CustomButton';

interface CustomEditDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: () => void;
  data: {
    businessCapabilityName: string;
    domain: string;
    subDomain: string;
  };
  onChange: (field: string, value: string) => void;
}

const CustomEditDialog: React.FC<CustomEditDialogProps> = ({ open, onClose, onSave, data, onChange }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <Box
        sx={{
          backgroundColor: 'white',
          color: 'black',
          padding: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <DialogTitle margin={-2} sx={{ fontWeight: 'bold', color: 'black' }}>Edit</DialogTitle>
        <IconButton onClick={onClose} sx={{ color: 'black' }}>
          <CloseIcon />
        </IconButton>
      </Box>
      <DialogContent dividers sx={{ backgroundColor: 'white', color: 'black' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'black' }}>Edit Business Capability Name<span style={{ color: 'red' }}>*</span></Typography>
          <Select
            fullWidth
            value={data.businessCapabilityName}
            onChange={(e) => onChange('businessCapabilityName', e.target.value as string)}
            displayEmpty
            sx={{
              backgroundColor: '#f0f2f5',
              borderRadius: 1,
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: 'transparent' },
                '&.Mui-focused fieldset': { borderColor: '#b0bec5' },
              },
              '& .MuiInputBase-input': { color: 'black' },
            }}
          >
            <MenuItem value="" disabled>Select Business Capability</MenuItem>
            <MenuItem value="Enterprise Resource Planning">Enterprise Resource Planning</MenuItem>
            <MenuItem value="Customer Relationship Management">Customer Relationship Management</MenuItem>
          </Select>

          <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'black' }}>Edit Domain Name<span style={{ color: 'red' }}>*</span></Typography>
          <Select
            fullWidth
            value={data.domain}
            onChange={(e) => onChange('domain', e.target.value as string)}
            displayEmpty
            sx={{
              backgroundColor: '#f0f2f5',
              borderRadius: 1,
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: 'transparent' },
                '&.Mui-focused fieldset': { borderColor: '#b0bec5' },
              },
              '& .MuiInputBase-input': { color: 'black' },
            }}
          >
            <MenuItem value="" disabled>Select Domain</MenuItem>
            <MenuItem value="Bank Office">Bank Office</MenuItem>
            <MenuItem value="Front Office">Front Office</MenuItem>
          </Select>

          <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'black' }}>Edit Sub-domain Name<span style={{ color: 'red' }}>*</span></Typography>
          <Select
            fullWidth
            value={data.subDomain}
            onChange={(e) => onChange('subDomain', e.target.value as string)}
            displayEmpty
            sx={{
              backgroundColor: '#f0f2f5',
              borderRadius: 1,
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: 'transparent' },
                '&.Mui-focused fieldset': { borderColor: '#b0bec5' },
              },
              '& .MuiInputBase-input': { color: 'black' },
            }}
          >
            <MenuItem value="" disabled>Select Sub-domain</MenuItem>
            <MenuItem value="Accounting">Accounting</MenuItem>
            <MenuItem value="Payroll">Payroll</MenuItem>
          </Select>
        </Box>
      </DialogContent>
      <DialogActions sx={{ backgroundColor: 'white', padding: '16px', justifyContent: 'space-between' }}>
        <CustomButton
          title="Cancel"
          backgroundColor="white"
          color="black"
          handleClick={onClose}
          sx={{
            color: '#1D1F20',
            borderColor: '#ccc',
            padding: '8px 16px',
            fontWeight: 'bold',
            textTransform: 'none',
            borderRadius: '8px',
            width: '45%',
          }}
        />
        <CustomButton
          title="Save"
          backgroundColor="#1976d2"
          color="white"
          handleClick={onSave}
          sx={{
            backgroundColor: '#1976d2',
            color: 'white',
            padding: '8px 16px',
            fontWeight: 'bold',
            textTransform: 'none',
            borderRadius: '8px',
            width: '45%',
            '&:hover': {
              backgroundColor: '#155ab0',
            },
          }}
        />
      </DialogActions>
    </Dialog>
  );
};

export default CustomEditDialog;
