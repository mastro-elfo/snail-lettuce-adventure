import React from "react";
import PropTypes from "prop-types";

import { useHistory } from "react-router-dom";

import { Collapse } from "@material-ui/core";

/**
 * Use history.location.hash to collapse in
 * @param       {[type]} children [description]
 * @param       {[type]} filter   [description]
 * @param       {[type]} others   [description]
 * @constructor
 */
export default function HashSection({ children, filter, ...others }) {
  const {
    location: { hash }
  } = useHistory();

  return <Collapse in={!hash || hash.slice(1) === filter}>{children}</Collapse>;
}

HashSection.propTypes = {
  filter: PropTypes.string
};
