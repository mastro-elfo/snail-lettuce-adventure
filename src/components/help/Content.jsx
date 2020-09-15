import React from "react";

import { Button, Typography } from "@material-ui/core";

import BoxContainer from "../BoxContainer";
import HashSection from "../HashSection";

export default function HelpContent() {
  return (
    <BoxContainer>
      <HashSection filter="terms">
        <Typography variant="h6">Terms</Typography>
        <Typography paragraph>
          "SLA" is the service level agreement.{" "}
          <Button
            variant="outlined"
            color="secondary"
            size="small"
            onClick={() =>
              window.open(
                "https://en.wikipedia.org/wiki/Service-level_agreement",
                "_Wikipedia"
              )
            }
            title="Read about SLA on Wikipedia"
          >
            Read more
          </Button>
        </Typography>

        <Typography paragraph>
          "Remaining SLA" the time left before the current phase expires.
        </Typography>

        <Typography paragraph>
          "Expiry date and time" is the moment when the current phase expires.
          It's simply the sum of actual date/time and the remaining SLA.
        </Typography>

        <Typography paragraph>
          "Request expiry date/time" is the moment when the user wants the
          current phase to expire. This should be after the actual expiry
          date/time and within working hours.
        </Typography>

        <Typography paragraph>
          "Suspend until" is the evaluated moment until a phase should be
          suspended in order to expire at the desired moment.
        </Typography>
      </HashSection>

      <HashSection filter="sla">
        <Typography variant="h6">Fill "Remaining SLA" field</Typography>
        <Typography paragraph>
          This field accepts input in the form "#w #d #h #m" to set in order
          weeks, days, hours and minutes. Put the requested value in place of
          each "#". Each field is optional, but the order is important, see the
          following examples:
        </Typography>

        <Typography component="ul" paragraph>
          <Typography component="li">1 week: "1w"</Typography>
          <Typography component="li">1 day: "1d"</Typography>
          <Typography component="li">1 day and 4 hours: "1d 4h"</Typography>
          <Typography component="li">1 day and 30 minutes: "1d 30m"</Typography>
          <Typography component="li">
            1 day and 4 hours and 30 minutes: "1d 4h 30m"
          </Typography>
          <Typography component="li">
            4 hours and 30 minutes: "4h 30m"
          </Typography>
        </Typography>

        <Typography component="div" paragraph>
          <Typography>
            This is the regular expression used to match the field:
          </Typography>
          <Typography component="pre" paragraph>
            /(\d+\s*w)?\s*(\d+\s*d)?\s*(\d+\s*h)?\s*(\d+\s*m)?/
          </Typography>
        </Typography>
      </HashSection>
    </BoxContainer>
  );
}
