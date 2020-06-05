import React from "react";

import DateFnsUtils from "@date-io/date-fns";
import itLocale from "date-fns/locale/it";

import { Box } from "@material-ui/core";

import { MuiPickersUtilsProvider } from "@material-ui/pickers";

import BoxContainer from "../BoxContainer";

// import HolidaysSection from "./HolidaysSection";
import WorkingHoursSection from "./WorkingHoursSection";

export default function SettingsContent() {
  return (
    <BoxContainer>
      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={itLocale}>
        <WorkingHoursSection />
        {
          // <HolidaysSection />
        }
      </MuiPickersUtilsProvider>

      <Box pt={8} />
    </BoxContainer>
  );
}
