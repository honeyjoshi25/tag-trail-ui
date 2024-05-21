import React, { useState, useEffect } from "react";
import "./Header.css";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Avatar } from "@material-ui/core";
import { useDispatch } from "react-redux";
import decode from "jwt-decode";
import {Menu,MenuItem} from "@material-ui/core";
import { Logout } from "@mui/icons-material";
import { Divider } from "@mui/material";
import {Tooltip} from "@mui/material";
import {ListItemIcon} from "@mui/material";


export const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const token = user?.token;
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/auth");
    setUser(null);
    window.location.reload();
  };
  return (
    <div className="header w-100">
      <div className="headerWrapper d-flex justify-content-between p-2">
        <Typography
          variant="h6"
          component={Link}
          to="/"
          className="headerTitle fw-bold ms-5"
        >
          TagTrails
        </Typography>
        <div className="me-5">
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              textAlign: "center",
              marginRight: "0.5rem",
            }}
          >
            <Tooltip title="Account settings">
              <IconButton
                onClick={handleClick}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={open ? "account-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
              >
                <Avatar sx={{ width: 30, height: 30, fontSize: "13px" }}>
                  {user?.result.name.charAt(0)}
                </Avatar>
              </IconButton>
            </Tooltip>
          </Box>
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                "&:before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          >
            <MenuItem>
              <Avatar
                sx={{
                  width: 32,
                  height: 32,
                  borderRadius: "5px",
                }}
              >
                {user?.result.name.charAt(0)}
              </Avatar>
              <div className="d-flex flex-column mx-2">
                <span
                  style={{
                    fontSize: "14px",
                    fontWeight: 600,
                    color: "#181c32",
                  }}
                  className="ms-3"
                >
                  {user?.result.name}
                </span>
                <span style={{ fontSize: "13px", color: "#A1A5B7" }} className="ms-3">
                  {user?.result.email}
                </span>
              </div>
            </MenuItem>
            <Divider />

            <MenuItem
              onClick={logout}
              style={{ fontSize: "14px", color: "#3F4254" }}
            >
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </div>

        {/* <>
          <Avatar
            alt={user.result.name}
            src={user.result.imageUrl}
            style={{
              marginRight: "10px",
              height: "30px",
              width: "30px",
            }}
          >
            {user?.result.name.charAt(0)}
          </Avatar>
          <Typography style={{ marginRight: "10px" }}>
            {user?.result.name}
          </Typography>

          <Button color="inherit" onClick={logout} className="muiContainedBtn">
            Logout
          </Button>
        </> */}
      </div>
    </div>
  );
};
