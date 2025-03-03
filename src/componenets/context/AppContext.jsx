import { createContext, useState } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [isDetailView, setIsDetailView] = useState(false);

  return (
    <AppContext.Provider value={{ selectedStatus, setSelectedStatus, isDetailView, setIsDetailView }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;