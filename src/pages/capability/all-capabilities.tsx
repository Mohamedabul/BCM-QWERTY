import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import GridItem from "utils/GridItem";
import CapabilityCard from "./card-capability";
import { useEffect, useState } from "react";


function AllCapabilities() {
  const [cabablityList, setCapabilityList] = useState<any[]>([]);

  const fetchCabability = async () => {
    const resp = await fetch(process.env.REACT_APP_API_URL+"coreCapability");
    const data = await resp.json();
    setCapabilityList(data);
  }
  useEffect(() => {
    fetchCabability();
  },[]);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        {cabablityList.map((cabablity) => <CapabilityCard key={cabablity.id} name={cabablity.name}/>)}
      </Grid>
    </Box>
  );
}

export default AllCapabilities;
