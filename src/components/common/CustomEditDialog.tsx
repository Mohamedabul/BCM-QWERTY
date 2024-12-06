import React, { useEffect } from "react";
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
  SelectChangeEvent,
  OutlinedInput,
  Checkbox,
  ListItemText,
  ListSubheader,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CustomButton from "./CustomButton";
import {
  fetchCorecapability,
  fetchDomain,
  fetchSubdomain,
  getCountrys,
  getRegions,
  getStatuses,
} from "apis";
import { Capability, Domain, SubDomain } from "apis/interfaces";

interface CustomEditDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: any;
  sort: string;
  data: any;
  onChange: (field: string, value: string) => void;
}
// dummy

const CustomEditDialog: React.FC<CustomEditDialogProps> = ({
  open,
  onClose,
  onSave,
  data,
  onChange,
}) => {
  const [capabilities, setCapabilities] = React.useState<Capability[]>([]);
  const [selectedCapabilities, setSelectedCapabilities] = React.useState<any[]>(
    data.businessCapabilityName ? [data.businessCapabilityName] : []
  );
  const [selectedDomain, setSelectedDomain] = React.useState<any[]>(
    data.domain ? [data.domain] : []
  );
  const [selectedSubdomain, setSelectedSubdomain] = React.useState<any[]>(
    data.subDomain ? [data.subDomain] : []
  );
  const [domains, setDomains] = React.useState<any[]>([]);
  const [subDomains, setSubDomains] = React.useState<SubDomain[]>([]);
  const [selectedValues, setSelectedValues] = React.useState<any>({});
  //
  const [regions, setRegions] = React.useState<any[]>([]);
  const [countries, setCountries] = React.useState<any[]>([]);
  const [statuses, setStatuses] = React.useState<any[]>([]);
  const [selectedRegion, setSelectedRegion] = React.useState<any>(data.region);
  const [selectedCountry, setSelectedCountry] = React.useState<any>(data.country);
  const [selectedStatus, setSelectedStatus] = React.useState<any>(data.status);

  const [filteredDomains, setFilteredDomains] = React.useState<Domain[]>([]);
  const [filteredSubDomains, setFilteredSubDomains] = React.useState<
    SubDomain[]
  >([]);

  const handleChange = (event: SelectChangeEvent<any>) => {
    const {
      target: { value },
    } = event;
    setSelectedCapabilities(
      typeof value === "string" ? value.split(",") : value
    );
  };

  const handleChangeDomain = (event: SelectChangeEvent<any>) => {
    const {
      target: { value },
    } = event;
    setSelectedDomain(typeof value === "string" ? value.split(",") : value);
  };

  const handleChangeSubDomain = (event: SelectChangeEvent<any>) => {
    const {
      target: { value },
    } = event;
    setSelectedSubdomain(typeof value === "string" ? value.split(",") : value);
  };

  useEffect(() => {
    const fetchCapabilities = async () => {
      try {
        const sort = JSON.stringify({ name: "ASC" });
        const result = await fetchCorecapability(sort);
        // const sortedCapabilities = result.sort((a: { name: string; }, b: { name: any; }) => a.name.localeCompare(b.name));
        setCapabilities(result);
      } catch (error) {
        console.error("Error fetching capabilities:", error);
      }
    };
    const fetchDomains = async () => {
      try {
        const sort = JSON.stringify({ name: "ASC" });
        const domainResult = await fetchDomain(sort);
        // const sortedDomains = domainResult.sort((a: { name: string; }, b: { name: any; }) => a.name.localeCompare(b.name));
        setDomains(domainResult);
      } catch (error) {
        console.error("Error fetching domains:", error);
      }
    };

    const fetchSubDomains = async () => {
      try {
        const sort = JSON.stringify({ name: "ASC" });
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

    const fetchStatus = async () => {
      try {
        const statusResult = await getStatuses();
        if(!statusResult.includes(data.status)){
          statusResult.push(data.status)
        }
        setStatuses(statusResult);
        console.log("status result :",statusResult);
      } catch (error) {
        console.error("Error fetching status:", error);
      }
    };


    fetchCapabilities();
    fetchDomains();
    fetchSubDomains();
    //
    fetchRegions();
    fetchCountries();
    fetchStatus();
  }, []);

  useEffect(() => {
    const capabilityId = data.core_id;
    setFilteredDomains(
      domains.filter((domain) => domain.core_id === capabilityId)
    );

    // setFilteredDomains(filtered.sort((a, b) => a.name.localeCompare(b.name)));
  }, [data.core_id, domains]);

  useEffect(() => {
    const domainId = data.domain_id;
    // const filtered = subDomains.filter((subDomain) => subDomain.domain_id === domainId);
    setFilteredSubDomains(
      subDomains.filter((subDomain) => subDomain.domain_id === domainId)
    );
  }, [data.domain_id, subDomains]);

  const handleCheckboxToggleCap = (domainName: any) => {
    setSelectedCapabilities((prevSelected) => {
      if (prevSelected.includes(domainName)) {
        return prevSelected.filter((item) => item !== domainName);
      }
      return [...prevSelected, domainName];
    });
  };

  const handleCheckboxToggle = (domainName: any) => {
    setSelectedDomain((prevSelected) => {
      if (prevSelected.includes(domainName)) {
        return prevSelected.filter((item) => item !== domainName);
      }
      return [...prevSelected, domainName];
    });
  };

  const handleCheckboxToggleSub = (domainName: any) => {
    setSelectedSubdomain((prevSelected) => {
      if (prevSelected.includes(domainName)) {
        return prevSelected.filter((item) => item !== domainName);
      }
      return [...prevSelected, domainName];
    });
  };

  const formatAndSave = () => {
    console.log(
      selectedCapabilities,
      selectedDomain,
      selectedSubdomain,
      selectedRegion,
      selectedCountry,
      selectedStatus
    );
    const formattedData: any[] = [];

    const filteredCap = capabilities.filter((x) =>
      selectedCapabilities.includes(x.name)
    );

    filteredCap.forEach((cap) => {
      const filteredDomain = domains.filter(
        (x) => selectedDomain.includes(x.name) && x.core_id === cap.id
      );
      if (filteredDomain.length > 0) {
        filteredDomain.forEach((domainId) => {
          const filteredSubDomain = subDomains.filter(
            (x) =>
              selectedSubdomain.includes(x.name) && x.domain_id === domainId.id
          );
          if (filteredSubDomain.length > 0) {
            filteredSubDomain.forEach((subdomainId) => {
              formattedData.push({
                core_id: cap.id,
                domain_id: domainId.id,
                subdomain_id: subdomainId.id,
                region: selectedRegion,
                country: selectedCountry,
                status: selectedStatus,
              });
            });
          } else {
            formattedData.push({
              core_id: cap.id,
              domain_id: domainId.id,
              subdomain_id: null,
              region: selectedRegion,
              country: selectedCountry,
              status: selectedStatus,
            });
          }
        });
      } else {
        formattedData.push({
          core_id: cap.id,
          domain_id: null,
          subdomain_id: null,
          region: selectedRegion,
          country: selectedCountry,
          status: selectedStatus,
        });
      }
    });
    onSave(formattedData);

    // useEffect(() => {
    //   console.log("Initial data status:", data.status);
    // }, [data.status]);
   
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <Box
        sx={{
          backgroundColor: "white",
          color: "black",
          padding: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <DialogTitle margin={-2} sx={{ fontWeight: "bold", color: "black" }}>
          Change Mapping
        </DialogTitle>
        <IconButton onClick={onClose} sx={{ color: "black" }}>
          <CloseIcon />
        </IconButton>
      </Box>
      <DialogContent dividers sx={{ backgroundColor: "white", color: "black" }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Typography
            variant="body2"
            sx={{ fontWeight: "bold", color: "black" }}
          >
            Select Business Capability Name
            <span style={{ color: "red" }}>*</span>
          </Typography>
          <Select
            fullWidth
            value={selectedCapabilities}
            multiple
            onChange={handleChange}
            input={<OutlinedInput label="Tag" />}
            renderValue={(selected) => selected.filter(Boolean).join(",")}
            sx={{
              backgroundColor: "#f0f2f5",
              borderRadius: 1,
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "transparent" },
                "&.Mui-focused fieldset": { borderColor: "#b0bec5" },
              },
              "& .MuiInputBase-input": { color: "black" },
            }}
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: 300,
                  overflowY: "auto",
                },
              },
            }}
          >
            {/* Default "Select Business Capability" message when no selection */}
            {!data.businessCapabilityName && (
              <MenuItem value="" disabled>
                Select Business Capability
              </MenuItem>
            )}

            {/* Render each capability directly without any grouping */}
            {capabilities.map((capability) => (
              <MenuItem key={capability.id} value={capability.name}>
                <Checkbox
                  checked={selectedCapabilities.indexOf(capability.name) > -1}
                  onChange={() => handleCheckboxToggleCap(capability.name)}
                />
                {capability.name}
              </MenuItem>
            ))}
          </Select>

          <Typography
            variant="body2"
            sx={{ fontWeight: "bold", color: "black" }}
          >
            Select Domain Name<span style={{ color: "red" }}>*</span>
          </Typography>
          <Select
            fullWidth
            value={selectedDomain}
            onChange={handleChangeDomain}
            multiple
            input={<OutlinedInput label="Tag" />}
            renderValue={(selected) => selected.filter(Boolean).join(",")}
            disabled={!data.domain}
            sx={{
              backgroundColor: "#f0f2f5",
              borderRadius: 1,
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "transparent" },
                "&.Mui-focused fieldset": { borderColor: "#b0bec5" },
              },
              "& .MuiInputBase-input": { color: "black" },
            }}
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: 300,
                  overflowY: "auto",
                },
              },
            }}
          >
            {!data.domain && (
              <MenuItem value="" disabled>
                Select Domain
              </MenuItem>
            )}

            {selectedCapabilities.map((cap) => (
              <div key={cap}>
                <ListSubheader
                  sx={{ fontWeight: "bold", color: "black", fontSize: "20px" }}
                >
                  {cap}
                </ListSubheader>
                {domains
                  .filter(
                    (dmn) =>
                      dmn.core_id ===
                      capabilities.find((x) => x.name === cap)?.id
                  )
                  .map((filtDmn) => (
                    <MenuItem key={filtDmn.id} value={filtDmn.name}>
                      <Checkbox
                        checked={selectedDomain.indexOf(filtDmn.name) > -1}
                        onChange={() => handleCheckboxToggle(filtDmn.name)}
                      />
                      <ListItemText primary={filtDmn.name} />
                    </MenuItem>
                  ))}
              </div>
            ))}
          </Select>

          <Typography
            variant="body2"
            sx={{ fontWeight: "bold", color: "black" }}
          >
            Select Sub-domain Name<span style={{ color: "red" }}>*</span>
          </Typography>
          <Select
            fullWidth
            value={selectedSubdomain}
            onChange={handleChangeSubDomain}
            multiple
            input={<OutlinedInput label="Tag" />}
            renderValue={(selected) => selected.filter(Boolean).join(",")}
            disabled={!data.subDomain}
            sx={{
              backgroundColor: "#f0f2f5",
              borderRadius: 1,
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "transparent" },
                "&.Mui-focused fieldset": { borderColor: "#b0bec5" },
              },
              "& .MuiInputBase-input": { color: "black" },
            }}
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: 300,
                  overflowY: "auto",
                },
              },
            }}
          >
            {!data.subDomain && (
              <MenuItem value="" disabled>
                Select Sub-Domain
              </MenuItem>
            )}

            {selectedDomain.map((cap) => (
              <div key={cap}>
                <ListSubheader
                  sx={{ fontWeight: "bold", color: "black", fontSize: "20px" }}
                >
                  {cap}
                </ListSubheader>
                {subDomains
                  .filter(
                    (dmn) =>
                      dmn.domain_id === domains.find((x) => x.name === cap)?.id
                  )
                  .map((filtDmn) => (
                    <MenuItem key={filtDmn.id} value={filtDmn.name}>
                      <Checkbox
                        checked={selectedSubdomain.indexOf(filtDmn.name) > -1}
                        onChange={() => handleCheckboxToggleSub(filtDmn.name)}
                      />
                      <ListItemText primary={filtDmn.name} />
                    </MenuItem>
                  ))}
              </div>
            ))}
          </Select>

          {/* Region Select */}
          <Typography
            variant="body2"
            sx={{ fontWeight: "bold", color: "black" }}
          >
            Select Region<span style={{ color: "red" }}>*</span>
          </Typography>
          <Select
            fullWidth
            value={selectedRegion}
            onChange={(e) => {
              setSelectedRegion(e.target.value);
              onChange("region", e.target.value as string);
            }}
            displayEmpty
            sx={{
              backgroundColor: "#f0f2f5",
              borderRadius: 1,
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "transparent" },
                "&.Mui-focused fieldset": { borderColor: "#b0bec5" },
              },
              "& .MuiInputBase-input": { color: "black" },
            }}
          >
            {!data.region && (
              <MenuItem value="" disabled>
                Select Region
              </MenuItem>
            )}
            {regions.map((region) => (
              <MenuItem key={region.id} value={region.name}>
                {region.name}
              </MenuItem>
            ))}
          </Select>

          {/* Country Select */}
          <Typography
            variant="body2"
            sx={{ fontWeight: "bold", color: "black" }}
          >
            Select Country<span style={{ color: "red" }}>*</span>
          </Typography>
          <Select
            fullWidth
            value={selectedCountry}
            onChange={(e) => {
              setSelectedCountry(e.target.value);
              onChange("country", e.target.value as string);
            }}
            displayEmpty
            sx={{
              backgroundColor: "#f0f2f5",
              borderRadius: 1,
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "transparent" },
                "&.Mui-focused fieldset": { borderColor: "#b0bec5" },
              },
              "& .MuiInputBase-input": { color: "black" },
            }}
          >
            <MenuItem value="" disabled>
              Select Country
            </MenuItem>
            {countries.map((country) => (
              <MenuItem key={country.id} value={country.name}>
                {country.name}
              </MenuItem>
            ))}
          </Select>

          {/* Status Text Field */}
          <Typography
            variant="body2"
            sx={{ fontWeight: "bold", color: "black" }}
          >
            Select Application Status<span style={{ color: "red" }}>*</span>
          </Typography>
          <Select
            fullWidth
            value={selectedStatus}
            onChange={(e) => {
              setSelectedStatus(e.target.value);
              onChange("status", e.target.value);
            }}
            displayEmpty
            sx={{
              backgroundColor: "#f0f2f5",
              borderRadius: 1,
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "transparent" },
                "&.Mui-focused fieldset": { borderColor: "#b0bec5" },
              },
              "& .MuiInputBase-input": { color: "black" },
            }}
          >
            {statuses.map((status, index) => (
              <MenuItem key={index} value={status}>
                {status}
              </MenuItem>
            ))}
          </Select>
          {/* <TextField
            fullWidth
            value={selectedStatus || ""} // Default to an empty string if undefined
            onChange={(e) => {
              setSelectedStatus(e.target.value);
              onChange("status", e.target.value);
            }}
            placeholder="Enter status"
            sx={{
              backgroundColor: "#f0f2f5",
              borderRadius: 1,
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "transparent" },
                "&.Mui-focused fieldset": { borderColor: "#b0bec5" },
              },
              "& .MuiInputBase-input": { color: "black" },
            }}
          /> */}
        </Box>
      </DialogContent>
      <DialogActions
        sx={{
          backgroundColor: "white",
          padding: "16px",
          justifyContent: "space-between",
        }}
      >
        <CustomButton
          title="Cancel"
          backgroundColor="white"
          color="black"
          handleClick={onClose}
          sx={{
            color: "#1D1F20",
            borderColor: "#ccc",
            padding: "8px 16px",
            fontWeight: "bold",
            textTransform: "none",
            borderRadius: "8px",
            width: "45%",
          }}
        />
        <CustomButton
          title="Save"
          backgroundColor="#1976d2"
          color="white"
          handleClick={formatAndSave}
          sx={{
            backgroundColor: "#1976d2",
            color: "white",
            padding: "8px 16px",
            fontWeight: "bold",
            textTransform: "none",
            borderRadius: "8px",
            width: "45%",
            "&:hover": {
              backgroundColor: "#155ab0",
            },
          }}
        />
      </DialogActions>
    </Dialog>
  );
};

export default CustomEditDialog;
