import React, { createContext, useState } from "react";

const DateContext = createContext({
  date: null,
  setDate: () => {},
});

const DateProvider = ({ children }) => {
  const [date, setDate] = useState(null);

  return (
    <DateContext.Provider value={{ date, setDate }}>
      {children}
    </DateContext.Provider>
  );
};

export { DateContext, DateProvider };
