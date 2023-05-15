import React, { useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Tooltip from "@mui/material/Tooltip";
import { LoginContext } from "../context/Context";

// -----------------
const Header = ({ logoutUser }) => {
  const { loginData, setLoginData } = useContext(LoginContext);
  // console.log(loginData.email[0].toUpperCase());
  // console.log(loginData);
  // -----------------
  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box sx={{ flexGrow: 1, display: "flex" }}>
              <Typography
                variant="h5"
                noWrap
                component="a"
                href=""
                sx={{
                  mr: 2,
                  display: "flex",
                  flexGrow: 1,
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                Welcome to Dashboard
              </Typography>
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <ul className="list">
                  <li className="listItem">
                    <img
                      src={
                        loginData.thumbnail
                          ? loginData.thumbnail
                          : "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8&w=1000&q=80"
                      }
                      alt=""
                      className="avatar"
                    />
                  </li>
                  <li className="listItem">{loginData.name}</li>
                  <li className="listItem">
                    <button className="btn btn-danger" onClick={logoutUser}>
                      Logout
                    </button>
                  </li>
                </ul>
              </Tooltip>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};
// -----------------
export default Header;
// -----------------