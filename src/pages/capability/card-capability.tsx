import { useState } from "react";
import accordionHelper from "utils/accordionHelper";
import DomainCard from "pages/domain/card-domain";

function CapabilityCard() {
  const [domainList, setDomainList] = useState<string[]>([]);
//   const fetchData = async () => {
//     try {
//       const asyncFunc = async () =>
//         setTimeout(() => {
//           console.log("calling api");
//           setDomainList(["Domain1", "Domain2", "Domain3", "Domain4"]);
//         }, 1000);
//       await asyncFunc();
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };
//   const handleChange = (event: any, isExpanded: any) => {
//     if (isExpanded) {
//       fetchData();
//     }
//   };
  const CapabilityAccordion = accordionHelper(DomainCard);
  return (
    <CapabilityAccordion
      accordionStyle={{
        height: "100%",
        backgroundColor: "red",
        boxShadow: "none",
      }}
    />
  );
}

export default CapabilityCard;
