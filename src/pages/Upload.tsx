import React, { useRef, useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  Divider,
  AppBar,
  Tabs,
  Tab,
  CircularProgress,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ReplayIcon from "@mui/icons-material/Replay";
import CloseIcon from "@mui/icons-material/Close";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { CustomButton } from "components";
import { IResourceComponentsProps } from "@refinedev/core";
import CustomDialog from "components/common/CustomDialog";
import CustomTable from "components/common/CustomTable";
import CustomAddDialog from "components/common/CustomAddDialog";
import { callRemap, createApplication, getMappedApplications, getOrphans, uploadFile } from "apis";

interface UploadProps extends IResourceComponentsProps<any, any> {}

const Upload: React.FC<UploadProps> = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = React.useState<File | null>(null);
  const [open, setOpen] = React.useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [applications, setApplications] = React.useState([]);
  const [mappedApplications, setMappedApplications] = React.useState([]);
  const [orphans, setOrphans] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [showImportButton, setShowImportButton] = React.useState(true);
  const [selectedTab, setSelectedTab] = React.useState(0);
  const [openAddDialog, setOpenAddDialog] = React.useState(false);
  const [mappedData, setMappedData] = React.useState([]);
  const [orphanData, setOrphanData] = React.useState([]);
  const [data, setData] = React.useState({
    businessCapabilityName: "",
  domain: "",
  subDomain: "",
  applicationName: "",
  core_id: "",
  domain_id: "",
  subdomain_id: "",
  name: "",
  });
  const [businessCapabilities, setBusinessCapabilities] = React.useState<
    string[]
  >([]);
  const [domains, setDomains] = React.useState<string[]>([]);
  const [subDomains, setSubDomains] = React.useState<string[]>([]);
  const [filteredDomains, setFilteredDomains] = React.useState<any[]>([]);
  const [filteredSubDomains, setFilteredSubDomains] = React.useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [orphanPage, setOrphanPage] = useState(1);//new
  const [totalCount, setTotalCount] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  useEffect(() => {
    if (selectedTab === 0) {
      fetchMappedApplications();
    } else if (selectedTab === 1) {
      fetchOrphans();
    }
  }, [selectedTab, page, orphanPage, pageSize]);//orphanPage

  const fetchMappedApplications = async () => {
    setLoading(true);
    try {
      const params:any = {page: page, limit: pageSize};
      const queryString = new URLSearchParams(params).toString();
      const result = await getMappedApplications(queryString);
      console.log("Result:", result);
      const { totalCount } = result;
      setTotalCount(totalCount);
      const mappedData = result.response.map((item: any) => ({
        // const mappedData = result.response
        // .filter((item: any) => item.capability) 
        // .map((item: any) => ({
        id: item.software_id,
        businessCapabilityName: item.capability,
        domain: item.domain !== "-" ? item.domain : "-",
        subDomain: item.subdomain !== "-" ? item.subdomain : "-",
        applicationName: item.software_name,
        region: item.region,
        country: item.country,
        status: item.status,
      }));
      setMappedData(mappedData);
      // if(mappedData.length === 0){
      //   openUpload();
      //   setSelectedTab(-1);
      // }
    } catch (error) {
      console.error("Error fetching mapped applications:", error);
      alert("Failed to fetch mapped applications. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const fetchOrphans = async () => {
    setLoading(true);
    try {
      const params:any = {page: orphanPage, limit: pageSize};//orphanpage
      const queryString = new URLSearchParams(params).toString();
      const result = await getOrphans(queryString);
      const { totalCount } = result;
      setTotalCount(totalCount);
      const orphanData = result.response.map((item: any) => ({
        // const orphanData = result.response
        // .filter((item: any) => !item.capability) 
        // .map((item: any) => ({
          id: item.software_id,
          businessCapabilityName: item.capability !== "-" ? item.capability : "-",
          domain: item.domain !== "-" ? item.domain : "-",
          subDomain: item.subdomain !== "-" ? item.subdomain : "-",
          applicationName: item.software_name,
      }));
      setOrphanData(orphanData);
    } catch (error) {
      console.error("Error fetching orphans:", error);
      alert("Failed to fetch orphans. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleFileAreaClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (event.target.files && event.target.files.length > 0) {
        const selectedFile = event.target.files[0];

        if (
          selectedFile.type === "text/csv/xls" ||
          selectedFile.type ===
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
          selectedFile.type === "application/vnd.ms-excel"
        ) {
          const maxFileSize = 10 * 1024 * 1024;
          if (selectedFile.size > maxFileSize) {
            alert("File size exceeds the limit of 10MB.");
            setFile(null);
          } else {
            setFile(selectedFile);
            console.log("File selected:", selectedFile.name);
          }
        } else {
          alert("Please upload a CSV or Excel file.");
          setFile(null);
        }
      }
    } catch (error) {
      console.error("Error during file upload:", error);
      alert(
        "An error occurred during file upload. Please try again or upload a different file."
      );
      setFile(null);
    }
  };

  const handleRemap = async () => {
    setOpenDialog(true);
    setLoading(true);
    try{
      const data = await callRemap();
      setApplications(data.applications);
      setMappedApplications(data.mappedAppliactions);
      setOrphans(data.orphans);
    }finally{
      setLoading(false);
    }
  }

  const handleUploadClick = async () => {
    if (!file) {
      alert("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    setOpen(false);
    setShowImportButton(true);
    setOpenDialog(true);
    setLoading(true);
    try {
      // const apiUrl = process.env.React_APP_API_URL;
      // console.log(apiUrl);
      const data = await uploadFile(formData);
      setFile(null);
      setApplications(data.applications);
      setMappedApplications(data.mappedAppliactions);
      setOrphans(data.orphans);

      console.log("file upload successfully:", data.fileUrl);

      // alert("File uploaded successfully");
    } catch (error) {
      setShowImportButton(true);
      setOpen(false);
      console.error("Error during file upload:", error);
      alert(
        "An error occurred during file upload. Please try again or upload a different file."
      );
      setFile(null);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFile(null);
    setOpen(false);
    setShowImportButton(true);
  };
  const handleDialogClose = () => {
    setFile(null);
    setOpenDialog(false);
    setSelectedTab(0);
    console.log("Dialog closed");
  };
  const handleDownloadTemplate = () => {
    const link = document.createElement("a");
    link.href = "/example_app_inventory.xlsx";
    link.download = "example_app_inventory.xlsx";
    link.click();
  };
  const openUpload = () => {
    setShowImportButton(false);
    setOpen(true);
    // setOpenDialog(true);
  };
  const handleAddNew = () => {
    setOpenAddDialog(true);
  };
  const handleAddDialogClose = () => {
    setOpenAddDialog(false);
  };
  const handleSave = async () => {
    try {
      const payload = {
        core_id: data.businessCapabilityName,
        domain_id: data.domain,
        subdomain_id: data.subDomain,
        name: data.applicationName,
      };
      
      const result = await createApplication(JSON.stringify(data));
      console.log("New item added successfully:", result);

      setData({
        businessCapabilityName: "",
      domain: "",
      subDomain: "",
      applicationName: "",
      core_id: "",
      domain_id: "",
      subdomain_id: "",
      name: "",
      });
      setOpenAddDialog(false);
      await fetchMappedApplications();
    } catch (error) {
      console.error("Error adding new item:", error);
      alert("An error occurred while adding the new item. Please try again.");
    }
  };
  const handleInputChange = (field: string, value: string) => {
    setData((prevData) => {
      const updatedData = { ...prevData, [field]: value };
  
      if (field === "businessCapabilityName") {
        updatedData.core_id = value; // Map businessCapabilityName to core_id
      } else if (field === "domain") {
        updatedData.domain_id = value; // Map domain to domain_id
      } else if (field === "subDomain") {
        updatedData.subdomain_id = value; // Map subDomain to subdomain_id
      } else if (field === "applicationName") {
        updatedData.name = value; // Map applicationName to name
      }
  
      return updatedData;
    });
  };

  return (
    <Box className="container">
      <AppBar
        position="static"
        color="default"
        sx={{ boxShadow: "none", backgroundColor: "white", borderRadius: 1 }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: 1,
            borderRadius: "50%",
          }}
        >
          {/* Tabs for Mapping and Orphan */}
          {selectedTab !== -1 && <Tabs
            value={selectedTab}
            onChange={handleTabChange}
            aria-label="Upload Tabs"
          >
            <Tab
              label="Mapping"
              sx={{ fontWeight: "bold", fontSize: "16px", color: "black" }}
            />
            <Tab
              label="Orphan"
              sx={{ fontWeight: "bold", fontSize: "16px", color: "black" }}
            />
          </Tabs>}

          {/* Import File Button */}
          <Box sx={{ display: "flex", gap: 2 }}>
          {showImportButton && selectedTab === 0 && (
            <CustomButton
              title="Import File"
              backgroundColor="black"
              color="white"
              handleClick={() => {
                openUpload();
                setSelectedTab(-1);
              }}
              variant="contained"
              icon={<AddIcon />}
              sx={{ borderRadius: "10px", margin: 0 }}
            />)}
            {selectedTab === 0 && (
              <CustomButton
                title="Add New"
                backgroundColor="blue"
                color="white"
                handleClick={handleAddNew}
                variant="contained"
                icon={<AddIcon />}
                sx={{ borderRadius: "10px", margin: 0 }}
              />
          )}
          {selectedTab === 1 && (
              <CustomButton
                title="Re-map"
                backgroundColor="blue"
                color="white"
                handleClick={handleRemap}
                variant="contained"
                icon={<ReplayIcon />}
                sx={{ borderRadius: "10px", margin: 0 }}
              />
          )}
          </Box>
        </Box>
      </AppBar>
      {selectedTab === 0 && (
        <Box
          sx={{
            padding: 3,
            mt: 2,
            backgroundColor: "white",
            overflow: "auto",
            color: "black",
            borderRadius: 1,
            boxShadow: 2,
          }}
        >
          <CustomTable
            data={mappedData}
            loading={loading}
            page={page}
            setPage={setPage}
            totalCount={totalCount}
            setTotalCount={setTotalCount}
            pageSize={pageSize}
            setPageSize={setPageSize}
            editCallback={fetchMappedApplications}
          />
        </Box>
      )}
      <CustomAddDialog
        open={openAddDialog}
        onClose={handleAddDialogClose}
        onSave={handleSave}
        data={data}
        onChange={handleInputChange}
        // options={{
        //   businessCapabilities: businessCapabilities.map((capability) => ({
        //     id: capability,
        //     name: capability,
        //   })),
        //   domains: filteredDomains,
        //   subDomains: filteredSubDomains,
        // }}
      />
      {selectedTab === 1 && (
        <Box
          sx={{
            padding: 1.5,
            mt: 2,
            backgroundColor: "white",
            overflow: "auto",
            color: "black",
            borderRadius: 1,
            boxShadow: 2,
          }}
        >
          <CustomTable
            data={orphanData}
            loading={loading}
            // actionButton={
            //   <CustomButton
            //     title="Remap"
            //     handleClick={handleRemap}
            //     backgroundColor="blue"
            //     color="white"
            //     variant="contained"
            //     icon={<ReplayIcon />}
            //     sx={{ borderRadius: "10px" }}
            //   />
            // }
            page={orphanPage}//orphanpage
            setPage={setOrphanPage}//setOrphaPage
            totalCount={totalCount}
            setTotalCount={setTotalCount}
            pageSize={pageSize}
            setPageSize={setPageSize}
            editCallback={fetchOrphans}
          />
        </Box>
      )}
      {open && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              padding: 2,
              width: "600px",
              // height: '470px',
              margin: "auto",
              // marginTop: '10px',
              backgroundColor: "#f4efef",
              overflow: "auto", //1
              color: "black",
              borderRadius: "10px",
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box
              padding={0}
              sx={{
                padding: "19px",
                backgroundColor: "#e9e2e2",
                borderRadius: "8px 8px 0 0",
                marginLeft: "-14px",
                marginRight: "-14px",
                marginTop: "-26px",
              }}
            >
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                File Upload
              </Typography>
            </Box>
            <Box
              onClick={handleFileAreaClick}
              sx={{
                border: "2px dashed #ccc",
                borderRadius: "8px",
                padding: 3,
                textAlign: "center",
                color: "#777",
                cursor: "pointer",
                position: "relative",
                width: "80%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                margin: "auto",
                marginTop: 2,
                backgroundColor: "white",
              }}
            >
              {file ? (
                <>
                  <CheckCircleOutlineIcon fontSize="large" color="success" />
                  <Typography variant="body1" color="black" sx={{ mt: 1 }}>
                    {file.name} uploaded successfully
                  </Typography>
                </>
              ) : (
                <>
                  <CloudUploadOutlinedIcon fontSize="large" />
                  <Typography variant="body1" color="black">
                    Click or drag file to this area to upload
                  </Typography>
                </>
              )}
              <input
                type="file"
                accept=".csv, .xlsx, .xls"
                onChange={handleFileChange}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  opacity: 0,
                  cursor: "pointer",
                }}
              />
            </Box>
            <Box sx={{ textAlign: "left", mt: 2, ml: 7, width: "80%" }}>
              <Typography variant="body2" color="#A9A9A9" textAlign="left">
                Formats accepted are .csv and .xlsx or .xls
              </Typography>
              <Divider sx={{ borderColor: "#ccc", my: 2 }} />
              <Typography
                variant="body2"
                color="#696969"
                textAlign="left"
                sx={{ marginBottom: 1 }}
              >
                If you do not have a file you can use the sample below:
              </Typography>
              <Button
                variant="contained"
                startIcon={<DescriptionOutlinedIcon color="success" />}
                onClick={handleDownloadTemplate}
                sx={{
                  backgroundColor: "white",
                  mt: 1,
                  color: "#808080",
                  boxShadow: "none",
                  border: "1px solid #ccc",
                  textTransform: "none",
                  "&:hover": {
                    backgroundColor: "#b2ebf2",
                  },
                }}
              >
                Download Sample Template
              </Button>
            </Box>
            <Box
              sx={{
                marginTop: 1,
                gap: 2,
                display: "flex",
                justifyContent: "flex-end",
                backgroundColor: "#e9e2e2",
                borderRadius: "0 0 8px 8px",
                marginLeft: "-16px",
                marginRight: "-16px",
                padding: "6px",
              }}
            >
              <CustomButton
                variant="outlined"
                handleClick={() => {
                  handleClose();
                  setSelectedTab(0);
                }}
                title="Cancel"
                backgroundColor={"transparent"}
                color={"black"}
                sx={{
                  border: "1px solid lightgray",
                  "&:hover": {
                    backgroundColor: "black",
                    color: "white",
                    opacity: 0.8,
                  },
                }}
              />

              <CustomButton
                handleClick={handleUploadClick}
                variant="contained"
                title="Upload"
                backgroundColor={"blue"}
                color={"white"}
              />
            </Box>
          </Box>
        </div>
      )}
      <CustomDialog
        open={openDialog}
        onClose={handleDialogClose}
        loading={loading}
        applications={applications}
        mappedApplications={mappedApplications}
        orphans={orphans}
        selectedTab={selectedTab}
      />
    </Box>
  );
};

export default Upload;
