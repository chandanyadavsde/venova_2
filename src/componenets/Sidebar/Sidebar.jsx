import { useState } from "react";

const Sidebar = ({ selectedStatus, setSelectedStatus, isDetailView, setIsDetailView }) => {
  const statuses = ["All", "New", "Under Review", "Approved", "Rejected", "No Action Taken"];
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div
      className={`h-screen p-6 mt-0 text-white fixed flex flex-col justify-between transition-all duration-500 border-r-2 border-black-200 ${
        isDetailView ? "w-48" : "w-64"
      }`}
      style={{
        
        zIndex:"60"
      }}
    >
      <div>
        {isDetailView ? (
          // Dropdown Menu in Detail View
          // <div className="relative ">
          //   <button
          //     className="p-2 mt-16 rounded bg-[#a5be00] hover:bg-[#2b6c56] hover:border-white transition-colors w-full"
          //     onClick={() => setMenuOpen(!menuOpen)}
          //   >
          //     Click for menu
          //   </button>
          //   {menuOpen && (
          //     <ul className="absolute left-0 mt-8 w-full">
          //       {statuses.map((status) => (
          //         <li
          //           key={status}
          //           className={`text-black p-2 cursor-pointer transition-colors duration-300 ${
          //             selectedStatus === status ? "bg-[#a5be00]" : "hover:bg-[#a5be00]"
          //           }`}
          //           onClick={() => {
          //             setSelectedStatus(status);
          //             setMenuOpen(false);
          //           }}
          //         >
          //           {status}
          //         </li>
          //       ))}
          //     </ul>
          //   )}
          // </div>
          <></>
        ) : (
          // Filters in List View
          <>
            <h2 className="mt-16 text-xl font-semibold mb-4 text-black ">Navigation</h2>
            <ul>
              {statuses.map((status) => (
                <li
                  key={status}
                  className={`text-black mb-3 p-2 rounded cursor-pointer transition-colors duration-300 ${
                    selectedStatus === status ? "bg-[#d9d9d9]" : "hover:bg-[#d9d9d9]"
                  }`}
                  onClick={() => setSelectedStatus(status)}
                >
                  {status}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
      <div className="border-t-2">
        <h1 className="text-black text-3xl font-bold text-center mb-16 text-lg font-bold">&#169;SORIGIN</h1>
      </div>
    </div>
  );
};

export default Sidebar;
