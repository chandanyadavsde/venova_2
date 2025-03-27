import { useParams,useNavigate } from "react-router-dom";
import { ENDPOINT } from "../constant/constants";
import {useState,useEffect} from "react"
// images for cards
import all from "../../assets/images/all.svg";
import newVendor from "../../assets/images/new.svg"
import under_review from "../../assets/images/under_review.svg"
import approved from "../../assets/images/approved.svg"
import rejected from "../../assets/images/rejected.svg"
import noAction from "../../assets/images/no_action.svg"

const VendorList = ({ selectedStatus, setSelectedStatus, setIsDetailView,setNewVendorCount,setVerticalName }) => {
    const { business_vertical } = useParams();
    const navigate = useNavigate();
    const [vendors, setVendors] = useState([]);
    // handle business vertical name 
    setVerticalName(business_vertical)
  
    useEffect(() => {
      fetch(`${ENDPOINT}/${business_vertical}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setVendors(data.vendors.reverse());
            console.log(data)
            setNewVendorCount(data.vendors.filter((v) => v.status === "New").length);
            console.log(data)
            
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
                  vendor._id === id ? { ...vendor, status: "Under Review" } : vendor
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
      InProgress: vendors.filter((v) => v.status === "Under Review").length,
      Approved: vendors.filter((v) => v.status === "Approved").length,
      Rejected: vendors.filter((v) => v.status === "Rejected").length,
      NoActionTaken: vendors.filter((v) => v.status === "No Action Taken").length, // Add this line
    };
  
    const filteredVendors =
    selectedStatus === "All"
      ? vendors
      : vendors.filter((vendor) => vendor.status === selectedStatus);
  
    return (
      <div className="max-w-8xl  w-full mx-auto p-2">
      <div className="ml-60 mt-12 p-16">
        
        {/* Flex container for Cards & Table to stay aligned */}
        <div className="flex flex-col w-full">
          
          {/* Status Summary Cards */}
          <div className="flex gap-4 mb-2 p-2 w-full">
            {[
              { label: "All", count: statusCounts.All, bg: "bg-[#DBDBDB]", textColor: "text-black", icon: all },
              { label: "New", count: statusCounts.New, bg: "bg-[#B8DFFF]", textColor: "text-black", icon: newVendor },
              { label: "Under review", count: statusCounts.InProgress, bg: "bg-yellow-200", textColor: "text-black", icon: under_review },
              { label: "Approved", count: statusCounts.Approved, bg: "bg-green-200", textColor: "text-black", icon: approved },
              { label: "Rejected", count: statusCounts.Rejected, bg: "bg-red-200", textColor: "text-black", icon: rejected },
              { label: "No Action", count: statusCounts.NoActionTaken, bg: "bg-[#DDCDC7]", textColor: "text-black", icon: noAction }
            ].map(({ label, count, bg, textColor, icon }) => (
              <div
                key={label}
                className={`flex justify-between items-center p-3 ${bg} ${textColor} rounded-lg  border border-gray-300 flex-1 min-w-[150px]`}
              >
                <div>
                  <h3 className="text-sm font-semibold">{label}</h3>
                  <p className="text-2xl font-bold">{count}</p>
                </div>
                <div className="w-10 h-10 bg-white rounded-md shadow flex">
                  <img className="w-8 m-2" src={icon} />
                </div>
              </div>
            ))}
          </div>
    
          {/* Vendors Table */}
          {/* Table Container with Dynamic Height */}
<div 
  className="shadow-lg rounded-lg w-full mx-auto bg-white border border-[#dee2e6] overflow-hidden transition-all duration-500 ease-in-out"
  style={{
    maxHeight: filteredVendors.length > 0 ? `${100 + filteredVendors.length * 60}px` : "150px",
  }}
>
  <div className="overflow-x-auto w-full">
    <table className="w-full text-left border-collapse">
      <thead
        className="bg-white text-black font-extrabold"
        style={{
          position: "sticky",
          top: "0",
          zIndex: "10",
        }}
      >
        <tr className="text-l">
          <th className="border-b p-3">Vendor Inquiry ID</th>
          <th className="border-b p-3">Vendor Name</th>
          <th className="border-b p-3">Date</th>
          <th className="border-b p-3">Status</th>
          <th className="border-b p-3">Details</th>
        </tr>
      </thead>
      <tbody>
        {filteredVendors.length > 0 ? (
          filteredVendors.map((vendor) => (
            <tr
              key={vendor._id}
              onClick={() => handleVendorClick(vendor._id, vendor.status)}
              className="hover:bg-[#e9ecef] cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-102"
            >
              <td className="text-[#50808e] font-semibold border-b p-3">{vendor.vendor_id}</td>
              <td className="text-[#50808e] font-semibold border-b p-3">{vendor.vendor_name}</td>
              <td className="text-[#50808e]  font-semibold border-b p-3">
                {new Date(vendor.updatedAt).toLocaleString("en-UK", {
                  year: "numeric",
                  month: "long",
                  day: "numeric"
                })}
              </td>
              <td
                className={`border-b p-3 font-semibold transition-all duration-300 
                  ${vendor.status === "New" ? "text-[#3b82f6]" :
                    vendor.status === "Rejected" ? "text-[#dc2626]" :
                    vendor.status === "Under Review" ? "text-[#facc15]" :
                    vendor.status === "No Action Taken" ? "text-[#8b5a2b]" :
                    vendor.status === "Approved" ? "text-[#16a34a]" :
                    "text-[#778da9]"}`}
              >
              {vendor.status}
              </td>
              <td className="border-b p-3">
                <button
                  className="hover:bg-[#157347] text-white px-4 py-1 rounded transition-all duration-300"
                  style={{ background: "linear-gradient(180deg, #50808e, #2B6C56)" }}
                >
                  View Details
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="5" className="text-center p-3 text-gray-500">
              No vendor available
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
</div>

    
        </div>
      </div>
    </div>
    
  
    );
  };

export default VendorList