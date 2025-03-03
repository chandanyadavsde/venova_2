import { ENDPOINT } from "../constants/constants";

export const fetchVendors = async (business_vertical) => {
  const response = await fetch(`${ENDPOINT}/${business_vertical}`);
  return response.json();
};

export const updateVendorStatus = async (id, status, baCodes) => {
  const response = await fetch(`${ENDPOINT}/${id}/status`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status, ba_codes: baCodes }),
  });
  return response.json();
};