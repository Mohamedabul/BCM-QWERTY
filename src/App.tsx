import AccountCircleOutlined from "@mui/icons-material/AccountCircleOutlined";
import ChatBubbleOutline from "@mui/icons-material/ChatBubbleOutline";
import PeopleAltOutlined from "@mui/icons-material/PeopleAltOutlined";
import StarOutlineRounded from "@mui/icons-material/StarOutlineRounded";
import AssessmentIcon from "@mui/icons-material/Assessment";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import InboxOutlinedIcon from "@mui/icons-material/InboxOutlined";
import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import { HiTemplate } from 'react-icons/hi';
import {
  GitHubBanner,
  type LegacyAuthProvider as AuthProvider,
  Refine,
} from "@refinedev/core";
import {
  ErrorComponent,
  useNotificationProvider,
  ReadyPage,
  RefineSnackbarProvider,
} from "@refinedev/mui";

import routerProvider from "@refinedev/react-router-v6/legacy";
import dataProvider from "@refinedev/simple-rest";
import axios from "axios";
import { Header, Layout, Sider, Title } from "components/layout";
import { ColorModeContextProvider } from "contexts";
import type { CredentialResponse } from "interfaces/google";
import { parseJwt } from "utils/parse-jwt";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import {
  Home,
  Login,
  MyProfile,
  AllCapabilities,
  // CreateCapability,
  EditCapability,
  CapabilityDetails,
} from "pages";
import Upload from "pages/Upload";
import Report from "pages/Report";
import Regional from "pages/report/regional";
import Country from "pages/report/country";
import Global from "pages/report/global";
import Template from "pages/Template";

const axiosInstance = axios.create();
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (config.headers) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#0000ff",
      },
      secondary: {
        main: "#000000",
      },
    },
  });
  // const authProvider: AuthProvider = {
  //   login: async ({ credential }: CredentialResponse) => {
  //     const profileObj = credential ? parseJwt(credential) : null;

  //     if (profileObj) {
  //       const response = await fetch("http://localhost:8080/api/v1/users", {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify({
  //           name: profileObj.name,
  //           email: profileObj.email,
  //           avatar: profileObj.picture,
  //         }),
  //       });

  //       const data = await response.json();

  //       if (response.status === 200) {
  //         localStorage.setItem(
  //           "user",
  //           JSON.stringify({
  //             ...profileObj,
  //             avatar: profileObj.picture,
  //             userid: data._id,
  //           }),
  //         );
  //       } else {
  //         return Promise.reject();
  //       }
  //     }
  //     localStorage.setItem("token", `${credential}`);

  //     return Promise.resolve();
  //   },
  //   logout: () => {
  //     const token = localStorage.getItem("token");

  //     if (token && typeof window !== "undefined") {
  //       localStorage.removeItem("token");
  //       localStorage.removeItem("user");
  //       axios.defaults.headers.common = {};
  //       window.google?.accounts.id.revoke(token, () => {
  //         return Promise.resolve();
  //       });
  //     }

  //     return Promise.resolve();
  //   },
  //   checkError: () => Promise.resolve(),
  //   checkAuth: async () => {
  //     const token = localStorage.getItem("token");

  //     if (token) {
  //       return Promise.resolve();
  //     }
  //     return Promise.reject();
  //   },

  //   getPermissions: async () => null,
  //   getUserIdentity: async () => {
  //     const user = localStorage.getItem("user");
  //     if (user) {
  //       return Promise.resolve(JSON.parse(user));
  //     }
  //   },
  // };

  return (
    <ColorModeContextProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline>
          <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
          <RefineSnackbarProvider>
            <Refine
              dataProvider={dataProvider("")}
              notificationProvider={useNotificationProvider}
              ReadyPage={ReadyPage}
              catchAll={<ErrorComponent />}
              resources={[
                {
                  name: "template",
                  list: () => <Template/>,
                  // show: CapabilityDetails,
                  icon: <HiTemplate style={{fontSize: "25px"}} />,
                  options: { label: "Template" },
                },
                {
                  name: "capability",
                  list: () => <AllCapabilities isEditable={true} />,
                  // create: CreateCapability,
                  // edit: EditCapability,
                  icon: <BusinessCenterIcon />,
                },
                // {
                //   name: "reviews",
                //   list: Home,
                //   icon: <StarOutlineRounded />,
                // },
                // {
                //   name: "messages",
                //   list: Home,
                //   icon: <ChatBubbleOutline />,
                // },
                {
                  name: "Inventory",
                  list: Upload,
                  icon: <InboxOutlinedIcon />,
                  options: {
                    label: "Mapping",
                    onClick: () => {
                      console.log("clicked");
                    },
                  },
                },
                {
                  name: "Reports",
                  list: Report,
                  icon: <AssessmentIcon />,
                  options: {
                    label: "Reports",
                    onClick: () => {
                      console.log("clicked");
                    },
                  },
                },
                {
                  name: "my-profile",
                  options: { label: "My Profile " },
                  list: MyProfile,
                  icon: <AccountCircleOutlined />,
                },
              ]}
              Title={Title}
              Sider={Sider}
              Layout={Layout}
              Header={Header}
              legacyRouterProvider={routerProvider}
              // legacyAuthProvider={authProvider}
              LoginPage={Login}
              DashboardPage={Home}
            />
          </RefineSnackbarProvider>
        </CssBaseline>
      </ThemeProvider>
    </ColorModeContextProvider>
  );
}

export default App;