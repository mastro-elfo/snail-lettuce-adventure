import React from "react";

import { Typography } from "@material-ui/core";

import BoxContainer from "../BoxContainer";

export default function HelpContent() {
  return (
    <BoxContainer>
      <Typography variant="h6">Fill "Remaining SLA" field</Typography>
      <Typography>
        This field accepts input in the form "#w #d #h #m" to set in order
        weeks, days, hours and minutes. Put the requested value in place of each
        "#". Each field is optional, but the order is important, see the
        following examples:
      </Typography>

      <Typography component="ul">
        <Typography component="li">1 week: "1w"</Typography>
        <Typography component="li">1 day: "1d"</Typography>
        <Typography component="li">1 day and 4 hours: "1d 4h"</Typography>
        <Typography component="li">1 day and 30 minutes: "1d 30m"</Typography>
        <Typography component="li">
          1 day and 4 hours and 30 minutes: "1d 4h 30m"
        </Typography>
        <Typography component="li">4 hours and 30 minutes: "4h 30m"</Typography>
      </Typography>

      <Typography>
        This is the regular expression used to match the field:
      </Typography>
      <Typography component="pre">/(\d+\s*d)?\s*(\d+h)?\s*(\d+m)?/</Typography>
    </BoxContainer>
  );
}
