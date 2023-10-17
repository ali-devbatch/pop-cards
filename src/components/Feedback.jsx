import { useEffect } from "react";
// components
import PopcardButton from "./buttons/PopcardButton";
// styling
import "../styles/Feedback.css";
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

function FeedbackForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const navbarOpened = useSelector(navbarOpenedSelector);
  const maxWidth1100 = useMediaQuery("(max-width:1100px)");

  // set the selected in the Navbar
  useEffect(() => {
    if (window.location.pathname === "/feedback") {
      dispatch(setNavbarSelected("feedback"));
    }
  }, []);

  return (
    <Box className="feedbackContainer">
      <Grid container>
        <Grid
          item
          xs={12}
          className="feedbackHeader"
        >
          <Container className="feedbackTitleContainer">
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
                Feedback Forms
              </Typography>
              {/* <Typography className="feedbackDescription">
                Feedback forms allow you to collect valuable feedback from your
                customers, which will allow you to gain insights and enhance
                your business based on customer perspectives.
              </Typography> */}
            </Box>
            {/* <PopcardButton
              value="Create a Feedback Form"
              startIcon={
                <img
                  src={messageIcon}
                  alt="Message Icon"
                />
              }
            /> */}
          </Container>
        </Grid>
        <Grid container className="feedbackBody">
          <Grid item xs={12}>
            <Box className="feedbackImageContainer">
              <img
                src={feedbackComingSoon}
                alt="Coming soon"
                className="feedbackImage"
              />
            </Box>
          </Grid>
          <Grid
            item
            xs={12}
            sx={{
              textAlign: "center",
            }}
          >
            <Typography className="feedbackComingSoon">
              Coming Soon
            </Typography>
            <Typography className="feedbackComingSoonDescription">
              We're giving our best to bring you an exceptional feature. Stay tuned!
            </Typography>
            <PopcardButton
              value="Back to Dashboard"
              onClick={() => { dispatch(setNavbarSelected("dashboard")); navigate(`/dashboard`) }}
              style={{
                width: "200px",
              }}
              startIcon={
                <ArrowBackIcon
                  sx={{
                    color: "#FFFFFF",
                  }}
                />
              }
            />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

export default FeedbackForm;
