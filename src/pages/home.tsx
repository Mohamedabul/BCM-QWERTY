import { useList } from "@refinedev/core";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

import {
  PieChart,
  PropertyReferrals,
  TotalRevenue,
  PropertyCard,
} from "components";

const Home = () => {
  const { data, isLoading, isError } = useList({
    resource: "properties",
    config: {
      pagination: {
        pageSize: 4,
      },
    },
  });

  const latestProperties = data?.data ?? [];

  if (isLoading) return <Typography>Loading...</Typography>;
  if (isError) return <Typography>Something went wrong!</Typography>;

  return (
    <Box>
      <Typography fontSize={25} fontWeight={700} color="#11142D">
        Dashboard
      </Typography>

      <Box mt="20px" display="flex" flexWrap="wrap" gap={4}>
        <PieChart
          title="Total Business Units"
          value={8}
          series={[75, 25]}
          colors={["#275be8", "#c4e8ef"]}
        />
        <PieChart
          title="Total Domains"
          value={80}
          series={[60, 40]}
          colors={["#275be8", "#c4e8ef"]}
        />
        <PieChart
          title="Total Sub-domains"
          value={260}
          series={[75, 25]}
          colors={["#275be8", "#c4e8ef"]}
        />
        <PieChart
          title="Total Application"
          value={450}
          series={[75, 25]}
          colors={["#275be8", "#c4e8ef"]}
        />
      </Box>

      <Stack
        mt="25px"
        width="100%"
        direction={{ xs: "column", lg: "row" }}
        gap={4}
      >
        <TotalRevenue />
      </Stack>

    </Box>
  );
};

export default Home;
