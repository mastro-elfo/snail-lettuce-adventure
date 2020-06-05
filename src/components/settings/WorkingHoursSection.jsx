import React, { useEffect, useState } from "react";

import { Box, Checkbox, Collapse, Grid, Typography } from "@material-ui/core";

import { KeyboardTimePicker } from "@material-ui/pickers";

import { getWeek, set as setSettings, validate } from "./fn";

export default function WorkingHoursSection() {
  const [week, setWeek] = useState(getWeek());

  useEffect(() => {
    setSettings("week", week);
  }, [week]);

  const handleChange = (weekday, config) => {
    setWeek({ ...week, [weekday]: config });
  };

  const valid = validate(week);

  return (
    <Box py={1}>
      <Typography variant="h6">Working hours</Typography>

      <Collapse in={!valid}>
        <Typography color="error">
          There's an error in the configuration, please check the following:
        </Typography>
        <Typography component="ul" color="error">
          <Typography component="li">
            At least 1 interval must be active;
          </Typography>
          <Typography component="li">
            Every end must be greater than the corresponding start;
          </Typography>
          <Typography component="li">
            For each day evening time must be greater than morning's.
          </Typography>
        </Typography>
      </Collapse>

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
    </Box>
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

const Weekday = ({ config, weekday, onChange }) => {
  const handleChange = value => {
    onChange(weekday, {
      ...config,
      ...value
    });
  };

  const {
    morning,
    morningStart,
    morningEnd,
    evening,
    eveningStart,
    eveningEnd
  } = config;

  return (
    <Grid item container alignItems="center" xs={12}>
      <Grid item container xs={12} sm={1} justify="flex-end">
        <Checkbox
          checked={morning}
          onChange={() => handleChange({ morning: !morning })}
        />
      </Grid>
      <Grid item container alignItems="center" xs={12} sm={5}>
        <Item
          id="morningStart"
          label={`Start ${LABELS[weekday]} morning`}
          value={new Date(`2020-01-01T${morningStart}`)}
          disabled={!morning}
          onChange={handleChange}
        />
        <Item
          id="morningEnd"
          label={`End ${LABELS[weekday]} morning`}
          value={new Date(`2020-01-01T${morningEnd}`)}
          disabled={!morning}
          onChange={handleChange}
        />
      </Grid>
      <Grid item container xs={12} sm={1} justify="flex-end">
        <Checkbox
          checked={evening}
          onChange={() => handleChange({ evening: !evening })}
        />
      </Grid>
      <Grid item container alignItems="center" xs={12} sm={5}>
        <Item
          id="eveningStart"
          label={`Start ${LABELS[weekday]} evening`}
          value={new Date(`2020-01-01T${eveningStart}`)}
          disabled={!evening}
          onChange={handleChange}
        />
        <Item
          id="eveningEnd"
          label={`End ${LABELS[weekday]} evening`}
          value={new Date(`2020-01-01T${eveningEnd}`)}
          disabled={!evening}
          onChange={handleChange}
        />
      </Grid>
    </Grid>
  );
};

const Item = ({ id, onChange, ...others }) => {
  const handleChange = r => {
    onChange({
      [id]: r.toLocaleString(undefined, {
        hour: "2-digit",
        minute: "2-digit",
        timeStyle: "short"
      }),
      [`${id}Hour`]: r.getHours(),
      [`${id}Minute`]: r.getMinutes()
    });
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
