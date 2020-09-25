import React, { useEffect, useState } from "react";

import DateFnsUtils from "@date-io/date-fns";
import itLocale from "date-fns/locale/it";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

import {
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  TextField
} from "@material-ui/core";

import {
  MuiPickersUtilsProvider,
  KeyboardDateTimePicker
} from "@material-ui/pickers";

import BoxContainer from "../BoxContainer";

import {
  sla2dhm,
  dhm2str,
  dateAddDhm,
  formatDate,
  isWorking,
  lengthEnd,
  evalLength
} from "./utils";
import { getWeek } from "../settings/fn";

import HelpIcon from "@material-ui/icons/Help";
import ReplayIcon from "@material-ui/icons/Replay";

export default function DashboardContent() {
  const { push } = useHistory();
  const { t } = useTranslation();

  // SLA input value
  // Syntax: /(\d+\s*d)?\s*(\d+h)?\s*(\d+m)?/
  // Eg "1d 2h 3m"
  const [sla, setSla] = useState("");
  // Now
  const [now, setNow] = useState(new Date());
  // const [now, setNow] = useState(new Date(2020, 4, 26, 9, 40));
  // SLA exploded
  const [dhm, setDhm] = useState({ weeks: 0, days: 0, hours: 0, minutes: 0 });
  // Now + SLA
  const [expiry, setExpiry] = useState(now);
  // Requested expiry date/time
  const [request, setRequest] = useState(now);
  // Until
  const [until, setUntil] = useState(now);

  // useEffect(() => {
  //   // This effect reloads `now` when minute changes
  //   const to = setTimeout(() => {
  //     setNow(new Date());
  //   }, (60 - now.getSeconds()) * 1000);
  //   return () => clearTimeout(to);
  // });

  useEffect(() => {
    // Updates `dhm` when `sla` changes
    setDhm(sla2dhm(sla));
  }, [sla]);

  useEffect(() => {
    // Updates `expiry` when `now` or `dhm` change
    setExpiry(dateAddDhm(now, dhm));
  }, [dhm, now]);

  useEffect(() => {
    const week = getWeek();
    // setUntil(new Date(+now + (+request - expiry)));
    const length = evalLength(new Date(expiry), new Date(request), week);
    // const length = 0;
    if (length > 0) {
      setUntil(lengthEnd(now, length, week));
    } else {
      setUntil(new Date(now));
    }
  }, [expiry, now, request]);

  const handleReloadNow = () => {
    setNow(new Date());
  };

  const week = getWeek();
  const nowIsWorking = isWorking(now, week);
  const expiryIsWorking = isWorking(expiry, week);
  const untilIsWorking = isWorking(until, week);
  const untilIsGreaterThanRequest = +until > +request;
  const untilError = !untilIsWorking || untilIsGreaterThanRequest;

  return (
    <BoxContainer>
      <List>
        <ListItem>
          <ListItemText
            primary={formatDate(now)}
            secondary={`${t("Dashboard.Content.now.part1")} ${
              nowIsWorking ? "" : t("Dashboard.Content.now.part2")
            }`}
            primaryTypographyProps={{
              ...(nowIsWorking ? null : { color: "error" })
            }}
            secondaryTypographyProps={{
              ...(nowIsWorking ? null : { color: "error" })
            }}
          />
          <ListItemSecondaryAction>
            <IconButton title={t("Reload")} onClick={handleReloadNow}>
              <ReplayIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>

        <ListItem>
          <TextField
            fullWidth
            label={t("Dashboard.Content.sla.label")}
            placeholder={t("Dashboard.Content.sla.placeholder")}
            value={sla}
            helperText={dhm2str(dhm)}
            onChange={({ target: { value } }) => setSla(value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => push("/help#sla")}
                    title={t("HelpLabel")}
                  >
                    <HelpIcon />
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
        </ListItem>

        <ListItem>
          <ListItemText
            primary={expiry ? formatDate(expiry) : ""}
            secondary={`${t("Dashboard.Content.expiry.part1")} ${
              expiryIsWorking ? "" : t("Dashboard.Content.expiry.part2")
            }`}
            primaryTypographyProps={{
              ...(expiryIsWorking ? null : { color: "error" })
            }}
            secondaryTypographyProps={{
              ...(expiryIsWorking ? null : { color: "error" })
            }}
          />
        </ListItem>

        <ListItem>
          <MuiPickersUtilsProvider utils={DateFnsUtils} locale={itLocale}>
            <KeyboardDateTimePicker
              fullWidth
              ampm={false}
              label={t("Dashboard.Content.request.label")}
              format="dd/MM/yyyy HH:mm"
              value={request}
              onChange={r => setRequest(r)}
              error={+request < +expiry}
              helperText={
                +request < +expiry
                  ? t("Dashboard.Content.request.helperText")
                  : ""
              }
            />
          </MuiPickersUtilsProvider>
        </ListItem>

        <ListItem>
          <ListItemText
            primary={formatDate(until)}
            secondary={`${t("Dashboard.Content.until.part1")} ${
              untilIsGreaterThanRequest
                ? t("Dashboard.Content.until.part2")
                : !untilIsWorking
                ? t("Dashboard.Content.until.part3")
                : ""
            }`}
            primaryTypographyProps={{
              ...(untilError ? { color: "error" } : null)
            }}
            secondaryTypographyProps={{
              ...(untilError ? { color: "error" } : null)
            }}
          />
        </ListItem>
      </List>
    </BoxContainer>
  );
}
