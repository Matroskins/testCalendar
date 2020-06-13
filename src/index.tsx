import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { EventsCalendarProvider } from "./components/eventsCalendar/context/EventsCalendarContext";
import { PopoverProvider } from "./ui/popover/PopoverContext";
import { UiContextProvider } from "./ui/context";
// import { EventPopoverProvider } from "./components/eventPopover/EventPopoverContext";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <React.StrictMode>
    <UiContextProvider>
      <EventsCalendarProvider>
        <PopoverProvider>
          <App />
        </PopoverProvider>
      </EventsCalendarProvider>
    </UiContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
