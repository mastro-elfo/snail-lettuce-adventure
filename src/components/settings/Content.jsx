import React, { useEffect, useState } from "react";

import DateFnsUtils from "@date-io/date-fns";
import itLocale from "date-fns/locale/it";

import { Checkbox, Grid } from "@material-ui/core";

import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker
} from "@material-ui/pickers";

import BoxContainer from "../BoxContainer";

import { getWeek, set as setSettings } from "./fn";

export default function SettingsContent() {
  const [week, setWeek] = useState(getWeek());

  useEffect(() => {
    setSettings("week", week);
  }, [week]);

  const handleChange = (weekday, config) => {
    setWeek({ ...week, [weekday]: config });
  };

  return (
    <BoxContainer>
      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={itLocale}>
        <Grid container spacing={2}>
          <Weekday
            weekday="monday"
            config={week.monday}
            onChange={handleChange}
          />
          <Weekday
            weekday="tuesday"
            config={week.tuesday}
            onChange={handleChange}
          />
          <Weekday
            weekday="wednesday"
            config={week.wednesday}
            onChange={handleChange}
          />
          <Weekday
            weekday="thursday"
            config={week.thursday}
            onChange={handleChange}
          />
          <Weekday
            weekday="friday"
            config={week.friday}
            onChange={handleChange}
          />
          <Weekday
            weekday="saturday"
            config={week.saturday}
            onChange={handleChange}
          />
          <Weekday
            weekday="sunday"
            config={week.sunday}
            onChange={handleChange}
          />
        </Grid>
      </MuiPickersUtilsProvider>
    </BoxContainer>
  );
}

const LABELS = {
  monday: "monday",
  tuesday: "tuesday",
  wednesday: "wednesday",
  thursday: "thursday",
  friday: "friday",
  saturday: "saturday",
  sunday: "sunday"
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
  weekday,
  onChange
}) => {
  const handleChange = (property, value) => {
    onChange(weekday, {
      morning,
      morningStart,
      morningEnd,
      evening,
      eveningStart,
      eveningEnd,
      [property]: value
    });
  };

  return (
    <Grid item container alignItems="center" xs={12}>
      <Grid item container xs={12} sm={1} justify="flex-end">
        <Checkbox
          checked={morning}
          onChange={() => handleChange("morning", !morning)}
        />
      </Grid>
      <Grid item container alignItems="center" xs={12} sm={5}>
        <Item
          id="morningStart"
          label={`Start ${LABELS[weekday]} morning`}
          value={new Date(morningStart)}
          disabled={!morning}
          onChange={handleChange}
        />
        <Item
          id="morningEnd"
          label={`End ${LABELS[weekday]} morning`}
          value={new Date(morningEnd)}
          disabled={!morning}
          onChange={handleChange}
        />
      </Grid>
      <Grid item container xs={12} sm={1} justify="flex-end">
        <Checkbox
          checked={evening}
          onChange={() => handleChange("evening", !evening)}
        />
      </Grid>
      <Grid item container alignItems="center" xs={12} sm={5}>
        <Item
          id="eveningStart"
          label={`Start ${LABELS[weekday]} evening`}
          value={new Date(eveningStart)}
          disabled={!evening}
          onChange={handleChange}
        />
        <Item
          id="eveningEnd"
          label={`End ${LABELS[weekday]} evening`}
          value={new Date(eveningEnd)}
          disabled={!evening}
          onChange={handleChange}
        />
      </Grid>
    </Grid>
  );
};

const Item = ({ id, onChange, ...others }) => {
  const handleChange = r => {
    onChange(id, r.toISOString());
  };

  return (
    <Grid item xs={12} md={6}>
      <KeyboardTimePicker
        fullWidth
        ampm={false}
        format="HH:mm"
        {...others}
        onChange={handleChange}
      />
    </Grid>
  );
};
