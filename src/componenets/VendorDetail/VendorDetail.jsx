import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { BA_CODES } from "../constant/constants";
import { useParams,useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";
import SkeletonCard from "../SkeletonCard/SkeletonCard";



const VendorDetail = ({ setIsDetailView }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [vendor, setVendor] = useState(null);
  const [isApproving, setIsApproving] = useState(false);
  const [selectedBACodes, setSelectedBACodes] = useState([]);

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

  const handleBASelection = (code) => {
    setSelectedBACodes((prev) =>
      prev.includes(code) ? prev.filter((c) => c !== code) : [...prev, code]
    );
  };

  const updateVendorStatus = (newStatus) => {
    if (newStatus === "Approved" && selectedBACodes.length === 0) {
      alert("Please choose BA Code.");
      return;
    }

    fetch(`http://localhost:4500/vendors/${id}/status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: newStatus, ba_codes: selectedBACodes }),
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

        {!vendor ? (
          <SkeletonCard/>
        ) : (
          <div className="shadow-lg rounded-lg p-6 w-full mx-auto bg-white border border-gray-300">
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
                  <span className="font-semibold">Status:</span> {vendor.status}
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

            {/* BA Code Selection */}
            {isApproving && (
              <div className="mt-6">
                <p className="text-sm font-medium text-gray-700 mb-2">
                  Select BA Codes for Approval:
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {BA_CODES.map(({ code, name }) => (
                    <label key={code} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        value={code}
                        onChange={() => handleBASelection(code)}
                        checked={selectedBACodes.includes(code)}
                      />
                      <span>{name}</span>
                    </label>
                  ))}
                </div>
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
export default VendorDetail;
