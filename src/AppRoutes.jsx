import { useState } from "react";
import Sidebar from "./componenets/Sidebar/Sidebar";
import Topbar from "./componenets/Topbar/Topbar";
import VendorList from "./componenets/VendorList/VendorList";
import VendorDetail from "./componenets/VendorDetail/VendorDetail";
import { Routes,Route } from "react-router-dom";
const AppRoutes = () => {
    const [selectedStatus, setSelectedStatus] = useState("All");
    const [isDetailView, setIsDetailView] = useState(false);
    const [newVendorCount, setNewVendorCount] = useState(0);
  
    return (
      <div className="flex">
        <Sidebar
          selectedStatus={selectedStatus}
          setSelectedStatus={setSelectedStatus}
          isDetailView={isDetailView}
          setIsDetailView={setIsDetailView}
          />
        <Topbar  newVendorCount={newVendorCount}/>
        <Routes>
        <Route
    path="/vendors/:business_vertical"
    element={
      <VendorList
      selectedStatus={selectedStatus}
      setSelectedStatus={setSelectedStatus}
      setNewVendorCount={setNewVendorCount}
        setIsDetailView={setIsDetailView} // Pass setIsDetailView here
      />
    }
  />
          <Route
            path="/vendors/details/:id"
            element={<VendorDetail setIsDetailView={setIsDetailView} />}
          />
        </Routes>
      </div>
    );
  };

  export default AppRoutes