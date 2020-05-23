import React, { Fragment } from "react";

import { useHistory } from "react-router-dom";

import { AppBar, Toolbar, IconButton } from "@material-ui/core";

import ArrowBackIcon from "@material-ui/icons/ArrowBack";

import GrowTypography from "../GrowTypography";

export default function AboutHeader() {
  const { goBack } = useHistory();
  return (
    <Fragment>
      <AppBar>
        <Toolbar>
          <IconButton color="inherit" title="Go Back" onClick={() => goBack()}>
            <ArrowBackIcon />
          </IconButton>
          <GrowTypography variant="h6" color="inherit">
            About
          </GrowTypography>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </Fragment>
  );
}
