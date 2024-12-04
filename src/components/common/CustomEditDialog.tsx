import React, { useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Select, MenuItem, Box, Typography, IconButton, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CustomButton from './CustomButton';
import { fetchCorecapability, fetchDomain, fetchSubdomain, getCountrys, getRegions } from 'apis';
import { Capability, Domain, SubDomain } from 'apis/interfaces';
import { countReset } from 'console';

interface CustomEditDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: () => void;
  sort: string;
  data: any;
  onChange: (field: string, value: string) => void;
}
// dummy 


const CustomEditDialog: React.FC<CustomEditDialogProps> = ({ open, onClose, onSave, data, onChange }) => {
  const [capabilities, setCapabilities] = React.useState<Capability[]>([]);
  const [domains, setDomains] = React.useState<Domain[]>([]);
  const [subDomains, setSubDomains] = React.useState<SubDomain[]>([]);
  //
  const [regions, setRegions] = React.useState<any[]>([]);
  const [countries, setCountries] = React.useState<any[]>([]);


  const [filteredDomains, setFilteredDomains] = React.useState<Domain[]>([]);
  const [filteredSubDomains, setFilteredSubDomains] = React.useState<SubDomain[]>([]);
  

  useEffect(() => {
    const fetchCapabilities = async () => {
      try {
        const sort = (JSON.stringify({ name: "ASC" }));
        const result = await fetchCorecapability(sort);
        // const sortedCapabilities = result.sort((a: { name: string; }, b: { name: any; }) => a.name.localeCompare(b.name));
        setCapabilities(result);
      } catch (error) {
        console.error("Error fetching capabilities:", error);
      }
    };
    const fetchDomains = async () => {
      try {
        const sort = (JSON.stringify({ name: "ASC" }));
        const domainResult = await fetchDomain(sort);
        // const sortedDomains = domainResult.sort((a: { name: string; }, b: { name: any; }) => a.name.localeCompare(b.name));
      setDomains(domainResult);
      } catch (error) {
        console.error("Error fetching domains:", error);
      }
    };

    const fetchSubDomains = async () => {
      try {
        const sort = (JSON.stringify({ name: "ASC" }));
        const subDomainResult = await fetchSubdomain(sort);
        // const sortedSubDomains = subDomainResult.sort((a: { name: string; }, b: { name: any; }) => a.name.localeCompare(b.name));
        setSubDomains(subDomainResult);
      } catch (error) {
        console.error("Error fetching subdomains:", error);
      }
    };

    const fetchRegions = async () => {
      try {
        const RegionResult = await getRegions();
        setRegions(RegionResult);
      } catch (error) {
        console.error("Error fetching regions:", error);
      }
    };

    const fetchCountries = async () => {
      try {
        const countryResult = await getCountrys();
        setCountries(countryResult);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCapabilities();
    fetchDomains();
    fetchSubDomains();
    //
    fetchRegions();
    fetchCountries();
  }, []);

    useEffect(() => {
      const capabilityId = data.core_id;
      setFilteredDomains(domains.filter((domain) => domain.core_id === capabilityId));
      
      // setFilteredDomains(filtered.sort((a, b) => a.name.localeCompare(b.name)));
    }, [data.core_id, domains]);

  
  useEffect(() => {
    const domainId = data.domain_id;
    // const filtered = subDomains.filter((subDomain) => subDomain.domain_id === domainId);
    setFilteredSubDomains(subDomains.filter((subDomain) => subDomain.domain_id === domainId));
  }, [data.domain_id, subDomains]);

 


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
        <DialogTitle margin={-2} sx={{ fontWeight: 'bold', color: 'black' }}>Change Mapping</DialogTitle>
        <IconButton onClick={onClose} sx={{ color: 'black' }}>
          <CloseIcon />
        </IconButton>
      </Box>
      <DialogContent dividers sx={{ backgroundColor: 'white', color: 'black' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'black' }}>Select Business Capability Name<span style={{ color: 'red' }}>*</span></Typography>
          <Select
            fullWidth
            value={[data.core_id]}
            onChange={(e) => onChange('core_id', e.target.value as string)}
            displayEmpty
            multiple
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
            {
              data.businessCapabilityName ? <MenuItem value="">{data.businessCapabilityName}</MenuItem> : <MenuItem value="" disabled>Select Business Capability</MenuItem>
            }
            {capabilities.map((capability) => (
              <MenuItem key={capability.id} value={capability.id}>
                {capability.name}
              </MenuItem>
            ))}
          </Select>

          <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'black' }}>Select Domain Name<span style={{ color: 'red' }}>*</span></Typography>
          <Select
            fullWidth
            value={data.domain_id}
            onChange={(e) => onChange('domain_id', e.target.value as string)}
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
            {
              data.domain ? <MenuItem value="">{data.domain}</MenuItem> : <MenuItem value="" disabled>Select Domain</MenuItem>
            }
            {filteredDomains.map((domain) => (
              <MenuItem key={domain.id} value={domain.id}>
                {domain.name}
              </MenuItem>
            ))}
          </Select>

          <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'black' }}>Select Sub-domain Name<span style={{ color: 'red' }}>*</span></Typography>
          <Select
            fullWidth
            value={data.subdomain_id}
            onChange={(e) => onChange('subdomain_id', e.target.value as string)}
            displayEmpty
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
          >
            {
              data.subDomain ? <MenuItem value="">{data.subDomain}</MenuItem> : <MenuItem value="" disabled>Select Sub-domain</MenuItem>
            }
            
            {filteredSubDomains.map((subDomain) => (
              <MenuItem key={subDomain.id} value={subDomain.id}>
                {subDomain.name}
              </MenuItem>
            ))}
          </Select>
          
           {/* Region Select */}
           <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'black' }}>
            Select Region<span style={{ color: 'red' }}>*</span>
          </Typography>
          <Select
            fullWidth
            value={data.region_id}
            onChange={(e) => onChange('region_id', e.target.value as string)}
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
            <MenuItem value="" disabled>Select Region</MenuItem>
            {regions.map((region) => (
              <MenuItem key={region.id} value={region.id}>
                {region.name}
              </MenuItem>
            ))}
          </Select>

          {/* Country Select */}
          <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'black' }}>
            Select Country<span style={{ color: 'red' }}>*</span>
          </Typography>
          <Select
            fullWidth
            value={data.country_id}
            onChange={(e) => onChange('country_id', e.target.value as string)}
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
            <MenuItem value="" disabled>Select Country</MenuItem>
            {countries.map((country) => (
              <MenuItem key={country.id} value={country.id}>
                {country.name}
              </MenuItem>
            ))}
          </Select>

           {/* Status Text Field */}
           <Typography variant="body2" sx={{ fontWeight: 'bold', color: 'black' }}>
            Type Status<span style={{ color: 'red' }}>*</span>
          </Typography>
          <TextField
            fullWidth
            value={data.status || ''} // Default to an empty string if undefined
            onChange={(e) => {
              console.log('Input Value:', e.target.value); // Debugging
              onChange('status', e.target.value);
            }}
            placeholder="Enter status"
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

export default CustomEditDialog;
