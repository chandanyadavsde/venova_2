import React from "react";
import { Table, TableHead, TableRow, TableCell, TableBody, Button, Pagination } from "@mui/material";

const vendorData = [
  { id: "#23456", name: "Chandan kumar yadav", date: "07 January, 2024", status: "New" },
  { id: "#23456", name: "Chandan kumar yadav", date: "07 January, 2024", status: "Rejected" },
  { id: "#23456", name: "Chandan kumar yadav", date: "07 January, 2024", status: "Under review" },
  { id: "#23456", name: "Chandan kumar yadav", date: "07 January, 2024", status: "No action" },
  { id: "#23456", name: "Chandan kumar yadav", date: "07 January, 2024", status: "Approved" },
  { id: "#23456", name: "Chandan kumar yadav", date: "07 January, 2024", status: "Approved" },
];

const statusColors = {
  New: "#1976D2",
  Rejected: "#D32F2F",
  "Under review": "#FBC02D",
  "No action": "#8D6E63",
  Approved: "#388E3C",
};

const VendorTable = () => {
  return (
    <div style={{ width: "100%", padding: "20px", borderRadius: "10px", border: "1px solid #E0E0E0", background: "#FAFAFA" }}>
      <Table style={{ backgroundColor: "#FFFFFF", borderRadius: "8px", overflow: "hidden" }}>
        <TableHead style={{ backgroundColor: "#F5F5F5" }}>
          <TableRow>
            {["Vendor ID", "Vendor Name", "Date", "Status", "Details"].map((header, index) => (
              <TableCell key={index} style={{ fontWeight: "bold", color: "#333", padding: "12px 16px" }}>
                {header}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {vendorData.map((vendor, index) => (
            <TableRow key={index} style={{ borderBottom: "1px solid #E0E0E0" }}>
              <TableCell style={{ padding: "12px 16px", color: "#444" }}>{vendor.id}</TableCell>
              <TableCell style={{ padding: "12px 16px", color: "#444" }}>{vendor.name}</TableCell>
              <TableCell style={{ padding: "12px 16px", color: "#444" }}>{vendor.date}</TableCell>
              <TableCell style={{ padding: "12px 16px", fontWeight: "bold", color: statusColors[vendor.status] }}>
                ● {vendor.status}
              </TableCell>
              <TableCell style={{ padding: "12px 16px" }}>
                <Button variant="contained" style={{ backgroundColor: "#00897B", color: "#FFF", textTransform: "none", fontWeight: "bold" }}>
                  View details
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div style={{ display: "flex", justifyContent: "center", marginTop: "15px" }}>
        <Pagination count={5} shape="rounded" />
      </div>
    </div>
  );
};

export default VendorTable;
