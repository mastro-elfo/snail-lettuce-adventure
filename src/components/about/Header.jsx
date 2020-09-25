import React, { Fragment } from "react";

import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

import { AppBar, Toolbar, IconButton } from "@material-ui/core";

import ArrowBackIcon from "@material-ui/icons/ArrowBack";

import GrowTypography from "../GrowTypography";

export default function AboutHeader() {
  const { goBack } = useHistory();
  const { t } = useTranslation();

  return (
    <Fragment>
      <AppBar>
        <Toolbar>
          <IconButton
            color="inherit"
            title={t("Go Back")}
            onClick={() => goBack()}
          >
            <ArrowBackIcon />
          </IconButton>
          <GrowTypography variant="h6" color="inherit">
            {t("About.Header")}
          </GrowTypography>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </Fragment>
  );
}
