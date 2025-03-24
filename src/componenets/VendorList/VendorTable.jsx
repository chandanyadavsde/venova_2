import React from "react";

const VendorTable = ({ vendors, handleVendorClick }) => (
  <div className="shadow-lg rounded-lg w-full mx-auto bg-white border border-[#dee2e6] overflow-hidden">
    <div className="overflow-x-auto w-full">
      <table className="w-full text-left border-collapse">
        <thead
          className="bg-[#343a40] text-white"
          style={{ background: "linear-gradient(180deg, #50808e, #2B6C56)", position: "sticky", top: "0", zIndex: "10" }}
        >
          <tr>
            <th className="border-b p-3">Vendor ID</th>
            <th className="border-b p-3">Vendor Name</th>
            <th className="border-b p-3">Date</th>
            <th className="border-b p-3">Status</th>
            <th className="border-b p-3">Details</th>
          </tr>
        </thead>
        <tbody>
          {vendors.map((vendor) => (
            <tr
              key={vendor._id}
              onClick={() => handleVendorClick(vendor._id, vendor.status)}
              className="hover:bg-[#e9ecef] cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-102"
            >
              <td className="text-[#50808e] font-semibold border-b p-3">#{vendor.vendor_id}</td>
              <td className="text-[#50808e] border-b p-3">{vendor.vendor_name}</td>
              <td className="text-[#50808e] border-b p-3">07 January, 2024</td>
              <td className={`border-b p-3 font-semibold transition-all duration-300 ${getStatusClass(vendor.status)}`}>
                ● {vendor.status}
              </td>
              <td className="border-b p-3">
                <button className="hover:bg-[#157347] text-white px-4 py-1 rounded transition-all duration-300"
                  style={{ background: "linear-gradient(180deg, #50808e, #2B6C56)" }}>
                  View Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const getStatusClass = (status) => {
  return status === "New" ? "text-[#3b82f6]" :
    status === "Rejected" ? "text-[#dc2626]" :
    status === "Under Review" ? "text-[#facc15]" :
    status === "No Action Taken" ? "text-[#8b5a2b]" :
    status === "Approved" ? "text-[#16a34a]" :
    "text-[#778da9]";
};

export default VendorTable;
