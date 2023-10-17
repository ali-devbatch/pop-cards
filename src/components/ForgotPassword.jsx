import { useState } from 'react';
// components
import PopcardTextfield from './inputs/PopcardTextfield';
import PopcardButton from './buttons/PopcardButton';
import PopcardSnackbar from './feedback/PopcardSnackbar';
// styling
import '../styles/Login.css';
import {
  Box,
  Grid,
  useMediaQuery,
  Container,
  Typography,
  CircularProgress,
  MobileStepper,
  Snackbar,
  Alert
} from '@mui/material';
import popcardLogo from '../assets/popcard.svg';
import popcardStats from '../assets/popcard-stats.png';
// utils
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useForgotPasswordMutation } from "../api/auth/authApiSlice"

const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string().email("Email must be valid").required("Email is required")
});

export default function ForgotPassword() {
  const navigate = useNavigate();

  const [forgotPassword, setForgotPassword] = useState(false);
  const minWidth1200 = useMediaQuery('(min-width:1200px)');

  const [forgotUserPassword, { isLoading, isError, error, isSuccess }] = useForgotPasswordMutation();

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: ForgotPasswordSchema,
    onSubmit: async (data) => {
      await forgotUserPassword(data);
      navigate('/login', { replace: true });
      setForgotPassword(true)
    }
  });

  const handleClose = () => {
    setForgotPassword(false);
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
          xs={minWidth1200 ? 5 : 12}
          className="leftsideContainer"
        >
          <Box className="logoContainer">
            <img
              src={popcardLogo}
              alt="Popcard logo"
            />
          </Box>
          <Box className="loginAreaContainer">
            <Box className="loginArea">
              <Container>
                <Typography
                  className="title"
                >
                  Forgot Password?
                </Typography>
                <Typography
                  className="description"
                >
                  Let's get you back in
                </Typography>
              </Container>
              <Container className="formContainer">
                <PopcardTextfield
                  label="Email"
                  id="email"
                  type="email"
                  name="email"
                  value={formik.values.email}
                  onChange={(e) => {
                    formik.setFieldValue('email', e.target.value.toLowerCase());
                  }}
                  error={Boolean(formik.errors.email)}
                  helperText={formik.errors.email}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && formik.isValid && !isLoading) {
                      e.preventDefault();
                      formik.handleSubmit();
                    }
                  }}
                />
                <PopcardButton
                  value={!isLoading ? "Send Recovery Email" : ""}
                  onClick={formik.handleSubmit}
                  disabled={!formik.isValid || isLoading}
                  startIcon={isLoading && <CircularProgress className="loader" size={20} />}
                />
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
          minWidth1200 &&
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
                You asked and we listened! Faster and More accurate automated reports. Sign in to explore!
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
      <Snackbar open={forgotPassword} autoHideDuration={6000} onClose={handleClose}>
        <Alert severity="success" sx={{ width: '100%' }}>
          Recovery email has been sent successfully
        </Alert>
      </Snackbar>
    </Box>
  )
}