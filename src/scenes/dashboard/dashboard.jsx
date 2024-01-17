import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { getDatabase, onValue, ref } from "firebase/database";
import Spinner from "../Spinner";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Dashboard = ({ user }) => {
  //eto ang mga declarations for Time and date
  let time = new Date().toLocaleTimeString();
  let date = new Date().toDateString();

  toast.success(user);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [loading, setLoading] = useState(true);
  const db = getDatabase();
  const [presentList, setPresentList] = useState([]);
  const [count, setCount] = useState(time);
  const [dateToday, setDate] = useState(date);

  const UpdateTime = () => {
    time = new Date().toLocaleTimeString();
    setCount(time);
  };

  const UpdateDate = () => {
    date = new Date().toDateString();
    setDate(date);
  };

  setInterval(UpdateDate, 1000);
  setInterval(UpdateTime, 1000);

  useEffect(() => {
    let present = [];
    const getPresent = onValue(
      ref(db, "Attendance List/" + dateToday, dateToday),
      (snapshot) => {
        snapshot.forEach((element) => {
          present.push({
            id: element.key,
            ...element.val(),
          });
        });
        setPresentList(present);
        setLoading(false);
      },
      (error) => {
        console.log(error);
      }
    );
    return () => {
      getPresent();
    };
  });

  if (loading) {
    return (
      <div className="home">
        <Spinner />
      </div>
    );
  }

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
      </Box>

      <Box className="container">
        <div>
          <h1 className="clock">{dateToday}</h1>
          <div className="board">
            <table width="100%">
              <thead>
                <tr>
                  <td style={{ background: colors.primary[400] }}>Name</td>
                  <td style={{ background: colors.primary[400] }}>
                    Scheduled Time
                  </td>
                  <td style={{ background: colors.primary[400] }}>
                    Scheduled Date
                  </td>
                  <td style={{ background: colors.primary[400] }}>
                    Service Selected
                  </td>
                </tr>
              </thead>
              {presentList?.map((item) => (
                <tbody key={item.id}>
                  <tr>
                    <td className="people">
                      <img src={item.imageUrl} alt={item.fullName}></img>
                      <div className="people-de">
                        <h5 style={{ color: colors.primary[600] }}>
                          {item.fullName}
                        </h5>
                        <p style={{ color: colors.primary[600] }}>
                          {item.address}
                        </p>
                      </div>
                    </td>
                    <td className="people-des">
                      <h5 style={{ color: colors.primary[600] }}>
                        {item.sched_time}
                      </h5>
                    </td>
                    <td className="active">
                      <p style={{ color: colors.primary[600] }}>
                        {item.sched_date}
                      </p>
                    </td>
                    <td className="active">
                      <p style={{ color: colors.primary[600] }}>
                        {item.service + ","}
                      </p>
                    </td>
                  </tr>
                </tbody>
              ))}
            </table>
          </div>
        </div>
      </Box>
    </Box>
  );
};

export default Dashboard;

//THIS PROJECT WAS MADE BY PROMETHEUS
