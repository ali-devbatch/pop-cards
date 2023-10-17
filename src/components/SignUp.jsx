import { useEffect } from 'react';
// components
import PopcardButton from './buttons/PopcardButton';
import PopcardTextfield from './inputs/PopcardTextfield';
import PopcardSnackbar from './feedback/PopcardSnackbar';
// styling
import '../styles/SignUp.css';
import '../styles/Login.css';
import {
  Box,
  Grid,
  Button,
  Container,
  Typography,
  Divider,
  MobileStepper,
  CircularProgress,
  Backdrop,
  useMediaQuery
} from '@mui/material';
import popcardLogo from '../assets/popcard.svg';
import googleLogo from '../assets/google.svg';
import appleLogo from '../assets/apple.svg';
import popcardStats from '../assets/popcard-stats.png';
// utils
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from 'react-redux';
import { login, selectAccessToken } from '../redux/userReducer';
import config from '../config';
import { useSignupUserMutation } from "../api/auth/authApiSlice";
import TokenService from "../helpers/token";

const SignUpSchema = Yup.object().shape({
  name: Yup.string().max(50, "Name is too long").required("Name is required"),
  email: Yup.string().email("Email must be valid").required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password is too short - should be 8 chars minimum"),
});

export default function SignUp() {
  const maxWidth1230 = useMediaQuery('(min-width:1230px)');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const accessToken = useSelector(selectAccessToken);

  const [singupUser, { isLoading, isError, error }] = useSignupUserMutation();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: SignUpSchema,
    onSubmit: async (fromData) => {
      try {
        const { data } = await singupUser(fromData);
        TokenService.updateLocalTokens(data?.tokens?.access, data?.tokens?.refresh);
        dispatch(login(data))
        navigate('/dashboard', { replace: true })
      } catch (error) {
        console.error(error);
      }
    }
  });

  useEffect(() => {
    accessToken && navigate('/dashboard', { replace: true })
  }, []);

  const handleSignUpWithGoogle = () => {
    let URL = `${config.url.API_URL}/auth/google`
    window.open(URL, "_self");
  }

  const handleSignUpWithApple = () => {
    let URL = `${config.url.API_URL}/auth/apple`
    window.open(URL, "_self");
  }

  return (
    <Box>
      <Grid
        container
        className="container"
      >
        {/* Left Side */}
        <Grid
          item
          xs={maxWidth1230 ? 5 : 12}
          className="leftsideContainer"
        >
          <Box className="logoContainer">
            <img
              src={popcardLogo}
              alt="Popcard logo"
            />
          </Box>

          <Box className='signupAreaContainer'>
            <Box className='signupArea'>
              <Container>
                <Typography
                  className="title"
                >
                  Welcome to Popcard
                </Typography>
                <Typography
                  className="description"
                >
                  Your social compaigns
                </Typography>
              </Container>
              <Container className="ssoButtonsContainer">
                <Button
                  variant="outlined"
                  startIcon={<img src={googleLogo} alt="Google logo" />}
                  sx={{
                    marginRight: "10px",
                    border: "1px solid #E1E3EA",
                    padding: "16px",
                    maxHeight: "52px",
                    color: "#7E8299",
                    textTransform: "none",
                    fontSize: "16px",
                    borderRadius: "5px",
                    fontWeight: 600,
                    minWidth: "240px",
                    "&:hover": {
                      border: "1px solid #E1E3EA",
                      background: "#F9F9F9",
                    },
                    "@media (max-width: 480px)": {
                      marginRight: "0px"
                    }
                  }}
                  onClick={handleSignUpWithGoogle}
                >
                  Continue with Google
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<img src={appleLogo} alt="Apple logo" />}
                  sx={{
                    border: "1px solid #E1E3EA",
                    padding: "16px",
                    maxHeight: "52px",
                    color: "#7E8299",
                    textTransform: "none",
                    fontSize: "16px",
                    borderRadius: "5px",
                    fontWeight: 600,
                    minWidth: "240px",
                    "&:hover": {
                      border: "1px solid #E1E3EA",
                      background: "#F9F9F9",
                    },
                    "@media (max-width: 480px)": {
                      marginTop: "10px"
                    }
                  }}
                  onClick={handleSignUpWithApple}
                >
                  Continue with Apple
                </Button>
              </Container>
              <Container className="dividerContainer">
                <Divider className="divider">
                  <Typography
                    sx={{
                      color: "#A1A5B7",
                      textAlign: "center",
                      fontSize: "12px",
                      fontWeight: 500,
                    }}
                  >
                    Or with email
                  </Typography>
                </Divider>
              </Container>
              <Container className="formContainer">
                <PopcardTextfield
                  label="Name"
                  id="name"
                  name="name"
                  type="text"
                  value={formik.values.name}
                  onChange={(e) => {
                    formik.setFieldValue('name', e.target.value);
                  }}
                  error={Boolean(formik.errors.name)}
                  helperText={formik.errors.name}
                />
                <PopcardTextfield
                  label="Email Address"
                  id="email"
                  name="email"
                  type="email"
                  value={formik.values.email}
                  onChange={(e) => {
                    formik.setFieldValue('email', e.target.value.toLowerCase());
                  }}
                  onBlur={() => {
                    formik.setFieldTouched('email', true);
                  }}
                  error={formik.touched.email && Boolean(formik.values.email) && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && Boolean(formik.values.email) && formik.errors.email}
                  style={{
                    marginTop: Boolean(formik.errors.name) ? "5px" : ""
                  }}
                />
                <PopcardTextfield
                  label="Password"
                  id="password"
                  name="password"
                  type="password"
                  value={formik.values.password}
                  onChange={(e) => {
                    formik.setFieldValue('password', e.target.value);
                  }}
                  onBlur={() => {
                    formik.setFieldTouched('password', true);
                  }}
                  error={formik.touched.password && Boolean(formik.errors.password)}
                  helperText={formik.touched.password && formik.errors.password}
                  style={{
                    marginTop: Boolean(formik.errors.email) ? "5px" : ""
                  }}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && formik.isValid && !isLoading) {
                      e.preventDefault();
                      formik.handleSubmit();
                    }
                  }}
                />
                <Container
                  style={{
                    marginBottom: "20px",
                    width: "100%",
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    padding: 0
                  }}
                >
                  <Link
                    style={{
                      color: "#F59E0B",
                      fontSize: "14px",
                      fontWeight: 500,
                      "&:hover": {
                        cursor: "pointer"
                      }
                    }}
                    to="/forgot-password"
                  >
                    Forgot password?
                  </Link>
                </Container>
                <PopcardButton
                  value={!isLoading ? "Sign Up" : ""}
                  onClick={formik.handleSubmit}
                  disabled={!formik.isValid || isLoading}
                  startIcon={isLoading && <CircularProgress className="loader" size={20} />}
                />
                <Typography
                  sx={{
                    fontSize: "16px",
                    fontWeight: 500,
                    textAlign: "center",
                  }}
                >
                  <span style={{ color: "#A1A5B7", marginRight: "5px" }}>Already have an account?</span>
                  <Link
                    to="/login"
                    style={{
                      color: "#F59E0B",
                      cursor: "pointer",
                      textDecoration: "none",
                      "&:hover": {
                        textDecoration: "underline",
                      }
                    }}
                  >
                    Sign In
                  </Link>
                </Typography>
              </Container>
            </Box>
          </Box>
          <Box className="leftsideFooter">
            <Link
              to="/terms"
              className="link"
            >
              Terms
            </Link>
            <Link
              to="/plans"
              className="link"
            >
              Plans
            </Link>
            <Link
              to="/contact"
              className="link"
            >
              Contact Us
            </Link>
          </Box>
        </Grid>
        {/* Right Side */}
        {
          maxWidth1230 &&
          <Grid
            item
            xs={7}
            className="rightsideContainer"
          >
            <img
              src={popcardStats}
              alt="Popcard Graphic"
              className="heroImage"
            />
            <Container className='heroText'>
              <Typography
                className='heroTextTitle'
              >
                Introducing AutoReports 2.0
              </Typography>
              <Typography
                className='heroTextDescription'
              >
                You asked and we listened! Faster and More accurate automated reports. Sign up to explore!
              </Typography>
              <MobileStepper
                variant="dots"
                steps={7}
                position="static"
                sx={{
                  background: "transparent",
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  "&>div>div": {
                    backgroundColor: "#FFF",
                  },
                }}
              />
            </Container>
          </Grid>
        }
      </Grid>
      {
        isError &&
        <PopcardSnackbar
          message={error?.data?.message}
          severity="error"
        />
      }
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  )
}