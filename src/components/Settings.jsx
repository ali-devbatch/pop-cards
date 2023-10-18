import { useEffect } from "react";
// components
import PopcardButton from "./buttons/PopcardButton";
// styling
import "../styles/Settings.css";
import {
  Box,
  Container,
  Grid,
  IconButton,
  Typography,
  useMediaQuery,
} from "@mui/material";
// import messageIcon from "../assets/message.svg";
import MenuIcon from "@mui/icons-material/Menu";
import feedbackComingSoon from "../assets/feedbackComingSoon.svg";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// utils
import { useDispatch, useSelector } from "react-redux";
import {
  setNavbarSelected,
  setNavbarOpened,
  navbarOpenedSelector,
} from "../redux/userReducer";
import {
  useNavigate
} from "react-router-dom";

function Settings() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const navbarOpened = useSelector(navbarOpenedSelector);
  const maxWidth1100 = useMediaQuery("(max-width:1100px)");

  // set the selected in the Navbar
  useEffect(() => {
    if (window.location.pathname === "/settings") {
      dispatch(setNavbarSelected("settings"));
    }
  }, []);

  return (
    <Box className="settingsContainer">
    <Grid container>
      <Grid
        item
        xs={12}
        className="settingsHeader"
      >
        <Container className="">
          {maxWidth1100 && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={() => dispatch(setNavbarOpened(!navbarOpened))}
              edge="start"
            >
              <MenuIcon />
            </IconButton>
          )}
          <Box component="div">
            <Typography className="feedbackTitle">
              Settings
            </Typography>
       
          </Box>
       
        </Container>
      </Grid>
    <Box className="settingsFormContainer">
      <Box className="">ed</Box>
    </Box>

    </Grid>
  </Box>
  )
}

export default Settings
