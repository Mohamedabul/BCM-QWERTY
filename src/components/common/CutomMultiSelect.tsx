// import { MenuItem, OutlinedInput, Select, SelectChangeEvent } from "@mui/material";
// import React from "react";

// function CutomMultiSelect({ defaultData, list }: any) {
//   const [selectedItem, setSelectedItem] = React.useState<any[]>(
//     defaultData ? [defaultData] : []
//   );
//   const handleChange = (event: SelectChangeEvent<any>) => {
//     const {
//       target: { value },
//     } = event;
//     setSelectedItem(typeof value === "string" ? value.split(",") : value);
//   };
//   return (
//     <Select
//       fullWidth
//       value={selectedItem}
//       multiple
//       onChange={handleChange}
//       input={<OutlinedInput label="Tag" />}
//       renderValue={(selected) => {
//         return selected.join(",");
//       }}
//       sx={{
//         backgroundColor: "#f0f2f5",
//         borderRadius: 1,
//         "& .MuiOutlinedInput-root": {
//           "& fieldset": { borderColor: "transparent" },
//           "&.Mui-focused fieldset": { borderColor: "#b0bec5" },
//         },
//         "& .MuiInputBase-input": { color: "black" },
//       }}
//     >
//       {!defaultData && (
//         <MenuItem value="" disabled>
//           Select Business Capability
//         </MenuItem>
//       )}
//       {list.map((capability:any) => (
//         <MenuItem key={capability.id} value={capability.name}>
//           {capability.name}
//         </MenuItem>
//       ))}
//     </Select>
//   );
// }

// export default CutomMultiSelect;
