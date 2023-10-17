// styling
import "../styles/NavBar.css";
import {
  Drawer,
  Container,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
  IconButton,
  CircularProgress,
  useMediaQuery
} from "@mui/material";
import { styled } from "@mui/material/styles";
import popcardLogo from "../assets/popcard.svg";
import dashboard from "../assets/dashboard.svg";
import settings from "../assets/settings.svg";
import Logout from "../assets/logout.svg";
import popcards from "../assets/popcards.svg";
import feedbackForm from "../assets/feedbackForm.svg";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
// utils
import { useNavigate } from "react-router-dom";
import {
  navbarSelectedSelector,
  setNavbarSelected,
  navbarOpenedSelector,
  setNavbarOpened,
  logout
} from "../redux/userReducer";
import { useSelector, useDispatch } from "react-redux";
import { useUserLogOutMutation } from "../api/auth/authApiSlice";
import TokenService from "../helpers/token";
const PopcardDrawer = styled(Drawer)(() => ({
  "& .MuiDrawer-paper": {
    width: "300px",
    borderRight: "1px solid #CBD5E1",
    background: "#FFF",
    boxShadow: "0px 3px 4px 0px rgba(0, 0, 0, 0.03)",
    display: "flex",
    justifyContent: "space-between",
  },
}));

export default function NavBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const navbarSelected = useSelector(navbarSelectedSelector);
  const navbarOpened = useSelector(navbarOpenedSelector);
  const [userLogOut, { isLoading }] = useUserLogOutMutation();

  const maxWidth1100 = useMediaQuery("(max-width:1100px)");

  const hanldeListItemClick = (item) => () => {
    dispatch(setNavbarSelected(item));
    navigate(`/${item}`);
    // close the navbar if the screen is smaller than 1100px
    if (maxWidth1100) dispatch(setNavbarOpened(false));
  };

  const refreshToken = TokenService.getLocalRefreshToken()?.token;

  const handleLogout = async () => {
    await userLogOut(refreshToken);
    TokenService.removeLocalTokens();
    dispatch(logout());
    navigate('/login', { replace: true });
  }

  return (
    <PopcardDrawer
      variant="persistent"
      anchor="left"
      open={maxWidth1100 ? navbarOpened : true}
    >
      <Container className="topContainer">
        <Box component="div" className="navbarDrawerHeader">
          <img
            src={popcardLogo}
            className="navbarPopcardLogo"
            alt="popcard logo"
            onClick={hanldeListItemClick("dashboard")}
          />
          {maxWidth1100 && (
            <IconButton
              onClick={() => dispatch(setNavbarOpened(!navbarOpened))}
              className="navbarDrawerChevron"
            >
              <ChevronLeftIcon />
            </IconButton>
          )}
        </Box>
        <ListItem
          key="dashboard"
          disablePadding
          onClick={hanldeListItemClick("dashboard")}
        >
          <ListItemButton
            className={`
              listItemButton 
              ${navbarSelected === "dashboard" ? "listItemSelected" : ""}
            `}
          >
            <ListItemIcon>
              <img src={dashboard} alt="Dashboard logo" />
            </ListItemIcon>
            <ListItemText primary="Dashboard" className="listItemText" />
          </ListItemButton>
        </ListItem>
        <Typography className="sectionText">Actions</Typography>
        <ListItem
          key="popcards"
          disablePadding
          onClick={hanldeListItemClick("popcards")}
        >
          <ListItemButton
            className={`
              listItemButton 
              ${navbarSelected === "popcards" ? "listItemSelected" : ""}
            `}
          >
            <ListItemIcon>
              <img src={popcards} alt="Popcards logo" />
            </ListItemIcon>
            <ListItemText primary="Popcards" className="listItemText" />
          </ListItemButton>
        </ListItem>
        <ListItem
          key="feedback"
          disablePadding
          onClick={hanldeListItemClick("feedback")}
        >
          <ListItemButton
            className={`
              listItemButton 
              ${navbarSelected === "feedback" ? "listItemSelected" : ""}
            `}
          >
            <ListItemIcon>
              <img src={feedbackForm} alt="Feedback forms logo" />
            </ListItemIcon>
            <ListItemText primary="Feedback Forms" className="listItemText" />
          </ListItemButton>
        </ListItem>
      </Container>
      <Container className="bottomContainer">
        <Typography className="sectionText">Configuration</Typography>
        <ListItem
          key="settings"
          disablePadding
        // onClick={hanldeListItemClick("settings")}
        >
          <ListItemButton
            className={`
              listItemButton 
              ${navbarSelected === "settings" ? "listItemSelected" : ""}
            `}
            disabled={true}
          >
            <ListItemIcon>
              <img src={settings} alt="Settings logo" />
            </ListItemIcon>
            <ListItemText primary="Settings" className="listItemText" />
          </ListItemButton>
        </ListItem>
        <ListItem key="logout" disablePadding>
          <ListItemButton
            className="listItemButton"
            onClick={!isLoading && handleLogout}
          >
            <ListItemIcon>
              {
                isLoading ? <CircularProgress size={20} />
                  : <img src={Logout} alt="Logout logo" />
              }
            </ListItemIcon>
            <ListItemText primary="Logout" className="listItemText" />
          </ListItemButton>
        </ListItem>
      </Container>
    </PopcardDrawer>
  );
}
