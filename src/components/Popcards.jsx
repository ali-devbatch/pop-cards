import { useEffect } from "react";
// components
import BestPerforming from "./popcards/BestPerforming";
// styling
import "../styles/PopCards.css";
import {
  Box,
  Grid,
  Container,
  Typography,
  IconButton,
  useMediaQuery
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
// utils
import { useDispatch, useSelector } from "react-redux";
import {
  setNavbarSelected,
  setNavbarOpened,
  navbarOpenedSelector,
} from "../redux/userReducer";

const Popcards = () => {
  const dispatch = useDispatch();
  const navbarOpened = useSelector(navbarOpenedSelector);
  const maxWidth1100 = useMediaQuery("(max-width:1100px)");

  // set the selected in the Navbar
  useEffect(() => {
    if (window.location.pathname === "/popcards") {
      dispatch(setNavbarSelected("popcards"));
    }
  }, []);

  return (
    <>
      <Box className="popcardContainer">
        <Grid container>
          <Grid item xs={12} className="popcardHeader">
            <Container className="popcardTitleContainer">
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
                <Typography className="popcardTitle">
                  Popcards
                </Typography>
                <Typography className="popcardDescription">
                  All time best performing cards
                </Typography>
              </Box>
            </Container>
          </Grid>
          <Grid container className="popcardBody">
            <Grid item xs={12}>
              <BestPerforming />
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Popcards;
