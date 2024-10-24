import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import GridItem from "utils/GridItem";
import CapabilityCard from "./card-capability";

function AllCapabilities() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <GridItem sx={{ backgroundColor: "red" }}>
            <CapabilityCard />
          </GridItem>
        </Grid>
        <Grid item xs={3}>
          <GridItem sx={{ backgroundColor: "red" }}>
            <CapabilityCard />
          </GridItem>
        </Grid>
        <Grid item xs={3}>
          <GridItem sx={{ backgroundColor: "red" }}>
            <CapabilityCard />
          </GridItem>
        </Grid>
        <Grid item xs={3}>
          <GridItem sx={{ backgroundColor: "red" }}>
            <CapabilityCard />
          </GridItem>
        </Grid>
        <Grid item xs={3}>
          <GridItem sx={{ backgroundColor: "red" }}>
            <CapabilityCard />
          </GridItem>
        </Grid>
        <Grid item xs={3}>
          <GridItem sx={{ backgroundColor: "red" }}>
            <CapabilityCard />
          </GridItem>
        </Grid>
        <Grid item xs={3}>
          <GridItem sx={{ backgroundColor: "red" }}>
            <CapabilityCard />
          </GridItem>
        </Grid>
        <Grid item xs={3}>
          <GridItem sx={{ backgroundColor: "red" }}>
            <CapabilityCard />
          </GridItem>
        </Grid>
      </Grid>
    </Box>
  );
}

export default AllCapabilities;
