import React, { useEffect, useState } from "react";

import DateFnsUtils from "@date-io/date-fns";
import itLocale from "date-fns/locale/it";
import { useHistory } from "react-router-dom";

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

import { sla2dhm, dhm2str, dateAddDhm, formatDate, isWorking } from "./utils";
import { getWeek } from "../settings/fn";

import HelpIcon from "@material-ui/icons/Help";
import ReplayIcon from "@material-ui/icons/Replay";

export default function DashboardContent() {
  const { push } = useHistory();

  // SLA input value
  // Syntax: /(\d+\s*d)?\s*(\d+h)?\s*(\d+m)?/
  // Eg "1d 2h 3m"
  const [sla, setSla] = useState("");
  // Now
  const [now, setNow] = useState(new Date());
  // const [now] = useState(new Date(2020, 4, 18, 18, 0));
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
    setUntil(new Date(+now + (+request - expiry)));
  }, [expiry, now, request]);

  const handleReloadNow = () => {
    setNow(new Date());
  };

  const week = getWeek();
  const nowIsWorking = isWorking(now, week);
  const expiryIsWorking = isWorking(expiry, week);
  const untilIsWorking = isWorking(until, week);

  return (
    <BoxContainer>
      <List>
        <ListItem>
          <ListItemText
            primary={formatDate(now)}
            secondary={`Actual date and time ${
              nowIsWorking ? "" : "is out of working hours"
            }`}
            primaryTypographyProps={{
              ...(nowIsWorking ? null : { color: "error" })
            }}
            secondaryTypographyProps={{
              ...(nowIsWorking ? null : { color: "error" })
            }}
          />
          <ListItemSecondaryAction>
            <IconButton title="Ricarica" onClick={handleReloadNow}>
              <ReplayIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>

        <ListItem>
          <TextField
            fullWidth
            label="Remaining SLA"
            placeholder="E.g. 1d 4h 30"
            value={sla}
            helperText={dhm2str(dhm)}
            onChange={({ target: { value } }) => setSla(value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => push("/help")} title="Help">
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
            secondary={`Expiry date and time ${
              expiryIsWorking ? "" : "is out of working hours"
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
              label="Request expiry date/time"
              format="dd/MM/yyyy HH:mm"
              value={request}
              onChange={r => setRequest(r)}
              error={+request < +expiry}
            />
          </MuiPickersUtilsProvider>
        </ListItem>

        <ListItem>
          <ListItemText
            primary={formatDate(until)}
            secondary={`Suspend until ${
              untilIsWorking ? "" : "is out of working hours"
            }`}
            primaryTypographyProps={{
              ...(untilIsWorking ? null : { color: "error" })
            }}
            secondaryTypographyProps={{
              ...(untilIsWorking ? null : { color: "error" })
            }}
          />
        </ListItem>
      </List>
    </BoxContainer>
  );
}
