import { useEffect, useState } from "react";
import { ENDPOINT } from "../constant/constants";

export const useVendors = (business_vertical) => {
  const [vendors, setVendors] = useState([]);

  useEffect(() => {
    fetch(`${ENDPOINT}/${business_vertical}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setVendors(data.vendors.reverse());
        }
      })
      .catch((error) => console.error("Error fetching vendors:", error));
  }, [business_vertical]);

  return { vendors };
};