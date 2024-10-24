import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";

export default function accordionHelper(ChildDetails: any) {
  return (props: any) => {
    return (
      <Accordion
        sx={props.accordionStyle}
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
          <Typography sx={{ textAlign: "center", width: "100%" }}>
            Capability Title
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ChildDetails/>
        </AccordionDetails>
      </Accordion>
    );
  };
}
