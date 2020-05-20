import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import classNames from "classnames";
import debounce from "lodash.debounce";
import { useSnackbar } from "notistack";

import { fade, makeStyles } from "@material-ui/core/styles";
import { IconButton, InputAdornment, TextField } from "@material-ui/core";

import ClearIcon from "@material-ui/icons/Clear";
import SearchIcon from "@material-ui/icons/Search";

import LoadingButton from "./LoadingButton";

const useStyles = makeStyles(theme => ({
  AppBarSearch: {
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    }
  },
  AppBarInput: {
    color: "inherit"
  }
}));

export default function SearchField({
  appBar = false,
  delay = 250,
  onClear,
  onSearch,
  ...others
}) {
  const [query, setQuery] = useState("");
  const [searching, setSearching] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const debounced = debounce(handleSearch, delay);
    debounced();
    return () => debounced.cancel();
  }, [query]);

  const classes = useStyles();

  const handleSearch = () => {
    setSearching(true);
    onSearch(query)
      .catch(err => {
        console.error(err);
        enqueueSnackbar(err.message, { variant: "error" });
      })
      .then(() => setSearching(false));
  };

  const handleClear = () => {
    setQuery("");
    onClear();
  };

  const handleKeyPress = e => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleChange = ({ target: { value } }) => {
    setQuery(value);
  };

  return (
    <TextField
      type="text"
      variant={appBar ? "standard" : "outlined"}
      className={classNames({ [classes.AppBarSearch]: appBar })}
      placeholder="Search..."
      value={query}
      onChange={handleChange}
      onKeyPress={handleKeyPress}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <LoadingButton
              isIcon
              title="Search"
              onClick={handleSearch}
              loading={searching}
            >
              <SearchIcon />
            </LoadingButton>
          </InputAdornment>
        ),
        endAdornment: (
          <InputAdornment position="end">
            {!!query && (
              <IconButton title="Clear" onClick={handleClear} color="inherit">
                <ClearIcon />
              </IconButton>
            )}
          </InputAdornment>
        ),
        classes: {
          root: classNames({ [classes.AppBarInput]: appBar })
        },
        ...(appBar && { disableUnderline: true })
      }}
      {...others}
    />
  );
}

SearchField.propTypes = {
  // Apply AppBar style
  appBar: PropTypes.bool,
  // Debounce delay
  delay: PropTypes.number,
  // Called when clear button is clicked
  onClear: PropTypes.func.isRequired,
  // Called when search process starts. Must be a function that returns a Promise
  onSearch: PropTypes.func.isRequired
};
