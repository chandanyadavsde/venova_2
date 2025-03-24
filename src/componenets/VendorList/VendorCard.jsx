import React from "react";

const VendorCard = ({ label, count, bg, textColor, icon }) => (
  <div className={`flex justify-between items-center p-3 ${bg} ${textColor} rounded-lg shadow-md border border-gray-300 flex-1 min-w-[150px]`}>
    <div>
      <h3 className="text-sm font-semibold">{label}</h3>
      <p className="text-2xl font-bold">{count}</p>
    </div>
    <div className="w-10 h-10 bg-white rounded-md shadow flex">
      <img className="w-8 m-2" src={icon} alt={label} />
    </div>
  </div>
);

export default VendorCard;
