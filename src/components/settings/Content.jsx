import React from "react";

import DateFnsUtils from "@date-io/date-fns";
import itLocale from "date-fns/locale/it";

import { Checkbox, Grid, Typography } from "@material-ui/core";

import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker
} from "@material-ui/pickers";

import BoxContainer from "../BoxContainer";

export default function SettingsContent() {
  const week = {
    monday: {
      morning: true,
      morningStart: "2020-01-01T08:30",
      morningEnd: "2020-01-01T12:30",
      evening: true,
      eveningStart: "2020-01-01T14:30",
      eveningEnd: "2020-01-01T18:30"
    },
    tuesday: {
      morning: true,
      morningStart: "2020-01-01T08:30",
      morningEnd: "2020-01-01T12:30",
      evening: true,
      eveningStart: "2020-01-01T14:30",
      eveningEnd: "2020-01-01T18:30"
    },
    wednesday: {
      morning: true,
      morningStart: "2020-01-01T08:30",
      morningEnd: "2020-01-01T12:30",
      evening: true,
      eveningStart: "2020-01-01T14:30",
      eveningEnd: "2020-01-01T18:30"
    },
    thursday: {
      morning: true,
      morningStart: "2020-01-01T08:30",
      morningEnd: "2020-01-01T12:30",
      evening: true,
      eveningStart: "2020-01-01T14:30",
      eveningEnd: "2020-01-01T18:30"
    },
    friday: {
      morning: true,
      morningStart: "2020-01-01T08:30",
      morningEnd: "2020-01-01T12:30",
      evening: true,
      eveningStart: "2020-01-01T14:30",
      eveningEnd: "2020-01-01T18:30"
    },
    saturday: {
      morning: true,
      morningStart: "2020-01-01T08:30",
      morningEnd: "2020-01-01T12:30",
      evening: false,
      eveningStart: "2020-01-01T14:30",
      eveningEnd: "2020-01-01T18:30"
    },
    sunday: {
      morning: false,
      morningStart: "2020-01-01T08:30",
      morningEnd: "2020-01-01T12:30",
      evening: false,
      eveningStart: "2020-01-01T14:30",
      eveningEnd: "2020-01-01T18:30"
    }
  };

  return (
    <BoxContainer>
      <Typography>Work in progress...</Typography>
      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={itLocale}>
        <Grid container spacing={2}>
          <Weekday weekday="monday" config={week.monday} />
          <Weekday weekday="tuesday" config={week.tuesday} />
          <Weekday weekday="wednesday" config={week.wednesday} />
          <Weekday weekday="thursday" config={week.thursday} />
          <Weekday weekday="friday" config={week.friday} />
          <Weekday weekday="saturday" config={week.saturday} />
          <Weekday weekday="sunday" config={week.sunday} />
        </Grid>
      </MuiPickersUtilsProvider>
    </BoxContainer>
  );
}

const LABELS = {
  monday: "lunedì",
  tuesday: "martedì",
  wednesday: "mercoledì",
  thursday: "giovedì",
  friday: "venerdì",
  saturday: "sabato",
  sunday: "domenica"
};

const Weekday = ({
  config: {
    morning,
    morningStart,
    morningEnd,
    evening,
    eveningStart,
    eveningEnd
  },
  weekday
}) => (
  <Grid item container alignItems="center" xs={12}>
    <Grid item container xs={12} sm={1} justify="flex-end">
      <Checkbox checked={morning} />
    </Grid>
    <Grid item container alignItems="center" xs={12} sm={5}>
      <Item
        label={`Inizio ${LABELS[weekday]} mattina`}
        value={new Date(morningStart)}
        disabled={!morning}
      />
      <Item
        label={`Fine ${LABELS[weekday]} mattina`}
        value={new Date(morningEnd)}
        disabled={!morning}
      />
    </Grid>
    <Grid item container xs={12} sm={1} justify="flex-end">
      <Checkbox checked={evening} />
    </Grid>
    <Grid item container alignItems="center" xs={12} sm={5}>
      <Item
        label={`Inizio ${LABELS[weekday]} pomeriggio`}
        value={new Date(eveningStart)}
        disabled={!evening}
      />
      <Item
        label={`Fine ${LABELS[weekday]} pomeriggio`}
        value={new Date(eveningEnd)}
        disabled={!evening}
      />
    </Grid>
  </Grid>
);

const Item = props => (
  <Grid item xs={12} md={6}>
    <KeyboardTimePicker fullWidth ampm={false} format="HH:mm" {...props} />
  </Grid>
);
