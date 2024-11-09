import React from "react";

import { useTranslation } from "react-i18next";

import { Button, Typography } from "@material-ui/core";

import BoxContainer from "../BoxContainer";
import HashSection from "../HashSection";

export default function HelpContent() {
  const { t } = useTranslation();

  return (
    <BoxContainer>
      <HashSection filter="terms">
        <Typography variant="h6">{t("Help.Content.Terms")}</Typography>
        <Typography paragraph>
          {t("Help.Content.part1")}{" "}
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
            title={t("Help.Content.Read about SLA on Wikipedia")}
          >
            {t("Read more")}
          </Button>
        </Typography>

        <Typography paragraph>{t("Help.Content.part2")}</Typography>

        <Typography paragraph>{t("Help.Content.part3")}</Typography>

        <Typography paragraph>{t("Help.Content.part4")}</Typography>

        <Typography paragraph>{t("Help.Content.part5")}</Typography>
      </HashSection>

      <HashSection filter="sla">
        <Typography variant="h6">
          {t("Help.Content.Fill Remaining SLA field")}
        </Typography>
        <Typography paragraph>{t("Help.Content.part6")}</Typography>

        <Typography component="ul" paragraph>
          <Typography component="li">{t("Help.Content.1 week")}</Typography>
          <Typography component="li">{t("Help.Content.1 day")}</Typography>
          <Typography component="li">
            {t("Help.Content.1 day and 4 hours")}
          </Typography>
          <Typography component="li">
            {t("Help.Content.1 day and 30 minutes")}
          </Typography>
          <Typography component="li">
            {t("Help.Content.1 day and 4 hours and 30 minutes")}
          </Typography>
          <Typography component="li">
            {t("Help.Content.4 hours and 30 minutes")}
          </Typography>
        </Typography>

        <Typography component="div" paragraph>
          <Typography>
            {t(
              "Help.Content.This is the regular expression used to match the field"
            )}
          </Typography>
          <Typography component="pre" paragraph>
            /(\d+\s*[ws])?\s*(\d+\s*[dg])?\s*(\d+\s*[ho])?\s*(\d+\s*m)?/i
          </Typography>
        </Typography>
      </HashSection>
    </BoxContainer>
  );
}
