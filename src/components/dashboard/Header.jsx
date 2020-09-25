import React, { Fragment } from "react";

import { useTranslation } from "react-i18next";

import { AppBar, IconButton, Toolbar } from "@material-ui/core";

import MenuIcon from "@material-ui/icons/Menu";

import GrowTypography from "../GrowTypography";

export default function DashboardHeader({ onOpen }) {
  const { t } = useTranslation();

  return (
    <Fragment>
      <AppBar>
        <Toolbar>
          <IconButton color="inherit" title={t("Open")} onClick={onOpen}>
            <MenuIcon />
          </IconButton>
          <GrowTypography variant="h6" color="inherit">
            {t("Dashboard.Header")}
          </GrowTypography>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </Fragment>
  );
}
