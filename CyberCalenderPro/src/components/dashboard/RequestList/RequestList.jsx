import React, { useContext, useState } from "react";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import { Alert, Fade, TableSortLabel, Tooltip } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import axios from "axios";
import { DashboardContext } from "../../../contexts/DashboardContext";

const RequestList = () => {
  const [isSent, setIsSent] = useState(false);

  const { requestList, setRequestList } = useContext(DashboardContext);

  const updateRequestStatus = async ({ _id, approved }) => {
    try {
      const res = await axios.post(`http://localhost:2000/approve`, {
        _id,
        approved,
      });
      setIsSent(true);
      setTimeout(() => setIsSent(false), 2000);
      setRequestList((prev) => {
        prev = prev.filter((request) => request._id !== _id);
        return [...prev];
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className="w-full py-8">

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
          {requestList?.map((request) => (
            <TableRow hover key={request._id}>
              <TableCell>{request.className}</TableCell>
              <TableCell>
                {request.users?.at(0)?.userName || "No User"}
              </TableCell>
              <TableCell>{request.date}</TableCell>
              <TableCell>{request.time_range}</TableCell>
              <TableCell>
                <div className="flex">
                  <Tooltip title="accept" arrow>
                    <button
                      onClick={() =>
                        updateRequestStatus({
                          _id: request._id,
                          approved: true,
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
                          approved: false,
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
      <Fade in={isSent}>
        <Alert
          severity="success"
          sx={{
            position: "absolute",
            bottom: "5%",
            right: "50%",
            translate: "50% 0",
          }}
        >
          Request Saved!
        </Alert>
      </Fade>
    </section>
  );
};

export default RequestList;
