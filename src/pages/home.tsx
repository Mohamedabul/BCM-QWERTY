import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Tooltip from "@mui/material/Tooltip";
import { getDashBoardCounts } from "apis";

type DashboardCounts = {
  coreCapabilityCount: number;
  domainCount: number;
  subDomainCount: number;
  softwareCount: number;
  mappedCount: number;
  orphanCount: number;
  appsMappedToCapsCount: number;
  appsMappedToDomainCount: number;
  appsMappedToSubdomainCount: number;
};

const Home = () => {
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
          orphanCount: Number(data.orphanCount),
          appsMappedToCapsCount: Number(data.appsMappedToCapsCount),
          appsMappedToDomainCount: Number(data.appsMappedToDomainCount),
          appsMappedToSubdomainCount: Number(data.appsMappedToSubdomainCount),
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

  const tooltips: Record<string, string> = {
    "Business Capabilities": "Total number of business capabilities available",
    Domains: "Total number of Domains available",
    "Sub-domains": "Total number of Sub-domains available",
    Applications: "Total number of Applications available",
    "Applications Mapped": "Total number of Applications Mapped available",
    Orphans: "Total number of Applications without any mapping",
    "Application Mapped to Business Capabilities":
      "Total number of Application Mapped to only 1'st level",
    "Application Mapped to Domains": "Total number of Application Mapped to only 2'nd level",
    "Application Mapped to subdomain": "Total number of  Application Mapped to 3'rd level",
  };

  type TooltipKeys = keyof typeof tooltips;

  const items: { title: TooltipKeys; value: number }[] = [
    { title: "Business Capabilities", value: dashboardCounts?.coreCapabilityCount ?? 0 },
    { title: "Domains", value: dashboardCounts?.domainCount ?? 0 },
    { title: "Sub-domains", value: dashboardCounts?.subDomainCount ?? 0 },
    { title: "Applications", value: dashboardCounts?.softwareCount ?? 0 },
    { title: "Applications Mapped", value: dashboardCounts?.mappedCount ?? 0 },
    { title: "Orphans", value: dashboardCounts?.orphanCount ?? 0 },
    { title: "Application Mapped to Business Capabilities", value: dashboardCounts?.appsMappedToCapsCount ?? 0 },
    { title: "Application Mapped to Domains", value: dashboardCounts?.appsMappedToDomainCount ?? 0 },
    { title: "Application Mapped to subdomain", value: dashboardCounts?.appsMappedToSubdomainCount ?? 0 },
  ];

  return (
    <Box sx={{ padding: "24px", backgroundColor: "#f9f9f9", borderRadius: "12px" }}>
      <Typography fontSize={28} fontWeight={700} color="#11142D" mb={4}>
        Dashboard
      </Typography>

      <Grid container spacing={4}>
        {items.map((item, index) => (
          <Grid item xs={12} sm={5} md={3} key={index}>
            <Tooltip title={tooltips[item.title]} arrow>
              <Box
                sx={{
                  minHeight: "100px",
                  padding: "1px",
                  borderRadius: "8px",
                  backgroundColor: "#ffffff",
                  boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                <Typography fontSize={16} color="#555" textAlign="center">
                  {item.title}
                </Typography>
                <Typography fontSize={24} fontWeight={700} color="#11142D">
                  {item.value}
                </Typography>
              </Box>
            </Tooltip>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Home;