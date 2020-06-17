import React, { useEffect } from "react";
import { clearAllEvents_api, setAllEvents_api } from "./backendSimulation/api";
import Portal from "./ui/portal/Portal";
import { Popover } from "./ui/popover/Popover";
import CalendarNotes from "./components/eventsCalendar";
import "./App.css";

const App = (props) => {
  useEffect(() => {
    setAllEvents_api({});
    return () => {
      clearAllEvents_api();
    };
  }, []);
  return (
    <>
      <CalendarNotes />
      <Portal>
        <Popover />
      </Portal>
    </>
  );
};

export default App;
