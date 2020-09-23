import React from "react";

import ErrorWrapper from "./components/ErrorWrapper";
import NotifyWrapper from "./components/NotifyWrapper";
import SuspenseWrapper from "./components/SuspenseWrapper";
import ThemeWrapper from "./components/ThemeWrapper";

import Router from "./components/Router";

export default function App() {
  return (
    <ThemeWrapper>
      <SuspenseWrapper>
        <ErrorWrapper>
          <NotifyWrapper>
            <Router />
          </NotifyWrapper>
        </ErrorWrapper>
      </SuspenseWrapper>
    </ThemeWrapper>
  );
}
