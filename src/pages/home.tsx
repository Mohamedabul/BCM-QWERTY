import { useEffect, useState } from "react";
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
import CapabilityTable from "components/charts/TableCapability";

type DashboardCounts = {
  coreCapabilityCount: number;
  domainCount: number;
  subDomainCount: number;
  softwareCount: number;
};

const Home = () => {
  const { data,  } = useList({
        resource: "properties",
        config: {
          pagination: {
            pageSize: 4,
          },
        },
      });
  const [dashboardCounts, setDashboardCounts] = useState<DashboardCounts | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchDashboardCounts = async () => {
      try {
        const response = await fetch(process.env.REACT_APP_API_URL+"dashBoardCounts");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setDashboardCounts({
          coreCapabilityCount: Number(data.coreCapabilityCount),
          domainCount: Number(data.domainCount),
          subDomainCount: Number(data.subDomainCount),
          softwareCount: Number(data.softwareCount),
        });
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching dashboard counts:", error);
        setIsError(true);
        setIsLoading(false);
      }
    };

    fetchDashboardCounts();
  }, []);

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
          value={dashboardCounts?.coreCapabilityCount ?? 0}
          series={[dashboardCounts?.coreCapabilityCount ?? 0, 100 - (dashboardCounts?.coreCapabilityCount ?? 0)]}
          colors={["#275be8", "#c4e8ef"]}
        />
        <PieChart
          title="Total Domains"
          value={dashboardCounts?.domainCount ?? 0}
          series={[dashboardCounts?.domainCount ?? 0, 100 - (dashboardCounts?.domainCount ?? 0)]}
          colors={["#275be8", "#c4e8ef"]}
        />
        <PieChart
          title="Total Sub-domains"
          value={dashboardCounts?.subDomainCount ?? 0}
          series={[dashboardCounts?.subDomainCount ?? 0, 100 - (dashboardCounts?.subDomainCount ?? 0)]}
          colors={["#275be8", "#c4e8ef"]}
        />
        <PieChart
          title="Total Application"
          value={dashboardCounts?.softwareCount ?? 0}
          series={[dashboardCounts?.softwareCount ?? 0, 100 - (dashboardCounts?.softwareCount ?? 0)]}
          colors={["#275be8", "#c4e8ef"]}
        />
      </Box>

      <Stack
        mt="25px"
        width="100%"
        direction={{ xs: "column", lg: "row" }}
        gap={4}
      >
        <CapabilityTable/>
      </Stack>

    </Box>
  );
};

export default Home;
