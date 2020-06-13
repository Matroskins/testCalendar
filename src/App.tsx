import React, { useEffect } from "react";
import { clearAllEvents, setAllEvents } from "./backendSimulation/api";
import Portal from "./ui/portal/Portal";
import { Popover } from "./ui/popover/Popover";
import CalendarNotes from "./components/eventsCalendar";
import "./App.css";

const App = (props) => {
  useEffect(() => {
    setAllEvents([]);
    return () => {
      clearAllEvents();
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
