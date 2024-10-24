import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
  } from "@mui/material";
import { useEffect } from "react";
  
  function SubDomainCard() {
    useEffect(() => {
        console.log("calling sub domain list")
      }, []);
    return (
      <Typography>
        Here you can add details about the capability. This can include
        descriptions, features, or any relevant information.
      </Typography>
    );
  }
  
  export default SubDomainCard;
  