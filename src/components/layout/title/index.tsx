import React from "react";
import { useRouterContext, type TitleProps } from "@refinedev/core";
import Button from "@mui/material/Button";

import { logo, yariga } from "assets";

export const Title: React.FC<TitleProps> = ({ collapsed }) => {
  const { Link } = useRouterContext();

  return (
    <Button fullWidth variant="text" disableRipple>
      <Link to="/">
        {collapsed ? (
          <img src="https://dev.digitalt3.com/wp-content/uploads/2024/10/cal_icon.png" alt="caldarys logo" width="28px" />
        ) : (
          <img src="https://files.logomakr.com/3hk25r-LogoMakr.png" alt="caldarys" width="140px" />
        )}
      </Link>
    </Button>
  );
};
