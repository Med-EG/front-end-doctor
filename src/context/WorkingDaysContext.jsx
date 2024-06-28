import React, { createContext, useState } from "react";

export const WorkingDaysContext = createContext();

export const WorkingDaysProvider = ({ children }) => {
  const [workingDays, setWorkingDays] = useState([]);
  const [newDays, setNewDays] = useState([]);

  const addNewDay = (day) => {
    setNewDays([...newDays, day]);
  };

  const saveNewDays = (days) => {
    setNewDays(days);
  };

  return (
    <WorkingDaysContext.Provider
      value={{ workingDays, newDays, addNewDay, saveNewDays }}
    >
      {children}
    </WorkingDaysContext.Provider>
  );
};
