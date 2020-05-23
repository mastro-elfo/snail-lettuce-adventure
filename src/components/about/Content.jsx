import React from "react";

// import { Typography } from "@material-ui/core";

import BoxContainer from "../BoxContainer";
import Markdown from "../Markdown";

export default function AboutContent() {
  return (
    <BoxContainer>
      <Markdown source={md} />
    </BoxContainer>
  );
}

const md = `
### New in version 1.1

* Actual date and time freeze on load and can be reload with a button;
* Remaining SLA now supports weeks;
* Calendars and clocks have european format: weeks start on monday and time is 24h.
`;
