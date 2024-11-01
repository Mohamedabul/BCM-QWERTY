import { useState } from "react";
import { handleChange } from "utils/helperFunctions";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
} from "@mui/material";
import SubDomainCardWithMenu from "pages/sub-domain/subdomaincardwithmenu";
import { ShimmerBox } from "utils/ShimmerBox";
import { objectToQueryString } from "components/common/helper";
import CreateCapability from "pages/capability/create-capability";

const DomainCard = (props: any) => {
  const [subDomainList, setSubDomainList] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState(false);

  const handleExpand = async () => {
    setLoading(true);
    const params = { domain_id: props.id };
    const queryString = objectToQueryString(params);
    const resp = await fetch(
      process.env.REACT_APP_API_URL + `subdomainBydomain?${queryString}`
    );
    const data = await resp.json();
    setSubDomainList(data);
    setLoading(false);
  };

  const handleClick = async (obj: object, callback: any) => {
    const response = await fetch(process.env.REACT_APP_API_URL + "subdomain", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...obj, domain_id: props.id }),
    });

    if (!response.ok) {
      throw new Error(`Failed to create capability: ${response.statusText}`);
    }

    console.log("Capability created successfully");
    callback();
    handleExpand();
    setOpen(false);
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
          borderRadius: "8px",
        }}
      >
        <Typography
          sx={{ textAlign: "center", width: "100%", fontWeight: "bold" }}
        >
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
              <SubDomainCardWithMenu
                name={subDomain.name}
                onSave={handleExpand}
                isEditable={props.isEditable}
                id={subDomain.id}
              />
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
        {props.isEditable && (
          <>
            <div
              style={{
                position: "relative",
                textAlign: "center",
                marginTop: "10%",
              }}
            >
              <hr
                style={{
                  border: "0",
                  height: "1.5px",
                  background: "black",
                  marginTop: "7%",
                }}
              />
              <AddCircleIcon
                onClick={() => {
                  setOpen(true);
                }}
                sx={{
                  color: "black",
                  backgroundColor: "white",
                  borderRadius: "50%",
                  position: "absolute",
                  top: "-12px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  cursor: "pointer",
                }}
              />
            </div>
          </>
        )}
      </AccordionDetails>
      <CreateCapability
        open={open}
        onClose={() => setOpen(false)}
        label="subdomain"
        clickHandler={handleClick}
      />
    </Accordion>
  );
};

export default DomainCard;
