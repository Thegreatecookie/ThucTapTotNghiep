import { useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import SubjectIcon from "@mui/icons-material/Subject";
import ClassIcon from "@mui/icons-material/Class";
import MeetingRoomOutlinedIcon from "@mui/icons-material/MeetingRoomOutlined";
import { Remove } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { ROUTE_PATH } from "../../constants";
import SettingsIcon from "@mui/icons-material/Settings";
const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const navigate = useNavigate();

  const email = localStorage.getItem("email");
  const role = localStorage.getItem("role");

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
          padding: "5px 15px 5px 15px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 0px 0",
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
                <Typography variant="h4" color={colors.grey[100]}>
                  {`Welcome`} {`${role ?? "anonymous"}`}
                </Typography>

                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <MenuItem
              style={{
                color: colors.grey[100],
              }}
            >
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
                alignItems="flex-start"
                m="0px 0 10px 15px"
              >
                <Typography
                  variant="p"
                  color={colors.grey[100]}
                  marginBottom="8px"
                >
                  {`${email ?? "anonymous"}`}
                </Typography>
              </Box>
            </MenuItem>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <MenuItem
              active={selected === "Signout"}
              style={{
                color: colors.grey[100],
              }}
              onClick={() => {
                setSelected("Signout");
                localStorage.removeItem("token");
                navigate(ROUTE_PATH.SIGNIN);
              }}
              icon={<MeetingRoomOutlinedIcon />}
            >
              <Typography>Signout</Typography>
            </MenuItem>
            <Item
              title="Dashboard"
              to={ROUTE_PATH.DASHBOARD}
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Manage
            </Typography>
            {(role === "admin" || role === "teacher") && (
              <Item
                title="Subject"
                to={ROUTE_PATH.SUBJECT_LIST}
                icon={<SubjectIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            )}
            {role === "admin" && (
              <Item
                title="Teacher"
                to={ROUTE_PATH.TEACHER_LIST}
                icon={<PersonOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            )}
            {role === "teacher" && (
              <Item
                title="Student"
                to={ROUTE_PATH.STUDENT_LIST}
                icon={<PersonOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            )}
            {role === "teacher" && (
              <Item
                title="Classroom"
                to={ROUTE_PATH.CLASSROOM_LIST}
                icon={<ClassIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            )}
            {/* {role === "teacher" && (
              <Item
                title="Change Information"
                to={ROUTE_PATH.EDIT_TEACHER}
                icon={<SettingsIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            )} */}
            <Item
              title="Change Password"
              to={ROUTE_PATH.CHANGEPASS}
              icon={<SettingsIcon />}
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
