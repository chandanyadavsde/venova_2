import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import logo from "../../assets/logo.png"
const Topbar = ({newVendorCount}) => (
  <div
    className="p-4 fixed top-0 left-0 w-full flex justify-between items-center shadow-md z-10"
    style={{
      background: "linear-gradient(90deg, #50808e, #3A8A73)", // Adjust the gradient as needed
      color: "#fff",
    }}
  >
  <img src={logo} alt="logo" className="w-32 h-12 " />
    {/* <h1 className="text-2xl font-bold mx-auto">Vendor Management</h1> */}
    <div className="relative mr-5">
      <FontAwesomeIcon icon={faBell} className="text-white text-xl cursor-pointer" />
      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full px-2">
        {newVendorCount}
      </span>
    </div>
    
  </div>
);
export default Topbar;