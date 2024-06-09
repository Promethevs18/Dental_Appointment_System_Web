import { Avatar, Box, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import React, { useEffect, useState } from "react";
import { getDatabase, onValue, ref } from "firebase/database";
import { toast } from "react-toastify";

const Team = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [patientsList, setpatientsList] = useState([]);
  const database = getDatabase();

  useEffect(() => {
    const fetchData = () => {
      const patients = [];
      const databaseRef = ref(database, "Patient Bookings/");

      onValue(
        databaseRef,
        (snapshot) => {
          snapshot.forEach((patientSnapshot) => {
            const patientData = patientSnapshot.val();

            Object.keys(patientData).forEach((key) => {
              const patient = {
                id: key,
                ...patientData[key],
              };
              patients.push(patient);
            });
          });

          setpatientsList([...patients]); // Create a new array with the updated data
        },
        (error) => {
          toast.error(error);
        }
      );
    };
    fetchData();
  });

  const columns = [
    {
      field: "imageUrl",
      headerName: "Profile Image",
      width: 150,
      height: 150,
      renderCell: (params) => (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Avatar
            src={params.value}
            alt="profile"
            sx={{ height: "50px", width: "50px" }}
          />
        </div>
      ),
    },
    {
      field: "fullName",
      headerName: "Full Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    { field: "sched_time", headerName: "Booking Time", flex: 1 },
    { field: "email", headerName: "Email Address", flex: 1 },
    { field: "service", headerName: "Service", flex: 1 },
    { field: "sched_date", headerName: "Booking Date", flex: 1 },
  ];

  return (
    <Box m="20px">
      <Header
        title="Patient Registry"
        subtitle="List of patients registered to the service"
      />
      <Box
        m="40px 0 0 0 "
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiButtonBase-root":{
            color: colors.greenAccent[400]
          }
        }}
      >
        <DataGrid rows={patientsList} columns={columns} slots={{
          toolbar: GridToolbar,
        }}/>
      </Box>
    </Box>
  );
};

export default Team;

//THIS PROJECT WAS MADE BY PROMETHEUS
