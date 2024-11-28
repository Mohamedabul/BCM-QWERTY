import React, {useEffect, useState } from "react";
import CapabilityCard from "./capability/card-capability";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import {  fetchTemplateCorecapability } from "apis";

const Template = () => {
    // State to manage visibility of AllCapabilities
    const [cabablityList, setCapabilityList] = useState<any[]>([]);
    const [showCapabilities, setShowCapabilities] = useState(false);

    const fetchCapabilities = async () => {
        try {
          const data =  await fetchTemplateCorecapability();
          setCapabilityList(data);
        } catch (error) {
          console.error("Error fetching capabilities:", error);
        }
      };

      useEffect(() => {
        fetchCapabilities();
      }, []);

    return (
        <Box className="template-container" sx={{ flexGrow: 1 }}>  
            
                <Box className="template-dropdown" >
                <Grid container spacing={2}>
        {cabablityList.map((cabablity) => (
          <CapabilityCard
            // isEditable={isEditable}
            key={cabablity.id}
            name={cabablity.name}
            id={cabablity.id}
            onUpdate={fetchCapabilities}
            
            fetchCabability={fetchCapabilities}
            // isEdited={cabablity.is_edited}
            
          />
        ))}
      </Grid>
                </Box>
           
        </Box>
    );
};

export default Template;
