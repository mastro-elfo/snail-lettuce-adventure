// TODO: complete

import React, { useEffect, useState } from "react";

import { Box, Checkbox, Grid, Typography } from "@material-ui/core";

import { KeyboardDatePicker } from "@material-ui/pickers";

import { getHolidays, set as setSettings } from "./fn";

export default function HolidaysSection() {
  const [holidays, setHolidays] = useState(getHolidays());

  useEffect(() => {
    setSettings("holidays", holidays);
  }, [holidays]);

  const handleChange = () => {};

  return (
    <Box py={1}>
      <Typography variant="h6">Holidays</Typography>

      <Grid container spacing={2}>
        {Object.keys(holidays).map(key => (
          <Item key={key} config={holidays[key]} />
        ))}
      </Grid>
    </Box>
  );
}

const Item = ({ config: { active, title, month, day } }) => {
  const handleChange = () => {};
  return (
    <Grid item container alignItems="center" xs={12} sm={6}>
      <Grid item container xs={12} sm={2} justify="flex-end">
        <Checkbox checked={active} onChange={handleChange} />
      </Grid>
      <Grid item container alignItems="center" xs={12} sm={10}>
        <KeyboardDatePicker
          fullWidth
          format="dd MMMM"
          views={["month", "date"]}
          onChange={handleChange}
          label={title}
          value={new Date(2020, month, day)}
        />
      </Grid>
    </Grid>
  );
};
