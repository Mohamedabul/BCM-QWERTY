import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@mui/material";
import SubDomainCard from "pages/sub-domain/card-sub-domain";
import { useEffect, useState } from "react";
import accordionHelper from "utils/accordionHelper";

function DomainCard(props: object) {
  const [domainList, setDomainList] = useState([]);
  useEffect(() => {
    console.log("calling domain list")
  }, []);
  const DomainAccordion = accordionHelper(SubDomainCard);
  return (
    <DomainAccordion
      accordionStyle={{
        height: "100%",
        backgroundColor: "white",
        boxShadow: "none",
      }}
    />
  );
}

export default DomainCard;
