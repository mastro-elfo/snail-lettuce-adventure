import React, { Fragment } from "react";
import PropTypes from "prop-types";

import { makeStyles } from "@material-ui/core/styles";
import { Paper } from "@material-ui/core";

import { Print, NoPrint } from "./Print";
import TopFab from "./TopFab";

export default function Page({
  content = null,
  drawer = null,
  header = null,
  print = null,
  topFab = true,
}) {
  const classes = useStyles();

  return (
    <Fragment>
      <NoPrint>
        <Paper square elevation={0} className={classes.paper}>
          {topFab && <TopFab />}
          {!!drawer && drawer}
          {!!header && header}
          {!!content && content}
        </Paper>
      </NoPrint>
      <Print>{!!print && print}</Print>
    </Fragment>
  );
}

Page.propTypes = {
  topFab: PropTypes.bool,
  content: PropTypes.element,
  drawer: PropTypes.element,
  header: PropTypes.element,
  print: PropTypes.element,
};

const useStyles = makeStyles({
  paper: { minHeight: "100%" },
});
