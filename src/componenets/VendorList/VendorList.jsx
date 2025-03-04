import { useParams,useNavigate } from "react-router-dom";
import { ENDPOINT } from "../constant/constants";
import {useState,useEffect} from "react"
const VendorList = ({ selectedStatus, setSelectedStatus, setIsDetailView,setNewVendorCount  }) => {
    const { business_vertical } = useParams();
    const navigate = useNavigate();
    const [vendors, setVendors] = useState([]);
  
    useEffect(() => {
      fetch(`${ENDPOINT}/${business_vertical}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setVendors(data.vendors.reverse());
            setNewVendorCount(data.vendors.filter((v) => v.status === "New").length);
            console.log(data.vendors.filter((v) => v.status === "New").length)
          }
        })
        .catch((error) => console.error("Error fetching vendors:", error));
    }, [business_vertical,setNewVendorCount]);
  
    const handleVendorClick = (id, status) => {
      if (status === "New") {
        fetch(`${ENDPOINT}/details/${id}`)
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
    <h2 className="text-3xl font-bold mb-4 text-[#50808e]">{business_vertical.toUpperCase()} VENDORS</h2>
  
    {/* Status Summary Cards */}
    <div className="grid grid-cols-5 gap-4 mb-2 p-2 bg-[#f8f9fa] shadow-md rounded-lg border border-[#dee2e6] ">
    {[
      { label: "All", count: statusCounts.All, bg: "bg-[#5bc0eb]" }, // Blue
      { label: "New", count: statusCounts.New, bg: "bg-[#f9c80e]" }, // Yellow
      { label: "In Progress", count: statusCounts.InProgress, bg: "bg-[#ff9f1c]" }, // Orange
      { label: "Approved", count: statusCounts.Approved, bg: "bg-[#a5be00]" }, // Green
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
      <thead className="bg-[#343a40] text-white"
       style={{
        background: "linear-gradient(180deg, #50808e, #2B6C56)",
      }}>
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
        <td className=" text-[#50808e] font-semibold border-b p-2 transition-all duration-300">{vendor.vendor_name}</td>
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
          <button className="hover:bg-[#157347] text-white px-3 py-1 rounded transition-all duration-300" 
           style={{
            background: "linear-gradient(180deg, #50808e, #2B6C56)",
          }}>
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

export default VendorList