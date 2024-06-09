import React  from "react";
import { Box, Typography } from "@mui/material";
import Header from "../../components/Header";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";

export default function About() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title="About the clinic"
          subtitle="Dental Clinic Information can be found here"
        />
      </Box>

      {/* This is for the title and image */}
      <Box display="flex" justifyContent="center" alignItems="center">
        <div>
          <Typography
            textAlign="center"
            fontSize="50px"
            alignContent="center"
            variant="h1"
            fontWeight="bold"
          >
            TAULI DENTAL CLINIC
          </Typography>
          <Box
            display="flow"
            justifyContent="space-between"
            alignItems="center"
          >
            <img
              src="https://scontent.fmnl9-2.fna.fbcdn.net/v/t1.18169-9/12239744_117058685327184_1285971808460013137_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=7a1959&_nc_eui2=AeFSwDDcc2UhZNoQvXVS8bkdTPdv2bigQcxM92_ZuKBBzA_qyy0B00YQeyxryw-QAQjlblY2rppqvrfHng4Hnwfd&_nc_ohc=ydHLO2aAY80AX_ui-ID&_nc_ht=scontent.fmnl9-2.fna&oh=00_AfCO3mJEt2avm-gkhQ_phR-3cIXXvF6sBULmWdUghZfNXw&oe=65D18A92"
              alt="clinic1"
              style={{
                height: "250px",
                width: "auto",
                margin: "20px",
              }}
            />
            <img
              src="https://scontent.fmnl9-3.fna.fbcdn.net/v/t1.18169-9/12647111_181341962232189_5895069340004450627_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=c2f564&_nc_eui2=AeEMZ3LEEsdaSB3G5ExoenmDqxR8w3T2dcarFHzDdPZ1xveyNq6jM24Mch0lghBLaE58J76R3WEgb915h6C1ZRWS&_nc_ohc=hTPOMtvAuO0AX-ls2ex&_nc_ht=scontent.fmnl9-3.fna&oh=00_AfBIm8i8UCDmoabtO5siKnRBvRjysNzD0nC7dNy9acj4xQ&oe=65D1AABF"
              alt="clinic1"
              style={{
                height: "250px",
                width: "auto",
                margin: "20px",
              }}
            />
          </Box>
        </div>
      </Box>
      {/* This is for the mission and Vision content */}
      <Box display="flex" justifyContent="space-evenly" alignContent="center">
        <div style={{ padding: "20px" }}>
          <span>
            <Typography variant="h2" color={colors.grey[100]}>
              Mission
            </Typography>
            <Typography
              variant="h5"
              color={colors.grey[100]}
              marginTop="10px"
              alignContent="center"
              sx={{ width: "400px" }}
            >
              At Tauli Dental Clinic, our mission is to provide exceptional dental care with a commitment to excellence, compassion, and patient-centricity. We strive to enhance the oral health and overall well-being of our community by delivering personalized, high-quality dental services in a comfortable and welcoming environment. 
            </Typography>
          </span>
        </div>
        <div style={{ padding: "20px" }}>
          <span>
            <Typography
              variant="h2"
              color={colors.grey[100]}
              alignItems="center"
            >
              Vision
            </Typography>
            <Typography
              variant="h5"
              color={colors.grey[100]}
              marginTop="10px"
              alignContent="center"
              sx={{ width: "400px" }}
            >
              A place where you could find a comprehensive oral health care for all, from general dentistry to advanced dental specialties guided by professionalism.
            </Typography>
          </span>
        </div>
      </Box>
      {/* This is for the map */}

      <Box m="20px" justifyContent="center" alignItems="center" display="flex">
        <Typography
          variant="h1"
          color={colors.blueAccent[300]}
          fontWeight="100px"
          marginRight="20px"
        >
          Come visit us at:
        </Typography>
        <Typography
          variant="h5"
          color={colors.grey[100]}
          marginTop="10px"
          alignContent="center"
          sx={{ width: "400px" }}
        >
          Palangdao Building, Unit 13 2600 Baguio City, Philippines
        </Typography>
      </Box>
    </Box>
  );
}

//THIS PROJECT WAS MADE BY PROMETHEUS
