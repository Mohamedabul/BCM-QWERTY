import { Typography } from "@mui/material";

const SubDomainCard = (props: any) => {
  return (
    <div style={{display: "flex", justifyContent: "center", alignItems: "end", marginTop: 5}}>
      <Typography sx={{textAlign: "center", maxWidth: "90%"}}>{props.name}</Typography>
    </div>
  );
};

export default SubDomainCard;
