import React, { useEffect, useState } from "react";

import DateFnsUtils from "@date-io/date-fns";

import { List, ListItem, ListItemText, TextField } from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardDateTimePicker
} from "@material-ui/pickers";

import BoxContainer from "../BoxContainer";

import { sla2dhm, dhm2str, dateAddDhm, formatDate } from "./utils";

export default function DashboardContent() {
  // SLA input value
  // Syntax: /(\d+\s*d)?\s*(\d+h)?\s*(\d+m)?/
  // Eg "1d 2h 3m"
  const [sla, setSla] = useState("");
  // Now
  const [now, setNow] = useState(new Date());
  // const [now] = useState(new Date(2020, 4, 18, 18, 0));
  // SLA exploded
  const [dhm, setDhm] = useState({ days: 0, hours: 0, minutes: 0 });
  // Now + SLA
  const [expiry, setExpiry] = useState(now);
  //
  const [request, setRequest] = useState(now);
  //
  const [until, setUntil] = useState(now);

  useEffect(() => {
    // This effect reloads `now` when minute changes
    const to = setTimeout(() => {
      setNow(new Date());
    }, (60 - now.getSeconds()) * 1000);
    return () => clearTimeout(to);
  });

  useEffect(() => {
    // Updates `dhm` when `sla` changes
    setDhm(sla2dhm(sla));
  }, [sla]);

  useEffect(() => {
    // Updates `expiry` when `now` or `dhm` change
    setExpiry(dateAddDhm(now, dhm));
  }, [dhm, now]);

  useEffect(() => {
    // Updates `until` when `request` changes
    setUntil(new Date(+now + (+request - expiry)));
  }, [expiry, now, request]);

  return (
    <BoxContainer>
      <List>
        <ListItem>
          <ListItemText
            primary={formatDate(now)}
            secondary="Actual date and time"
          />
        </ListItem>

        <ListItem>
          <TextField
            fullWidth
            label="Remaining SLA"
            placeholder="E.g. 1d 3h 15m"
            value={sla}
            helperText={dhm2str(dhm)}
            onChange={({ target: { value } }) => setSla(value)}
          />
        </ListItem>

        <ListItem>
          <ListItemText
            primary={expiry ? formatDate(expiry) : ""}
            secondary="Expiry date and time"
          />
        </ListItem>

        <ListItem>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDateTimePicker
              fullWidth
              label="Request expiry date/time"
              format="dd/MM/yyyy HH:mm"
              value={request}
              onChange={r => setRequest(r)}
              error={+request < +expiry}
            />
          </MuiPickersUtilsProvider>
        </ListItem>

        <ListItem>
          <ListItemText primary={formatDate(until)} secondary="Suspend until" />
        </ListItem>
      </List>
    </BoxContainer>
  );
}
