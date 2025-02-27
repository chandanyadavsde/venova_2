const Sidebar = () => (
    <div className="w-64 bg-gray-800 h-screen p-5 text-white fixed">
      <h2 className="text-xl font-bold mb-5">Dashboard</h2>
      <ul>
        <li className="mb-3 p-2 hover:bg-gray-700 rounded cursor-pointer">Home</li>
        <li className="mb-3 p-2 hover:bg-gray-700 rounded cursor-pointer">Vendors</li>
        <li className="mb-3 p-2 hover:bg-gray-700 rounded cursor-pointer">Settings</li>
      </ul>
    </div>
  );

export default Sidebar; 