import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Button,
  Tab,
  Tabs,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import AddBusinessRoundedIcon from "@mui/icons-material/AddBusinessRounded";
import DrawerComp from "./Drawer";
const Navbar = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState();
  const theme = useTheme();
  console.log(theme);
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  console.log(isMatch);
  const isLoggedIn = false;
  return (
    <AppBar sx={{ background: "#063970" }}>
      <Toolbar
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
        }}
      >
        <AddBusinessRoundedIcon sx={{ transform: "scale(2)" }} />
        {isMatch ? (
          <>
            <Typography sx={{ fontSize: "2rem", paddingLeft: "10%" }}>
              Shoppee
            </Typography>
            <DrawerComp />
          </>
        ) : (
          <>
            <Tabs
              sx={{ marginLeft: "auto" }}
              indicatorColor="secondary"
              textColor="inherit"
              value={value}
              onChange={(e, value) => setValue(value)}
            >
              <Tab
                onClick={() => {
                  navigate("/profile");
                }}
                label="Public View"
              />
              <Tab
                onClick={() => {
                  navigate("/edit");
                }}
                label="Edit"
              />
            </Tabs>
            {isLoggedIn ? (
              <div
                style={{
                  marginLeft: "auto",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "end",
                }}
              >
                <Button style={{ marginLeft: "2em" }} variant="contained">
                  Janmesh Kumar
                </Button>
                <Button style={{ marginLeft: "2em" }} variant="contained">
                  Logout
                </Button>
              </div>
            ) : (
              <div
                style={{
                  marginLeft: "auto",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "end",
                }}
              >
                <Button sx={{ marginLeft: "auto" }} variant="contained">
                  Login
                </Button>
                <Button sx={{ marginLeft: "10px" }} variant="contained">
                  SignUp
                </Button>
              </div>
            )}
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
