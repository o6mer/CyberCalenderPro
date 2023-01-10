import React, { useContext, useState } from "react";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import { TableSortLabel, Tooltip } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import axios from "axios";
import { DashboardContext } from "../../../contexts/DashboardContext";

const RequestList = () => {
  const { requestList, setRequestList } = useContext(DashboardContext);

  const updateRequestStatus = async ({ _id, aprooved }) => {
    try {
      const req = await axios.post(`http://localhost:2000/approve`, {
        _id,
        aprooved,
      });
      setRequestList((prev) => {
        prev = prev.filter((request) => request._id !== _id);
        return [...prev];
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-fit">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Class Name</TableCell>
            <TableCell>User</TableCell>
            <TableCell sortDirection="desc">
              <Tooltip enterDelay={300} title="Date">
                <TableSortLabel active direction="desc">
                  Date
                </TableSortLabel>
              </Tooltip>
            </TableCell>
            <TableCell>Time Range</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {requestList.map((request) => (
            <TableRow hover key={request._id}>
              <TableCell>{request.className}</TableCell>
              <TableCell>{request.user.name}</TableCell>
              <TableCell>{request.date}</TableCell>
              <TableCell>{request.time_range}</TableCell>
              <TableCell>
                <div className="flex">
                  <Tooltip title="accept" arrow>
                    <button
                      onClick={() =>
                        updateRequestStatus({
                          _id: request._id,
                          aprooved: true,
                        })
                      }
                    >
                      <CheckIcon />
                    </button>
                  </Tooltip>
                  <Tooltip title="deny" arrow>
                    <button
                      onClick={() =>
                        updateRequestStatus({
                          _id: request._id,
                          aprooved: false,
                        })
                      }
                    >
                      <ClearIcon />
                    </button>
                  </Tooltip>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default RequestList;
