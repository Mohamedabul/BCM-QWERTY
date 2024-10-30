import { useState } from "react";
import { handleChange } from "utils/helperFunctions";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box
} from "@mui/material";
import SubDomainCardWithMenu from "pages/sub-domain/subdomaincardwithmenu";
import { ShimmerBox } from "utils/ShimmerBox";
import { objectToQueryString } from "components/common/helper";

const DomainCard = (props: any) => {
  const [subDomainList, setSubDomainList] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleExpand = async () => {
    setLoading(true);
    const params = {domain_id: props.id};
    const queryString = objectToQueryString(params);
    const resp = await fetch(process.env.REACT_APP_API_URL+`subdomainBydomain?${queryString}`);
    const data = await resp.json();
    setSubDomainList(data);
    setLoading(false);
  };

  return (
    <Accordion
      sx={{
        height: "100%",
        backgroundColor: "white",
        boxShadow: "none",
        color: "black",
        padding: 0,
        borderRadius: "8px",
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
        <Typography sx={{ textAlign: "center", width: "100%", fontWeight: "bold" }}>
          {props.name}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        {loading ? (
          <>
            <ShimmerBox sx={{ height: "100px" }} />
            <ShimmerBox sx={{ height: "100px" }} />
            <ShimmerBox sx={{ height: "100px" }} />
          </>
        ) : (
          subDomainList.map((subDomain: any, index: any) => (
            <Box key={subDomain.id}>
              <SubDomainCardWithMenu name={subDomain.name} onSave={handleExpand}  id={subDomain.id} />
              {index < subDomainList.length - 1 && (
                <hr
                  style={{
                    border: "0",
                    height: "1px",
                    background: "black",
                  }}
                />
              )}
            </Box>
          ))
        )}
      </AccordionDetails>
    </Accordion>
  );
};

export default DomainCard;
