import { useMemo, useState } from "react";
import { getRandomColor, handleChange } from "utils/helperFunctions";
import DomainCard from "pages/domain/card-domain";

import {
  Accordion,
  Box,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Grid,
} from "@mui/material";
import GridItem from "utils/GridItem";
import { ShimmerBox } from "utils/ShimmerBox";

const CapabilityCard = (props: any) => {
  const [domainList, setDomainList] = useState<any>([]);
  const bgColor = useMemo(() => getRandomColor(), []);

  const handleExpand = async () => {
    const resp = await fetch("http://localhost:5000/api/domain");
    const data = await resp.json();
    setDomainList(data);
  };

  return (
    <Grid item xs={3}>
      <GridItem sx={{ backgroundColor: bgColor }}>
        <Accordion
          sx={{
            height: "100%",
            backgroundColor: bgColor,
            boxShadow: "none",
          }}
          onChange={handleChange(handleExpand)}
        >
          <AccordionSummary
            expandIcon={null}
            aria-controls="panel1a-content"
            id="panel1a-header"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <Typography
              sx={{ textAlign: "center", width: "100%", fontWeight: "bold" }}
            >
              {props.name}
            </Typography>
          </AccordionSummary>
          <AccordionDetails
            sx={{
              padding: 0,
              margin: 0,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Box
              sx={{
                maxWidth: "200px",
                width: "100%",
                textAlign: "center",
                padding: "10px 0",
              }}
            >
              {domainList.length === 0 ? (
                <>
                  <ShimmerBox sx={{ height: "100px" }} />
                  <ShimmerBox sx={{ height: "100px" }} />
                  <ShimmerBox sx={{ height: "100px" }} />
                </>
              ) : (
                domainList.map((domain: any, index: any) => (
                  <>
                    <DomainCard key={domain.id} name={domain.name} />
                    {index < domainList.length - 1 && (
                      <hr
                        style={{
                          border: "0",
                          height: "1px",
                          background: "black",
                        }}
                      />
                    )}
                  </>
                ))
              )}
            </Box>
          </AccordionDetails>
        </Accordion>
      </GridItem>
    </Grid>
  );
};

export default CapabilityCard;
