import { useParams } from "react-router-dom";
import { useVendors } from "../../hooks/useVendor";
import VendorList from "../../VendorList/VendorList";

const VendorsPage = () => {
  const { business_vertical } = useParams();
  const { vendors } = useVendors(business_vertical);

  return <VendorList vendors={vendors} />;
};

export default VendorsPage;