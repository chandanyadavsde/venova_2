import Topbar from "./Topbar";
const Dashboard = () => (
    <div className="ml-64 p-6">
      <Topbar />
      
      {/* Cards Section */}
      <div className="flex space-x-6 mt-6">
        {['New', 'Under Review', 'Approved'].map((status, index) => (
          <div key={index} className="flex-1 bg-white p-6 shadow rounded-lg text-center">
            <h2 className="text-xl font-bold">{status}</h2>
            <p className="text-gray-500 text-lg">10</p>
          </div>
        ))}
      </div>
  
      {/* Table Section */}
      <div className="mt-8 bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-xl font-bold mb-4">Vendor List</h2>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="border-b p-3">Vendor Name</th>
              <th className="border-b p-3">Status</th>
              <th className="border-b p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {[...Array(5)].map((_, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="border-b p-3">Vendor {index + 1}</td>
                <td className="border-b p-3">New</td>
                <td className="border-b p-3">
                  <button className="bg-blue-500 text-white px-3 py-1 rounded">View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

export default Dashboard