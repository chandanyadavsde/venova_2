import all from "../../assets/images/all.svg";
import newVendor from "../../assets/images/new.svg";
import under_review from "../../assets/images/under_review.svg";
import approved from "../../assets/images/approved.svg";
import rejected from "../../assets/images/rejected.svg";
import noAction from "../../assets/images/no_action.svg";

export const STATUS_CARDS = [
  { label: "All", bg: "bg-[#DBDBDB]", textColor: "text-black", icon: all },
  { label: "New", bg: "bg-[#B8DFFF]", textColor: "text-black", icon: newVendor },
  { label: "Under review", bg: "bg-yellow-200", textColor: "text-black", icon: under_review },
  { label: "Approved", bg: "bg-green-200", textColor: "text-black", icon: approved },
  { label: "Rejected", bg: "bg-red-200", textColor: "text-black", icon: rejected },
  { label: "No Action", bg: "bg-[#DDCDC7]", textColor: "text-black", icon: noAction },
];
