import React, { Suspense } from "react";

import { makeStyles } from "@material-ui/core/styles";
import { Paper, LinearProgress } from "@material-ui/core";

import logo from "../logo.svg";

export default function SuspenseWrapper({ children }) {
  return <Suspense fallback={<Fallback />}>{children}</Suspense>;
  // return <Fallback />;
}

const useStyles = makeStyles(theme => ({
  "Container-root": {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: `calc(100% - ${theme.spacing(8)}px)`,
    maxWidth: theme.breakpoints.values.sm
  },
  "Logo-root": {
    padding: theme.spacing(2),
    "& img": { display: "block", width: "50%", margin: "auto" }
  },
  "Progress-root": {
    padding: theme.spacing(2),
    width: "50%",
    margin: "auto"
  }
}));

const Fallback = () => {
  const classes = useStyles();
  // console.log(classes);

  return (
    <Paper elevation={0} classes={{ root: classes["Container-root"] }}>
      <Paper elevation={0} classes={{ root: classes["Logo-root"] }}>
        <img src={logo} alt="SLA" />
      </Paper>
      <Paper elevation={0} classes={{ root: classes["Progress-root"] }}>
        <LinearProgress />
      </Paper>
    </Paper>
  );
};
