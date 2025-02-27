import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import logo from  "./logo.png"

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
            className="p-2 rounded bg-gray-600 hover:bg-gray-700 transition-colors w-full"
            onClick={() => setIsDetailView(false)}
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
                    selectedStatus === status ? "bg-green-500" : "hover:bg-green-500"
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



const Topbar = () => (
  <div
    className="p-4 fixed top-0 left-0 w-full flex justify-between items-center shadow-md z-10"
    style={{
      background: "linear-gradient(90deg, #50808e, #3A8A73)", // Adjust the gradient as needed
      color: "#fff",
    }}
  >
  <img src={logo} alt="logo" className="w-32 h-12 " />
    {/* <h1 className="text-2xl font-bold mx-auto">Vendor Management</h1> */}
    <button className="bg-white text-green-600 px-4 py-2 rounded mr-5">Logout</button>
  </div>
);

const endpoint = "http://localhost:4500/vendors";

const VendorList = ({ selectedStatus, setSelectedStatus, setIsDetailView }) => {
  const { business_vertical } = useParams();
  const navigate = useNavigate();
  const [vendors, setVendors] = useState([]);

  useEffect(() => {
    fetch(`${endpoint}/${business_vertical}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setVendors(data.vendors.reverse());
        }
      })
      .catch((error) => console.error("Error fetching vendors:", error));
  }, [business_vertical]);

  const handleVendorClick = (id, status) => {
    if (status === "New") {
      fetch(`${endpoint}/details/${id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setVendors((prevVendors) =>
              prevVendors.map((vendor) =>
                vendor._id === id ? { ...vendor, status: "In Progress" } : vendor
              )
            );
          }
        })
        .catch((error) => console.error("Error updating status:", error));
    }
    setIsDetailView(true); // Set isDetailView to true
    navigate(`/vendors/details/${id}`);
  };

  // Count vendors by status
  const statusCounts = {
    All: vendors.length,
    New: vendors.filter((v) => v.status === "New").length,
    InProgress: vendors.filter((v) => v.status === "In Progress").length,
    Approved: vendors.filter((v) => v.status === "Approved").length,
    Rejected: vendors.filter((v) => v.status === "Rejected").length,
  };

  const filteredVendors =
  selectedStatus === "All"
    ? vendors
    : vendors.filter((vendor) => vendor.status === selectedStatus);

  return (
    <div className="max-w-8xl w-full mx-auto p-2">
    <div className="ml-80 mt-4 p-16">
  <h2 className="text-xl font-bold mb-4">{business_vertical.toUpperCase()} Vendors</h2>

  {/* Status Summary Cards */}
  <div className="grid grid-cols-5 gap-4 mb-2 p-2 bg-[#f8f9fa] shadow-md rounded-lg border border-[#dee2e6] ">
  {[
    { label: "All", count: statusCounts.All, bg: "bg-[#1d4ed8]" }, // Blue
    { label: "New", count: statusCounts.New, bg: "bg-[#f59e0b]" }, // Yellow
    { label: "In Progress", count: statusCounts.InProgress, bg: "bg-[#ea580c]" }, // Orange
    { label: "Approved", count: statusCounts.Approved, bg: "bg-[#16a34a]" }, // Green
    { label: "Rejected", count: statusCounts.Rejected, bg: "bg-[#dc2626]" }, // Red
  ].map(({ label, count, bg }) => (
    <div
      key={label}
      className={`p-2 ${bg} text-white rounded-md shadow-md text-center transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg`}
    >
      <h3 className="text-lg font-semibold">{label}</h3>
      <p className="text-2xl font-bold">{count}</p>
    </div>
  ))}
</div>


  {/* Vendors Table */}
  <div className="shadow-lg rounded-lg p-6 w-full mx-auto bg-white border border-[#dee2e6]">
  <table className="w-full text-left border-collapse">
    <thead className="bg-[#343a40] text-white">
      <tr>
        <th className="border-b p-2">Vendor Name</th>
        <th className="border-b p-2">Status</th>
        <th className="border-b p-2">Details</th>
      </tr>
    </thead>
    <tbody>
  {filteredVendors.map((vendor) => (
    <tr
      key={vendor._id}
      onClick={() => handleVendorClick(vendor._id, vendor.status)}
      className="hover:bg-[#e9ecef] cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105"
    >
      <td className="border-b p-2 transition-all duration-300">{vendor.vendor_name}</td>
      <td
  className={`border-b p-2 font-semibold transition-all duration-300 
    ${
      vendor.status === "New"
        ? "text-[#f59e0b] drop-shadow-[0_0_5px_#f59e0b]"
        : vendor.status === "In Progress"
        ? "text-[#ea580c] drop-shadow-[0_0_5px_#ea580c]"
        : vendor.status === "Approved"
        ? "text-[#16a34a] drop-shadow-[0_0_5px_#16a34a]"
        : vendor.status === "Rejected"
        ? "text-[#dc2626] drop-shadow-[0_0_5px_#dc2626]"
        : "text-white bg-[#1d4ed8] drop-shadow-[0_0_5px_#1d4ed8]"
    }`}
>
  {vendor.status}
</td>

      <td className="border-b p-2 transition-all duration-300">
        <button className="bg-[#198754] hover:bg-[#157347] text-white px-3 py-1 rounded transition-all duration-300">
          View Details →
        </button>
      </td>
    </tr>
  ))}
</tbody>
  </table>
  {filteredVendors.length === 0 && (
    <p className="text-gray-500 text-center mt-4">No vendors found.</p>
  )}
</div>

</div>
</div>

  );
};
// skeleton card
import "./Skeleton.css"
const SkeletonCard = () => (
  <div className="shadow-lg rounded-lg p-6 w-full mx-auto bg-white border border-[#dee2e6]">
    <div className="skeleton-card h-8 w-48 mb-6"></div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <div className="skeleton-card h-6 w-32 mb-4"></div>
        <div className="skeleton-card h-6 w-48 mb-4"></div>
        <div className="skeleton-card h-6 w-64 mb-4"></div>
        <div className="skeleton-card h-6 w-24 mb-4"></div>
      </div>
      <div>
        <div className="skeleton-card h-6 w-48 mb-4"></div>
        <div className="skeleton-card h-6 w-32 mb-4"></div>
        <div className="skeleton-card h-6 w-24 mb-4"></div>
      </div>
    </div>
    <div className="mt-8 flex justify-end space-x-4">
      <div className="skeleton-card h-10 w-24"></div>
      <div className="skeleton-card h-10 w-24"></div>
    </div>
  </div>
);
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const VendorDetail = ({ setIsDetailView }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [vendor, setVendor] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [isApproving, setIsApproving] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:4500/vendors/details/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setVendor(data.vendor);
        }
      })
      .catch((error) => console.error("Error fetching vendor details:", error));
  }, [id]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
    }
  };

  const updateVendorStatus = (newStatus) => {
    if (newStatus === "Approved" && !imageFile) {
      alert("Please attach an image to approve.");
      return;
    }

    const formData = new FormData();
    formData.append("status", newStatus);
    if (imageFile) {
      formData.append("image", imageFile);
    }

    fetch(`http://localhost:4500/vendors/${id}/status`, {
      method: "PATCH",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setVendor({ ...vendor, status: newStatus });
          navigate(-1);
        }
      })
      .catch((error) => console.error("Error updating status:", error));
  };

  return (
    <div className="ml-64 mt-16 p-12 flex justify-center">
      <div className="w-[1000px] min-w-[500px] max-w-[1000px] mx-auto relative">
        {/* Close Button */}
        <button
          onClick={() => {
            setIsDetailView(false);
            navigate(-1);
          }}
          className="absolute top-4 right-4 bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded-md"
        >
          Close
        </button>

        {/* Skeleton or Vendor Details */}
        {!vendor ? (
          <SkeletonCard /> // Show skeleton while loading
        ) : (
          <div className="shadow-lg rounded-lg p-6 w-full mx-auto bg-white border border-[#dee2e6]">
            <h2 className="text-3xl font-bold mb-6 border-b pb-2">Vendor Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-800">
              <div>
                <p className="mb-2">
                  <span className="font-semibold">Vendor Name:</span> {vendor.vendor_name}
                </p>
                <p className="mb-2">
                  <span className="font-semibold">Phone Number:</span> {vendor.phone_no}
                </p>
                <p className="mb-2">
                  <span className="font-semibold">Email:</span> {vendor.email}
                </p>
                <p className="mb-2">
                  <span className="font-semibold">State:</span> {vendor.state}
                </p>
              </div>
              <div>
                <p className="mb-2">
                  <span className="font-semibold">Office Address:</span> {vendor.office_address}
                </p>
                <p className="mb-2">
                  <span className="font-semibold">Services:</span> {vendor.select_service}
                </p>
                <p className="mb-2">
                  <span className="font-semibold">Status:</span>
                  <span
                    className={`px-2 py-1 rounded text-sm font-bold ${
                      vendor.status.toLowerCase() === "approved"
                        ? "bg-green-500 text-white"
                        : vendor.status.toLowerCase() === "rejected"
                        ? "bg-red-500 text-white"
                        : "bg-gray-400 text-white"
                    }`}
                  >
                    {vendor.status}
                  </span>
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex justify-end space-x-4">
              <button
                onClick={() => updateVendorStatus("Rejected")}
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg"
              >
                Reject
              </button>
              <button
                onClick={() => setIsApproving(!isApproving)}
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg"
              >
                Approve
              </button>
            </div>

            {/* Image Upload for Approval */}
            {isApproving && (
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700">
                  Attach Image for Approval
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="mt-2 block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                />
                <button
                  onClick={() => updateVendorStatus("Approved")}
                  className="mt-4 bg-[#2B6C56] hover:bg-blue-600 text-white px-6 py-3 rounded-lg"
                >
                  Submit Approval
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};




const App = () => {
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [isDetailView, setIsDetailView] = useState(false);

  return (
    <div className="flex">
      <Sidebar
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
        isDetailView={isDetailView}
        setIsDetailView={setIsDetailView}
      />
      <Topbar />
      <Routes>
      <Route
  path="/vendors/:business_vertical"
  element={
    <VendorList
      selectedStatus={selectedStatus}
      setSelectedStatus={setSelectedStatus}
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

export default App;