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
### New in version 1.6.1

* Notify when a new version is released and installed;
* A new beautiful icon.

### New in version 1.6

* Fix: wrong "suspend until" evaluation when "actual date/time" is out of working hours;
* Fix reload button in error page not reloading;
* Update regular expression with spaces between digits and letters.

### New in version 1.5

* Fix bug: TypeError: can't set option weekday when dateStyle or timeStyle is used.

### New in version 1.4

* Add validation of working hours;
* Also display a message if validation fails;
* Add "Terms" sections to help page.

### New in version 1.3

* Bug fix.

### New in version 1.2

* When a date/time is out of working hour text is red and shows a message;
* Add working hour table under settings;
* Correct evaluation of "Suspend until" date/time.

### New in version 1.1

* Actual date and time freeze on load and can be reload with a button;
* Remaining SLA now supports weeks;
* Calendars and clocks have european format: weeks start on monday and time is 24h.
`;
