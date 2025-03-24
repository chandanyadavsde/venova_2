import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import logo from "../../assets/logo.png"
const Topbar = ({ newVendorCount, verticalName }) => (
  <div
    className="p-4 fixed top-0 left-0 w-full flex gap-24 items-center bg-white border-b-2 border-black-200 shadow-md"
    style={{
      zIndex: 50, // Ensure it's above everything
    }}
  >
    <img src={logo} alt="logo" className="ml-6 h-12" />
    <h2 className="text-3xl font-bold text-[#50808e]">
      {verticalName.replace(/_/g, " ").toUpperCase()} VENDORS
    </h2>
  </div>
);

export default Topbar;