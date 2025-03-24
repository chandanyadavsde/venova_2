export const formatStatus = (status) => {
    switch (status) {
      case "New":
        return "text-[#f59e0b] drop-shadow-[0_0_5px_#f59e0b]";
      case "Under Review":
        return "text-[#ea580c] drop-shadow-[0_0_5px_#ea580c]";
      case "Approved":
        return "text-[#16a34a] drop-shadow-[0_0_5px_#16a34a]";
      case "Rejected":
        return "text-[#dc2626] drop-shadow-[0_0_5px_#dc2626]";
      default:
        return "text-white bg-[#1d4ed8] drop-shadow-[0_0_5px_#1d4ed8]";
    }
  };