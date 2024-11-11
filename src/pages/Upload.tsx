import React, { useRef } from 'react';
import {
  Box,
  Button,
  Typography,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  CircularProgress
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { CustomButton } from 'components';
import { IResourceComponentsProps } from '@refinedev/core';

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

  const handleFileAreaClick = () => {
    if (fileInputRef.current) {
        fileInputRef.current.click();
  }
}
const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (event.target.files && event.target.files.length > 0) {
        const selectedFile = event.target.files[0];
        
        
        if (selectedFile.type === "text/csv/xls" || selectedFile.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"|| selectedFile.type === "application/vnd.ms-excel") {
          
          
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
      alert("An error occurred during file upload. Please try again or upload a different file.");
      setFile(null);
    }
  };
  
  const handleUploadClick = async () => {
    if (!file){
      alert("Please select a file to upload.");
      return;
    }
   
    const formData = new FormData();
    formData.append("file", file);
    setOpenDialog(true);
    setLoading(true);
    try{
      // const apiUrl = process.env.React_APP_API_URL;
      // console.log(apiUrl);
      const response = await fetch('http://localhost:5000/api/upload', {
        method: "POST",
        body: formData,
      });
      if (! response.ok) {
        throw new Error("file upload failed");
    }
    const data = await response.json();
    setFile(null);
    setApplications(data.applications);
    setMappedApplications(data.mappedAppliactions);
    setOrphans(data.orphans);

    console.log('file upload successfully:', data.fileUrl);
   
    
    
    // alert("File uploaded successfully");
  }
  
  catch (error) {
    setShowImportButton(true);
    setOpen(false);
    console.error("Error during file upload:", error);
    alert("An error occurred during file upload. Please try again or upload a different file.");
    setFile(null);
  }finally {
    setLoading(false);
  }
  
  
  };

  const handleClose = () => {
    setFile(null);
    setOpen(false);
    setShowImportButton(true);
  }
  const handleDialogClose = () => {
    setFile(null);
    setOpenDialog(false);
    console.log("Dialog closed");
    
  }
  const handleDownloadTemplate = () => {
    const link = document.createElement('a');
  link.href = '/example_app_inventory.xlsx'; 
  link.download = 'example_app_inventory.xlsx';
  link.click();
  }
  const openUpload = () => {
  setShowImportButton(false);
  setOpen(true);
  // setOpenDialog(true);
  
  }
  const fixOrphan = () => {}

  return (
    <Box className="container">
       {showImportButton && (
        <Box className="button-container">
          <CustomButton
            title="Import File"
            backgroundColor="blue"
            color="white"
            handleClick={openUpload}
            variant="contained"
            icon={<AddIcon />}
          />
        </Box>
      )}

     {open && (   
     <Box sx={{ padding: 2,
        width: '600px',
        // height: '470px',
        margin: 'auto',
        // marginTop: '10px',
        backgroundColor: '#f4efef',
        overflow: 'auto', //1
        color: 'black',
        borderRadius: '10px',
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'column',
     }}
    >
        <Box padding={0} sx={{
          padding:'19px',
          backgroundColor: '#e9e2e2', 
          borderRadius: '8px 8px 0 0',
          marginLeft: '-14px',
          marginRight: '-14px',
          marginTop: '-26px',
        }}>
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        File Upload
      </Typography>
      </Box>
      <Box
        onClick={handleFileAreaClick}
        sx={{
          border: '2px dashed #ccc',
          borderRadius: '8px',
          padding: 3,
          textAlign: 'center',
          color: '#777',
          cursor: 'pointer',
          position: 'relative',
          width: '80%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          margin: 'auto',
          marginTop: 2,
          backgroundColor: 'white',
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
        <CloudUploadOutlinedIcon fontSize="large"  />
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
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            opacity: 0,
            cursor: 'pointer'
          }}
        />
        </Box>
        <Box sx={{ textAlign: 'left', mt:2,ml:7 ,width:'80%' }}> 
      <Typography variant="body2" color="#A9A9A9" textAlign="left">
        Formats accepted are .csv and .xlsx or .xls
      </Typography>
      <Divider sx={{  borderColor: '#ccc', my: 2 }} />
      <Typography variant="body2" color="#696969" textAlign="left" sx={{ marginBottom: 1 }}>
        If you do not have a file you can use the sample below:
      </Typography>
      <Button
        variant="contained"
        startIcon={<DescriptionOutlinedIcon color='success'/>}
        onClick={handleDownloadTemplate}
        sx={{
          backgroundColor: 'white',
          mt: 1,
          color: '#808080',
          boxShadow: 'none',
          border: '1px solid #ccc',
          textTransform: 'none',
          '&:hover': {
            backgroundColor: '#b2ebf2',
          },
        }}
      >
        Download Sample Template
      </Button>
      </Box>
      <Box sx={{ marginTop: 1,gap: 2, display: 'flex', justifyContent: 'flex-end',backgroundColor: '#e9e2e2', 
          borderRadius: '0 0 8px 8px',
          marginLeft: '-16px',
          marginRight: '-16px',
          padding: '6px' }}>
        <CustomButton
        variant="outlined"
        handleClick={handleClose}
        title='Cancel' backgroundColor={'transparent'}
        color={'black'} 
        sx={{
          border: '1px solid lightgray',
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
         title='Upload' 
         backgroundColor={'blue'} 
         color={'white'} 
         />
        
      </Box>
    </Box>
     )}
      
    <Dialog  PaperProps={{
    className: "dialog-paper",
  }} open={openDialog} onClose={handleDialogClose}>
      <DialogTitle className="dialog-title">
        Upload Status 
        <IconButton
          aria-label="close"
          onClick={handleDialogClose}
          className="close-button"
        >
          <CloseIcon  />
        </IconButton>
      </DialogTitle>
      <DialogContent className="dialog-content">
      {loading ? (
            <Box display="flex" justifyContent="center" alignItems="center" p={2}>
              <CircularProgress />
              <Typography variant="body1" sx={{ ml: 2, color: "black" }}>
                Loading...
              </Typography>
            </Box>
          ) : (
            <>
      <div className="dialog-row">
      <Typography className="dialog-typography">Application</Typography>
      <span className="dialog-value">{applications}</span>
    </div>
    <div className="dialog-row">
      <Typography className="dialog-typography"> Applications Mapped</Typography>
      <span className="dialog-value">{mappedApplications}</span>
    </div>
    <div className="dialog-row">
      <Typography className="dialog-typography">Application under Orphan</Typography>
      <span className="dialog-value">{orphans}</span>
    </div>
    </>
    )}
      </DialogContent>
      {/* <DialogActions className="dialog-actions"> */}
          {/* <Divider sx={{ flexGrow: 2, borderColor: "black", mt: 1, mb: 1 }} /> */}
          {/* <IconButton onClick={handleDialogClose} aria-label="close" sx={{ color: 'black' }}>
            <CloseIcon />
          </IconButton> */}
        {/* </DialogActions> */}
    </Dialog>
    </Box>
  );

};

export default Upload;