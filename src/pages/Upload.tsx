import React, { useRef } from 'react';
import {
  Box,
  Button,
  Typography,
  Divider,
} from '@mui/material';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { CustomButton } from 'components';
import { IResourceComponentsProps } from '@refinedev/core';

interface UploadProps extends IResourceComponentsProps<any, any> {}

const Upload: React.FC<UploadProps> = () => {
const fileInputRef = useRef<HTMLInputElement>(null); 
const [file, setFile] = React.useState<File | null>(null);

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
  
  const handleUploadClick = () => {
    
    console.log('Upload clicked');
  };

  const handleClose = () => {
    setFile(null);
  }
  const handleDownloadTemplate = () => {
    
    console.log('Download template clicked');
  };
  

  return (
    <Box sx={{ padding: 4,
        width: '600px',
        height: '450px',
        margin: 'auto',
        backgroundColor: '#f4efef',
        color: 'black',
        borderRadius: '10px',
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)'
     }}>
        <Box padding={0} sx={{
          padding:2,
          backgroundColor: '#e9e2e2', 
          borderRadius: '8px 8px 0 0',
          marginLeft: '-32px',
          marginRight: '-32px',
          marginTop: '-32px',
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
      <Box sx={{ marginTop: 3, display: 'flex', justifyContent: 'flex-end',backgroundColor: '#e9e2e2', 
          borderRadius: '0 0 8px 8px',
          marginLeft: '-32px',
          marginRight: '-32px',
          padding: 1 }}>
        <CustomButton
        variant="outlined"
        handleClick={handleClose}
        title='Cancel' backgroundColor={''}
        color={'black'} />
           
        
        <CustomButton
         handleClick={handleUploadClick} 
         variant="contained"  
         title='Upload' 
         backgroundColor={'blue'} 
         color={'white'} 
         />
        
      </Box>
    </Box>
  );
};

export default Upload;