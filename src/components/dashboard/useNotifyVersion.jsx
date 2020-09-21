import React, { Fragment, useEffect } from "react";

import { useSnackbar } from "notistack";
import { useHistory } from "react-router-dom";

import { Button, IconButton } from "@material-ui/core";

import CloseIcon from "@material-ui/icons/Close";

import { version } from "../version";

export default function useNotifyVersion() {
  const { closeSnackbar, enqueueSnackbar } = useSnackbar();
  const { push } = useHistory();

  useEffect(() => {
    const to = setTimeout(() => {
      const storedVersion = localStorage.getItem("version");
      const joinVersion = version.join(".");
      if (storedVersion !== joinVersion) {
        localStorage.setItem("version", joinVersion);
        enqueueSnackbar(`New version v${joinVersion}`, {
          variant: "info",
          action: key => (
            <Fragment>
              <Button
                color="inherit"
                title="More"
                onClick={() => {
                  closeSnackbar(key);
                  push("/about");
                }}
              >
                More
              </Button>
              <IconButton
                color="inherit"
                title="Dismiss"
                onClick={() => {
                  closeSnackbar(key);
                }}
              >
                <CloseIcon />
              </IconButton>
            </Fragment>
          )
        });
      }
    }, 1000);
    return () => {
      clearTimeout(to);
    };
  }, [closeSnackbar, enqueueSnackbar, push]);
}
