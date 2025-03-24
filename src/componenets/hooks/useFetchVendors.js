import { useState, useEffect } from "react";
import { ENDPOINT } from "../constant/api";

export const useFetchVendors = (business_vertical, setNewVendorCount) => {
  const [vendors, setVendors] = useState([]);

  useEffect(() => {
    fetch(`${ENDPOINT}/${business_vertical}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setVendors(data.vendors.reverse());
          setNewVendorCount(data.vendors.filter((v) => v.status === "New").length);
        }
      })
      .catch((error) => console.error("Error fetching vendors:", error));
  }, [business_vertical, setNewVendorCount]);

  return { vendors, setVendors };
};
