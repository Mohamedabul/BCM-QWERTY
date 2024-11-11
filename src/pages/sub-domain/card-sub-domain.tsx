import { Typography } from "@mui/material";

const SubDomainCard = (props: any) => {
  return (
    <div style={{display: "flex", justifyContent: "center", alignItems: "end", marginTop: 5}}>
      <Typography>{props.name}</Typography>
    </div>
  );
};

export default SubDomainCard;
