import React, { Fragment } from "react";

import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { AppBar, Toolbar, IconButton } from "@material-ui/core";

import ArrowBackIcon from "@material-ui/icons/ArrowBack";

import GrowTypography from "../GrowTypography";

export default function HelpHeader() {
  const { goBack } = useHistory();
  const { t } = useTranslation(["common", "help"]);

  return (
    <Fragment>
      <AppBar>
        <Toolbar>
          <IconButton
            color="inherit"
            title={t("common:Go Back")}
            onClick={() => goBack()}
          >
            <ArrowBackIcon />
          </IconButton>
          <GrowTypography variant="h6" color="inherit">
            {t("help:Header")}
          </GrowTypography>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </Fragment>
  );
}
