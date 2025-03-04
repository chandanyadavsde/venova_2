const Sidebar = ({ selectedStatus, setSelectedStatus, isDetailView, setIsDetailView }) => {
    const statuses = ["All", "New", "In Progress", "Approved", "Rejected"];
  
    return (
      <div
        className={`h-screen p-6 mt-16 text-white fixed flex flex-col justify-between transition-all duration-500 ${
          isDetailView ? "w-48" : "w-64"
        }`}
        style={{
          background: "linear-gradient(180deg, #50808e, #2B6C56)",
        }}
      >
        <div>
          {isDetailView ? (
            // Show "View List" when in Detail View
            <button
              className="p-2 rounded bg-[#a5be00] hover:bg-[#2b6c56] hover:border-white transition-colors w-full"
            >
            
              Click for menu
            </button>
          ) : (
            // Show Filters in List View
            <>
              <h2 className="text-xl font-bold mb-4">Filter by Status</h2>
              <ul>
                {statuses.map((status) => (
                  <li
                    key={status}
                    className={`mb-3 p-2 rounded cursor-pointer transition-colors duration-300 ${
                      selectedStatus === status ? "bg-[#a5be00]" : "hover:bg-[#a5be00]"
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
  
        <h1 className="text-3xl font-bold text-center mb-16 text-lg font-bold">&#169;SORIGIN</h1>
        </div>
      </div>
    );
  };

  export default Sidebar