import { useState } from "react";
import { handleChange } from "utils/helperFunctions";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import accordionHelper from "utils/accordionHelper";
import SubDomainCard from "pages/sub-domain/card-sub-domain";
import { ShimmerBox } from "utils/ShimmerBox";

const DomainCard = (props: any) => {
  const [subDomainList, setSubDomainList] = useState<any>([]);

  const handleExpand = async () => {
    const resp = await fetch(process.env.REACT_APP_API_URL+"subdomain");
    const data = await resp.json();
    setSubDomainList(data);
  };

  return (
    <Accordion
      sx={{
        height: "100%",
        backgroundColor: "white",
        boxShadow: "none",
        color: "black",
        padding: 0,
        borderRadius: "8px"
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
          backgroundColor: "#f0f0f0",
          height: "100%",
          borderRadius: "8px"
        }}
      >
        <Typography sx={{ textAlign: "center", width: "100%" }}>
          {props.name}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        {subDomainList.length === 0 ? (
          <>
            <ShimmerBox sx={{ height: "100px" }} />
            <ShimmerBox sx={{ height: "100px" }} />
            <ShimmerBox sx={{ height: "100px" }} />
          </>
        ) : (
          subDomainList.map((subDomain: any, index: any) => (
            <>
              <SubDomainCard key={subDomain.id} name={subDomain.name} />
              {index < subDomainList.length - 1 && (
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
      </AccordionDetails>
    </Accordion>
  );
};

export default DomainCard;
