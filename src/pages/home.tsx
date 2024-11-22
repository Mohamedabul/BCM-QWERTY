import { useEffect, useState } from "react";
import { useList } from "@refinedev/core";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import {
  PieChart,
  PropertyReferrals,
  TotalRevenue,
} from "components";
import CapabilityTable from "components/charts/TableCapability";
import { getDashBoardCounts } from "apis";

type DashboardCounts = {
  coreCapabilityCount: number;
  domainCount: number;
  subDomainCount: number;
  softwareCount: number;
  mappedCount: number;
  orphanCount: number;
};

const Home = () => {
  // const { data,  } = useList({
  //       resource: "properties",
  //       config: {
  //         pagination: {
  //           pageSize: 4,
  //         },
  //       },
  //     });
  const [dashboardCounts, setDashboardCounts] = useState<DashboardCounts | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchDashboardCounts = async () => {
      try {
        const data = await getDashBoardCounts();
        setDashboardCounts({
          coreCapabilityCount: Number(data.coreCapabilityCount),
          domainCount: Number(data.domainCount),
          subDomainCount: Number(data.subDomainCount),
          softwareCount: Number(data.softwareCount),
          mappedCount: Number(data.mappedCount),
          orphanCount:Number(data.orphanCount)
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
          title="Business Capabilities"
          value={dashboardCounts?.coreCapabilityCount ?? 0}
        />
        <PieChart
          title="Domains"
          value={dashboardCounts?.domainCount ?? 0}
        />
        <PieChart
          title="Sub-domains"
          value={dashboardCounts?.subDomainCount ?? 0}

        />
        <PieChart
          title="Applications"
          value={dashboardCounts?.softwareCount ?? 0}
        />
        <PieChart
          title="Applications Mapped"
          value={dashboardCounts?.mappedCount ?? 0}
        />
        <PieChart
          title="Orphans"
          value={dashboardCounts?.orphanCount ?? 0}
        />
      </Box>

      <Stack
        mt="25px"
        width="100%"
        direction={{ xs: "column", lg: "row" }}
        gap={4}
      >
      </Stack>

    </Box>
  );
};

export default Home;
