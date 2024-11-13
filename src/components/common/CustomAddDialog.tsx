import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CustomButton from './CustomButton';

interface CustomAddDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: () => void;
  data: {
    businessCapabilityName: string;
    domain: string;
    subDomain: string;
    applicationName: string;
  };
  onChange: (field: string, value: string) => void;
}

const CustomAddDialog: React.FC<CustomAddDialogProps> = ({ open, onClose, onSave, data, onChange }) => {
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
        <DialogTitle sx={{ fontWeight: 'bold', color: 'black' }}>Add New Item</DialogTitle>
        <IconButton onClick={onClose} sx={{ color: 'black' }}>
          <CloseIcon />
        </IconButton>
      </Box>
      <DialogContent dividers sx={{ backgroundColor: 'white', color: 'black' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'black' }}>Business Capability<span style={{ color: 'red' }}>*</span></Typography>
          <TextField
            fullWidth
            variant="outlined"
            value={data.businessCapabilityName}
            onChange={(e) => onChange('businessCapabilityName', e.target.value)}
            placeholder="Add Bussiness Capability"
            sx={{
              backgroundColor: '#f0f2f5',
              borderRadius: 1,
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: 'transparent' },
                '&.Mui-focused fieldset': { borderColor: '#b0bec5' },
              },
              '& .MuiInputBase-input': { color: 'black' },
            }}
          />
          <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'black' }}>Domain <span style={{ color: 'red' }}>*</span></Typography>
          <TextField
            fullWidth
            variant="outlined"
            value={data.domain}
            onChange={(e) => onChange('domain', e.target.value)}
            placeholder="Add Domain"
            sx={{
              backgroundColor: '#f0f2f5',
              borderRadius: 1,
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: 'transparent' },
                '&.Mui-focused fieldset': { borderColor: '#b0bec5' },
              },
              '& .MuiInputBase-input': { color: 'black' },
            }}
          />
          <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'black' }}>Sub-domain <span style={{ color: 'red' }}>*</span></Typography>
          <TextField
            fullWidth
            variant="outlined"
            value={data.subDomain}
            onChange={(e) => onChange('subDomain', e.target.value)}
            placeholder="Add Subdomain"
            sx={{
              backgroundColor: '#f0f2f5',
              borderRadius: 1,
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: 'transparent' },
                '&.Mui-focused fieldset': { borderColor: '#b0bec5' },
              },
              '& .MuiInputBase-input': { color: 'black' },
            }}
          />
          <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'black' }}>Application<span style={{ color: 'red' }}>*</span></Typography>
          <TextField
            fullWidth
            variant="outlined"
            value={data.applicationName}
            onChange={(e) => onChange('applicationName', e.target.value)}
            placeholder="Add Application"
            sx={{
              backgroundColor: '#f0f2f5',
              borderRadius: 1,
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: 'transparent' },
                '&.Mui-focused fieldset': { borderColor: '#b0bec5' },
              },
              '& .MuiInputBase-input': { color: 'black' },
            }}
          />
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

export default CustomAddDialog;
