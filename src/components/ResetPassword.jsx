import { useState, useEffect } from "react";
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
  MobileStepper
} from '@mui/material';
import popcardLogo from '../assets/popcard.svg';
import popcardStats from '../assets/popcard-stats.png';
// utils
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { getTokenFromQueryString } from '../utils/functions';
import { useResetPasswordMutation } from "../api/auth/authApiSlice";

const ResetPasswordSchema = Yup.object().shape({
  password: Yup.string().required("Password is required").min(8, 'Your password is too short.'),
  confirmPassword: Yup.string().required('Please retype your password.')
    .oneOf([Yup.ref('password')], 'Your passwords do not match.')
});

export default function ResetPassword() {
  const minWidth1200 = useMediaQuery('(min-width:1200px)');

  const [resetPassword, { isLoading, isError, error }] = useResetPasswordMutation();
  const [token, setToken] = useState(null);

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: ""
    },
    validationSchema: ResetPasswordSchema,
    onSubmit: async (data) => {
      const { password } = data;
      await resetPassword(password, token);
    }
  });

  useEffect(() => {
    const token = getTokenFromQueryString();
    if (token) {
      setToken(token);
    }
  }, []);

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
                  Reset Password
                </Typography>
                <Typography
                  className="description"
                >
                  Set your new password
                </Typography>
              </Container>
              <Container className="formContainer">
                <PopcardTextfield
                  label="New Password"
                  id="password"
                  type="password"
                  name="password"
                  value={formik.values.password}
                  onChange={(e) => {
                    formik.setFieldValue('password', e.target.value);
                  }}
                  error={Boolean(formik.errors.password)}
                  helperText={formik.errors.password}
                />
                <PopcardTextfield
                  label="Confirm Password"
                  id="confirmPassword"
                  type="password"
                  name="confirmPassword"
                  value={formik.values.confirmPassword}
                  onChange={(e) => {
                    formik.setFieldValue('confirmPassword', e.target.value);
                  }}
                  error={Boolean(formik.errors.confirmPassword)}
                  helperText={formik.errors.confirmPassword}
                  style={{
                    marginTop: Boolean(formik.errors.password) ? "5px" : "",
                    marginBottom: Boolean(formik.errors.confirmPassword) ? "25px" : ""
                  }}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && formik.isValid && !isLoading) {
                      e.preventDefault();
                      formik.handleSubmit();
                    }
                  }}
                />
                <PopcardButton
                  value={!isLoading ? "Reset Password" : ""}
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
    </Box>
  )
}