import { useState, React } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { tokens } from "../../theme";
import HomeOutlined from "@mui/icons-material/HomeOutlined";
import AssignmentIcon from "@mui/icons-material/Assignment";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { AppRegistration } from "@mui/icons-material";
import InfoIcon from "@mui/icons-material/Info";
import PersonOutlined from "@mui/icons-material/PersonOutlined";
import FeedIcon from "@mui/icons-material/Feed";
import { toast } from "react-toastify";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import SummarizeIcon from "@mui/icons-material/Summarize";

const Item = ({ title, to, icon, selected, setSelected, user }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const out_and_select = (pamagat) => {
    if (user?.uid) {
      signOut(auth).then(() => {
        toast.info("You have successfully logged out");
      });
    }
    setSelected(pamagat);
  };
  return (
    <MenuItem
      active={selected === title}
      style={{ color: colors.grey[100] }}
      onClick={() => out_and_select(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = ({ user }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-inner-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed} style={{ height: "100%" }}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>
          {/* USER */}
          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="Dental Logo"
                  width="200px"
                  height="200px"
                  src="https://firebasestorage.googleapis.com/v0/b/dental-management-system-2dccb.appspot.com/o/352845775_6252662974822138_9003860060307166553_n.jpg?alt=media&token=5091ad7e-0571-4afa-9c8a-3b71f1167484"
                  style={{  borderRadius: "50%" }}
                />
              </Box>
              <Box textAlign="center">
                {"ajDTY6RqIDhhdOQ8rsFv3ewUKdr1" === user?.uid && (
                  <Typography
                    variant="h2"
                    color={colors.grey[100]}
                    fontWeight="bold"
                    sx={{ m: "10px 0 0 0" }}
                  >
                    Maria Michelle Awing-tauli 
                  </Typography>
                )}
                <Typography variant="h5" color={colors.greenAccent[500]}>
                    Administrator
                </Typography>
              </Box>
            </Box>
          )}

          {/* Menu Items */}
          <Box paddingLeft={!isCollapsed ? undefined : "10%"}>
            <Item
              title="Dashboard"
              to="/dashboard"
              icon={<HomeOutlined />}
              selected={selected}
              setSelected={setSelected}
            />
            {"ajDTY6RqIDhhdOQ8rsFv3ewUKdr1" === user?.uid && (
              <Item
                title="Patient Manifest"
                to="/patients"
                icon={<AssignmentIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            )}
            {"ajDTY6RqIDhhdOQ8rsFv3ewUKdr1" === user?.uid && (
              <Item
                title="Create Walk-in"
                to="/walk-in"
                icon={<AppRegistration />}
                selected={selected}
                setSelected={setSelected}
              />
            )}
            {"ajDTY6RqIDhhdOQ8rsFv3ewUKdr1" === user?.uid && (
              <Item
                title="Attendance Lister"
                to="/lister"
                icon={<SummarizeIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            )}
            {"ajDTY6RqIDhhdOQ8rsFv3ewUKdr1" === user?.uid && (
              <Item
                title="View Patient Details"
                to="/details"
                icon={<FeedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            )}
            {user?.uid ? (
              <Item
                title="Press me to logout"
                to="/"
                icon={<PersonOutlined />}
                selected={selected}
                setSelected={setSelected}
                user={user}
              />
            ) : (
              <Item
                title="Login to  system"
                to="/"
                icon={<PersonOutlined />}
                selected={selected}
                setSelected={setSelected}
              />
            )}
            <Item
              title="About the clinic"
              to="/about"
              icon={<InfoIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;

//THIS PROJECT WAS MADE BY PROMETHEUS
