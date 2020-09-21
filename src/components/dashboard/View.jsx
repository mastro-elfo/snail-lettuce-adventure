import React, { useState } from "react";

import Page from "../Page";
import Header from "./Header";
import Content from "./Content";
import Drawer from "./Drawer";

import useNotifyVersion from "./useNotifyVersion";

export default function DashboardView() {
  useNotifyVersion();
  const [open, setOpen] = useState(false);

  return (
    <Page
      header={<Header onOpen={() => setOpen(true)} />}
      content={<Content />}
      drawer={
        <Drawer
          open={open}
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
        />
      }
    />
  );
}
