import React, { useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Select,
  MenuItem,
  Box,
  Typography,
  IconButton,
  TextField,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CustomButton from './CustomButton';

interface CustomAddDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: () => void;
  data: {
    businessCapabilityName:string;
    domain: string;
    subDomain: string;
    applicationName: string;
  };
  onChange: (field: string, value: string) => void;
}

interface Capability {
  id: string;
  name: string;
}

interface Domain {
  id: string;
  name: string;
  core_id: string;
}

interface SubDomain {
  id: string;
  name: string;
  domain_id: string;
}

const CustomAddDialog: React.FC<CustomAddDialogProps> = ({ open, onClose, onSave, data, onChange }) => {
  const [capabilities, setCapabilities] = React.useState<Capability[]>([]);
  const [domains, setDomains] = React.useState<Domain[]>([]);
  const [subDomains, setSubDomains] = React.useState<SubDomain[]>([]);
  const [filteredDomains, setFilteredDomains] = React.useState<Domain[]>([]);
  const [filteredSubDomains, setFilteredSubDomains] = React.useState<SubDomain[]>([]);

  useEffect(() => {
    const fetchCapabilities = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/corecapability');
        const result = await response.json();
        setCapabilities(result);
      } catch (error) {
        console.error('Error fetching capabilities:', error);
      }
    };

    const fetchDomains = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/domain');
        const result = await response.json();
        setDomains(result);
      } catch (error) {
        console.error('Error fetching domains:', error);
      }
      // setFilteredDomains([]);
    };

    const fetchSubDomains = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/subdomain');
        const result = await response.json();
        setSubDomains(result);
      } catch (error) {
        console.error('Error fetching subdomains:', error);
      }
      
    };

    fetchCapabilities();
    fetchDomains();
    fetchSubDomains();
  }, []);

  useEffect(() => {
    const capabilityId = data.businessCapabilityName;
    setFilteredDomains(domains.filter((domain) => domain.core_id === capabilityId));
    
  }, [data.businessCapabilityName, domains, onChange]);

  useEffect(() => {
    const domainId = data.domain;
    setFilteredSubDomains(subDomains.filter((subDomain) => subDomain.domain_id === domainId));
     
  }, [data.domain, subDomains, onChange]);

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
          <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'black' }}>
            Business Capability<span style={{ color: 'red' }}>*</span>
          </Typography>
          <Select
            fullWidth
            variant="outlined"
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
            <MenuItem value="" disabled>
              Select Business Capability
            </MenuItem>
            {capabilities.map((capability) => (
              <MenuItem key={capability.id} value={capability.id}>
                {capability.name}
              </MenuItem>
            ))}
          </Select>

          <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'black' }}>
            Domain<span style={{ color: 'red' }}>*</span>
          </Typography>
          <Select
            fullWidth
            variant="outlined"
            value={data.domain}
            onChange={(e) => onChange('domain', e.target.value as string)}
            displayEmpty
            disabled={!data.businessCapabilityName}
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
            <MenuItem value="" disabled>
              Select Domain
            </MenuItem>
            {filteredDomains.map((domain) => (
              <MenuItem key={domain.id} value={domain.id}>
                {domain.name}
              </MenuItem>
            ))}
          </Select>

          <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'black' }}>
            Sub-domain<span style={{ color: 'red' }}>*</span>
          </Typography>
          <Select
            fullWidth
            variant="outlined"
            value={data.subDomain}
            onChange={(e) => onChange('subDomain', e.target.value as string)}
            displayEmpty
            disabled={!data.domain}
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
            <MenuItem value="" disabled>
              Select Sub-domain
            </MenuItem>
            {filteredSubDomains.map((subDomain) => (
              <MenuItem key={subDomain.id} value={subDomain.id}>
                {subDomain.name}
              </MenuItem>
            ))}
          </Select>

          <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'black' }}>
            Application<span style={{ color: 'red' }}>*</span>
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            value={data.applicationName}
            onChange={(e) => onChange('applicationName', e.target.value)}
            placeholder="Add Application"
            disabled={!data.subDomain}
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


