import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { BA_CODES } from "../constant/constants";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import SkeletonCard from "../SkeletonCard/SkeletonCard";

const VendorDetail = ({ setIsDetailView }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [vendor, setVendor] = useState(null);
  const [isApproving, setIsApproving] = useState(false);
  const [selectedBACodes, setSelectedBACodes] = useState([]);
  const [showRejectModal, setShowRejectModal] = useState(false); // For reject confirmation modal

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
      toast.error("Please enter a valid BA Code.");
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
          toast.success("Vendor is approved!");
          setTimeout(() => {
              navigate(-1); // Delay navigation to let toast appear
            }, 1000);
          }
        })
        
      .catch((error) => console.error("Error updating status:", error));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Rejected":
        return "bg-red-500 text-white";
      case "In Progress":
        return "bg-orange-500 text-white";
      case "Approved":
        return "bg-green-500 text-white";
      default:
        return "bg-gray-300 text-black";
    }
  };

  return (
    <div className="ml-64 mt-16 p-12 flex justify-center">
      <div className="w-[950px] min-w-[500px] max-w-[1000px] mx-auto relative">
        {/* Close Button */}
        <button
          onClick={() => {
            setIsDetailView(false);
            navigate(-1);
          }}
          className="absolute top-4 right-4 bg-[#2B6C56] hover:bg-[#50808e] text-white px-4 py-2 rounded-md transition duration-300 ease-in-out"

          style={{
            background: "linear-gradient(180deg, #50808e, #2B6C56)",
          }}>
          Close
        </button>

        {!vendor ? (
          <SkeletonCard />
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
                <p className={`mb-2 px-2 py-1 font-semibold inline-block rounded ${getStatusColor(vendor.status)}`}>
                  Status :{vendor.status}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex justify-end space-x-4">
              <button
                onClick={() => setShowRejectModal(true)}
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg"
              >
                Reject
              </button>
              <button
                onClick={() => setIsApproving(!isApproving)}
                className="bg-[#2B6C56] text-white px-6 py-3 rounded-lg hover:bg-[#50808e] transition duration-300 ease-in-out"
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
  className="mt-4 text-white px-6 py-3 rounded-lg transition duration-300 ease-in-out bg-gradient-to-b from-[#50808e] to-[#2B6C56] hover:from-[#2B6C56] hover:to-[#50808e]"
>
  Submit Approval
</button>

              </div>
            )}
          </div>
        )}
      </div>

      {/* Reject Confirmation Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Are you sure you want to reject this vendor?</h3>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowRejectModal(false)}
                className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  updateVendorStatus("Rejected");
                  setShowRejectModal(false);
                }}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
              >
                Yes, Reject
              </button>
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default VendorDetail;
