import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const VendorDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [vendor, setVendor] = useState(null);

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

  const updateVendorStatus = (newStatus) => {
    fetch(`http://localhost:4500/vendors/${id}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setVendor((prev) => ({ ...prev, status: newStatus }));
        }
        navigate(-1);
      })
      .catch((error) => console.error("Error updating status:", error));
  };

  if (!vendor)
    return (
      <div className="ml-64 mt-16 p-6">
        <p>No vendor details available.</p>
      </div>
    );

  return (
    <div className="ml-64 mt-16 p-6">
      {/* Header */}
      <div className="vendor-list-container-header flex items-center justify-between">
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="logo" />
          <h2 className="title ml-4">Vendor Detail</h2>
        </div>
        <FaTimes className="close-btn cursor-pointer" onClick={() => navigate(-1)} />
      </div>

      {/* Vendor Details */}
      <div className="vendor-detail-card bg-white shadow-lg rounded-lg p-6 mt-4">
        <p>
          <strong>Vendor name:</strong> {vendor.vendor_name}
        </p>
        <p>
          <strong>Phone number:</strong> {vendor.phone_no}
        </p>
        <p>
          <strong>Email:</strong> {vendor.email}
        </p>
        <p>
          <strong>State:</strong> {vendor.state}
        </p>
        <p>
          <strong>City:</strong> {vendor.city}
        </p>
        <p>
          <strong>Pincode:</strong> {vendor.postal_code}
        </p>
        <p>
          <strong>Office address:</strong> {vendor.office_address}
        </p>
        <p>
          <strong>Services:</strong> {vendor.select_service}
        </p>
        <p>
          <strong>Website:</strong>{" "}
          <a href={vendor.website} target="_blank" rel="noopener noreferrer">
            {vendor.website}
          </a>
        </p>
        <p>
          <strong>Message:</strong> {vendor.about}
        </p>
        <p>
          <strong>Status:</strong>{" "}
          <span className={`status ${vendor.status.toLowerCase()}`}>
            {vendor.status}
          </span>
        </p>
        <div className="button-group mt-4">
          <button className="reject-button" onClick={() => updateVendorStatus("Rejected")}>
            Rejected
          </button>
          <button className="approve-button" onClick={() => updateVendorStatus("Approved")}>
            Approved
          </button>
        </div>
      </div>
    </div>
  );
};

export default VendorDetail;
