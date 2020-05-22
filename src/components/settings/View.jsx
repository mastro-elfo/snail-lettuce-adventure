import React from "react";

import Page from "../Page";
import Header from "./Header";
import Content from "./Content";

export default function SettingsView() {
  return <Page header={<Header />} content={<Content />} />;
}
