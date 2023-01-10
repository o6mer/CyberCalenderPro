import React, { useState } from "react";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import { TableSortLabel, Tooltip } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import axios from "axios";

const list = [
  {
    _id: "id1",
    className: "aa",
    user: {
      name: "omer",
      phoneNumber: "1111",
      email: "email@gmail.com",
    },
    date: "30/01/2023",
    time_range: "10:30-11:00",
    aprooved: false,
  },
  {
    _id: "id2",
    className: "bb",
    user: {
      name: "omer",
      phoneNumber: "1111",
      email: "email@gmail.com",
    },
    date: "30/01/2023",
    time_range: "10:30-11:00",
    aprooved: false,
  },
  {
    _id: "id3",
    className: "cc",
    user: {
      name: "omer",
      phoneNumber: "1111",
      email: "email@gmail.com",
    },
    date: "30/01/2023",
    time_range: "10:30-11:00",
    aprooved: false,
  },
];

const RequestList = () => {
  const [requestList, setRequestList] = useState(list);

  const updateRequestStatus = async ({ _id, aprooved }) => {
    try {
      const req = await axios.post(`/request`, {
        _id,
        aprooved,
      });
      console.log(req.data);
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
