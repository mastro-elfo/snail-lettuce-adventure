import React from "react";

import { useTranslation } from "react-i18next";

import { Button, Typography } from "@material-ui/core";

import BoxContainer from "../BoxContainer";
import HashSection from "../HashSection";

export default function HelpContent() {
  const { t } = useTranslation(["common", "help"]);
  return (
    <BoxContainer>
      <HashSection filter="terms">
        <Typography variant="h6">{t("Terms")}</Typography>
        <Typography paragraph>
          {t("help:Content.part1")}{" "}
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
            title={t("help:Content.Read about SLA on Wikipedia")}
          >
            {t("Read more")}
          </Button>
        </Typography>

        <Typography paragraph>{t("help:Content.part2")}</Typography>

        <Typography paragraph>{t("help:Content.part3")}</Typography>

        <Typography paragraph>{t("help:Content.part4")}</Typography>

        <Typography paragraph>{t("help:Content.part5")}</Typography>
      </HashSection>

      <HashSection filter="sla">
        <Typography variant="h6">
          {t("help:Content.Fill Remaining SLA field")}
        </Typography>
        <Typography paragraph>{t("help:Content.part6")}</Typography>

        <Typography component="ul" paragraph>
          <Typography component="li">{t("help:Content.1 week")}</Typography>
          <Typography component="li">{t("help:Content.1 day")}</Typography>
          <Typography component="li">
            {t("help:Content.1 day and 4 hours")}
          </Typography>
          <Typography component="li">
            {t("help:Content.1 day and 30 minutes")}
          </Typography>
          <Typography component="li">
            {t("help:Content.1 day and 4 hours and 30 minutes")}
          </Typography>
          <Typography component="li">
            {t("help:Content.4 hours and 30 minutes")}
          </Typography>
        </Typography>

        <Typography component="div" paragraph>
          <Typography>
            {t(
              "help:Content.This is the regular expression used to match the field"
            )}
          </Typography>
          <Typography component="pre" paragraph>
            {t("help:Content.regexp")}
          </Typography>
        </Typography>
      </HashSection>
    </BoxContainer>
  );
}
