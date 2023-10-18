// styling
import "../styles/Settings.css";
import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import settingsProfile from "../assets/settingsProfile.svg";
import cardForSettings from "../assets/cardForSettings.svg";
import userSettings from "../assets/userSettings.svg";
// utils
import { useDispatch, useSelector } from "react-redux";
import {
  setNavbarSelected,
  setNavbarOpened,
  navbarOpenedSelector,
} from "../redux/userReducer";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect } from "react";
const ChangePasswordSchema = Yup.object().shape({
  currentpassword: Yup.string().required("Password is required").min(8, 'Your password is too short.'),
  newpassword: Yup.string().required("Password is required").min(8, 'Your password is too short.'),
  repeatpassword: Yup.string().required('Please retype your password.')
    .oneOf([Yup.ref('newpassword')], 'Your passwords do not match.')
});
function Settings() {
  const dispatch = useDispatch();
  const navbarOpened = useSelector(navbarOpenedSelector);
  const maxWidth1100 = useMediaQuery("(max-width:1100px)");
  // formik implementation
  const formik = useFormik({
    initialValues: {
      currentpassword: "",
      newpassword: "",
      repeatpassword: ""
    },
    validationSchema: ChangePasswordSchema,
    onSubmit: async (data) => {
      console.log(data)
    }
  });

  // set the selected in the Navbar
  useEffect(() => {
    if (window.location.pathname === "/settings") {
      dispatch(setNavbarSelected("settings"));
    }
  }, []);

  return (
    <Box className="settingsContainer">
      <Grid container>
        <Grid item xs={12} className="settingsHeader">
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
              <Typography className="settingsTitle">Settings</Typography>
            </Box>
          </Container>
        </Grid>
        <Box className="settingsFormContainer">
          <Box className="buttonContainerRow">
            <Box className="buttonContainer">
              <Button
                sx={{
                  background: "#FFBC01",
                  color: "white",
                  fontSize: "16px",
                  fontStyle: "normal",
                  fontWeight: 500,
                  lineHeight: "24px",
                  textTransform: "capitalize",
                  paddingX: "15px",
                  paddingY: "8px",
                  borderRadius: "8px",
                  "&:hover": {
                    background: "#FFBC01",
                  },
                }}
                size="small"
                variant="contained"
              >
                <Box component='img' src={userSettings} className="userSettingsImage"></Box>

                Account
              </Button>
              <Button
                sx={{
                  background: "#FFF",
                  color: "#FFBC01",
                  fontFamily: "Inter",
                  fontSize: "16px",
                  fontStyle: "normal",
                  fontWeight: 500,
                  lineHeight: "24px",
                  textTransform: "capitalize",
                  marginLeft: "10px",
                  borderRadius: "8px",
                  padding: "8px 15px 8px 8px",
                  "&:hover": {
                    background: "#FFF",
                  },
                }}
                size="small"
                variant="contained"
                startIcon={<cardForSettings />}
              >
                <Box component='img' src={cardForSettings} className="userSettingsImage"></Box>

                Billing
              </Button>
            </Box>
            <Box className="passwordNotificationContainer">
              <CheckCircleIcon
                sx={{ color: "#FFBC01", width: "16px", height: "16px" }}
              />
              <Typography className="passwordTypography">
                Password Changed Successfully
              </Typography>
            </Box>
          </Box>
          <Typography className="profileSettings">Profile Settings</Typography>
          <Typography className="profileDetails">
            Manage your profile details
          </Typography>
          <Box className="nameBoxFlex">
            <Typography className="nameTypo">Name</Typography>
            <Typography className="nameValueTypo">Olivia Rhye</Typography>
          </Box>
          <Box className="dottedLine"></Box>
          <Box className="nameBoxFlex">
            <Typography className="nameTypo">Email Address</Typography>
            <Typography className="nameValueTypo">Olivia@Rhyle.com</Typography>
          </Box>
          <Box className="dottedLine"></Box>
          <Box className="imageBoxFlex">
            <Typography className="nameTypo">Your Photo</Typography>
            <Box component="img" src={settingsProfile}>
            </Box>
          </Box>
          <Box className="dottedLine"></Box>
          <Box className="nameBoxFlex">
            <Typography className="nameTypo">Account Age</Typography>
            <Typography className="nameValueTypo">288 days</Typography>
          </Box>
          <Box
            sx={{
              width: "50%",
            }}
          >
            <Typography className="changePasswordTypo">
              Change Password
            </Typography>
            <Box className="nameBoxFlex">
              <Typography className="nameTypo">Current Password</Typography>
              <TextField
                sx={{ width: "350px" }}
                className="textFiled"
                size="small"
                id="currentpassword"
                name="currentpassword"
                type="password"
                variant="outlined"
                autoComplete="off"
                value={formik.values.currentpassword}
                onChange={(e) => {
                  formik.setFieldValue('currentpassword', e.target.value);
                }}
                error={Boolean(formik.errors.currentpassword)}
                helperText={formik.errors.currentpassword}
              />
            </Box>
            <Box className="nameBoxFlex">
              <Typography className="nameTypo">New Password</Typography>
              <TextField
                sx={{ width: "350px" }}
                className="textFiled"
                size="small"
                id="newpassword"
                name="newpassword"
                type="password"
                variant="outlined"
                autoComplete="off"
                value={formik.values.newpassword}
                onChange={(e) => {
                  formik.setFieldValue('newpassword', e.target.value);
                }}
                error={Boolean(formik.errors.newpassword)}
                helperText={formik.errors.newpassword}
              />
            </Box>
            <Box className="nameBoxFlex">
              <Typography className="nameTypo">Repeat new Password</Typography>
              <TextField
                sx={{ width: "350px" }}
                className="textFiled"
                size="small"
                id="repeatpassword"
                name="repeatpassword"
                type="password"
                variant="outlined"
                autoComplete="off"
                value={formik.values.repeatpassword}
                onChange={(e) => {
                  formik.setFieldValue('repeatpassword', e.target.value);
                }}
                error={Boolean(formik.errors.repeatpassword)}
                helperText={formik.errors.repeatpassword}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Button
                sx={{
                  background: "var(--yellow-500, #EAB308)",
                  color: "white",
                  fontFamily: "Inter",
                  fontSize: "12px",
                  fontStyle: "normal",
                  fontWeight: 600,
                  lineHeight: "18px",
                  textTransform: "capitalize",
                  paddingLeft: "15px",
                  borderRadius: "8px",
                  "&:hover": {
                    background: "#FFBC01",
                  },
                }}
                size="small"
                variant="contained"
                type="submit"
                onClick={formik.handleSubmit}
              >
                Save New Password
              </Button>
            </Box>
          </Box>
        </Box>
      </Grid>
    </Box>
  );
}
export default Settings;