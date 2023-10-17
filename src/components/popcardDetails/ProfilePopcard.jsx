import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// components
import IosSwitch from "../buttons/IosSwitch";
import PopcardButton from "../buttons/PopcardButton";
import PopcardSnackbar from "../feedback/PopcardSnackbar";
// styling
import "../../styles/ProfilePopcard.css";
import {
  Typography,
  Box,
  Container,
  Avatar,
  Tooltip,
  FormControl,
  Select,
  MenuItem,
  TextField,
  InputAdornment,
  CircularProgress
} from "@mui/material";
import copyLogo from "../../assets/copyIcon.svg";
import editLogo from "../../assets/edit.svg";
import saveLogo from "../../assets/save-2.svg";
import incrementLogo from "../../assets/increment.svg";
import decrementLogo from "../../assets/decrement.svg";
import urlIcon from "../../assets/url.svg";
import GoogleIcon from "../../assets/google.svg";
import InstagramIcon from "../../assets/instagram.svg";
import ClearIcon from '@mui/icons-material/Clear';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import ProfilePopcardSkeleton from "../skeletons/ProfilePopcardSkeleton";
// utils
import PropTypes from "prop-types";
import { stringAvatar } from "../../utils/functions";
import { usePlacesWidget } from "react-google-autocomplete";
import {
  useEditPopcardsMutation,
  useUploadProfilePictureMutation,
  useGetPopcardDetailsQuery
} from "../../api/services/popcardDetailsApiSlice";
import {
  extractTextAfterPopcards,
} from "../../utils/functions";

const ProfilePopcard = (props) => {
  const {
    data: popcardDetails,
    isLoading: isPopcardDetailsLoading,
    // isError: isPopcardDetailsError,
    // error: popcardDetailError,
    isSuccess: isPopcardDetailsSuccess,
    refetch: refetchPopcardDetails
  } = useGetPopcardDetailsQuery(extractTextAfterPopcards(location.pathname));

  const { clipboardCopy } = props;
  const { id } = useParams();
  const [workingHours, setWorkingHours] = useState(popcardDetails?.weekly_working_hours);
  const [showInputToggle, setShowInputToggle] = useState(false);
  const [username, setUsername] = useState("");
  const [target, setTarget] = useState(popcardDetails?.target?.value || "");
  const [targetType, setTargetType] = useState(popcardDetails?.target?.target_type || "");
  const [targetLabel, setTargetLabel] = useState(popcardDetails?.target?.label || "");
  const [active, setActive] = useState(popcardDetails?.active);
  const [googlePlaceId, setGooglePlaceId] = useState("");
  const [googlePlaceName, setGooglePlaceName] = useState(popcardDetails?.target?.label || "");
  const [avatarSrc, setAvatarSrc] = useState(null);

  const [
    editPopcard, {
      isLoading: isEditLoading,
      isError: isEditError,
      error: editError,
      isSuccess: isEditSuccess
    }
  ] = useEditPopcardsMutation();

  const [
    uploadProfile, {
      // isLoading: profileLoading,
      isError: isProfileError,
      error: pofileError
    }
  ] = useUploadProfilePictureMutation();

  useEffect(() => {
    if (!isPopcardDetailsLoading && isPopcardDetailsSuccess) {
      setWorkingHours(popcardDetails?.weekly_working_hours || 0);
      setUsername(popcardDetails?.name ? popcardDetails?.name : "N/A");
      setActive(popcardDetails?.active);
      setTarget(popcardDetails?.target?.value);
      setGooglePlaceName(popcardDetails?.target?.label)
      setTargetType(popcardDetails?.target?.target_type);
      setTargetLabel(popcardDetails?.target?.label);
    }
  }, [popcardDetails, isPopcardDetailsSuccess]);

  useEffect(() => {
    refetchPopcardDetails(extractTextAfterPopcards(location.pathname));
  }, []);

  const handleWorkingHours = (action) => () => {
    if (action === "increment" && workingHours < 168) {
      setWorkingHours(workingHours + 1);
    } else if (action === "decrement" && workingHours > 0) {
      setWorkingHours(workingHours - 1);
    }
  };

  const updateUsername = (e) => {
    if (e.key === "Enter" || e.key === "Escape") {
      if (username === "" || username.length <= 3) {
        setShowInputToggle(true);
      } else {
        setShowInputToggle(false);
      }
    }
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    if (targetType === "google") {
      const profileData = {
        name: username,
        weekly_working_hours: workingHours,
        active: active,
        target: {
          value: googlePlaceId !== "" ? googlePlaceId : target,
          target_type: targetType,
          label: googlePlaceName
        }
      }
      await editPopcard({ id, profileData }).unwrap();
    } else {
      const profileData = {
        name: username,
        weekly_working_hours: workingHours,
        active: active,
        target: {
          value: target,
          target_type: targetType,
        },
      }
      await editPopcard({ id, profileData }).unwrap();
    }
  };

  const onFileChange = async (event) => {
    const file = event.target.files[0];

    if (file) {
      if (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg') {
        setAvatarSrc(URL?.createObjectURL(file));
        let formData = new FormData();
        formData.append("id", id);
        formData.append("image", file);
        await uploadProfile(formData).unwrap();
      }
    }
  };

  const handleTargetType = (type) => {
    setTargetType(type);
    if (type !== "google") {
      setTarget("");
      setGooglePlaceId("");
      setGooglePlaceName("");
    } else {
      setTarget("");
    }
  };

  const handleTargetChange = (value) => {
    setTarget(value);
  };

  const handleBlur = () => {
    if (username === "" || username.length <= 3) {
      setShowInputToggle(true);
    } else {
      setShowInputToggle(false);
    }
  };

  const handlePlaceSelected = (place) => {
    setGooglePlaceId(place?.place_id);
    setGooglePlaceName(place?.formatted_address);
    setTargetLabel(place?.formatted_address);
  };

  const { ref: googleAutocompleteRef } = usePlacesWidget({
    apiKey: "AIzaSyC1i5jAcct10As3D6AQBZbgwYWAtwD559Q",
    onPlaceSelected: (place) => handlePlaceSelected(place),
    inputAutocompleteValue: "country",
    options: {
      types: 'locality',
    },
  });

  const handleClearTextField = () => {
    setGooglePlaceId("");
    setGooglePlaceName("");
    setTargetLabel("");
    setTarget("");
  }

  const handleSwitchChange = (newActive) => {
    setActive(newActive);
  };

  return (
    <>
      <Container>
        {isPopcardDetailsLoading ? (
          <ProfilePopcardSkeleton />
        ) : (
          <>
            {popcardDetails?.id && (
              <Box className="popcardId">
                <Typography>{popcardDetails.id}</Typography>
                <img
                  src={copyLogo}
                  alt="Copy logo"
                  onClick={() => clipboardCopy(popcardDetails.id)}
                  style={{ cursor: "pointer" }}
                />
              </Box>
            )}
            <Box container={true} className="userDetails">
              <input
                type="file"
                id="contained-button-file"
                hidden
                onChange={onFileChange}
              />
              <label htmlFor="contained-button-file" className="profilePhotoContainer">
                {avatarSrc ? (
                  <img
                    className="profilePhoto"
                    src={avatarSrc}
                    alt="Profile Photo"
                  />
                ) : popcardDetails?.image ? (
                  <img
                    className="profilePhoto"
                    src={popcardDetails.image}
                    alt={popcardDetails.image}
                  />
                ) :
                  popcardDetails?.name === null ||
                    popcardDetails?.name === undefined ? (
                    <Avatar className="profilePhoto" />
                  ) : (
                    <Avatar
                      {...stringAvatar(popcardDetails.name)}
                      className="profilePhoto"
                    />
                  )}
                <Box className="uploadIconContainer">
                  <CloudUploadOutlinedIcon
                    className="uploadIcon"
                  />
                </Box>
              </label>
              <Typography className="cardPersonName">
                {showInputToggle ? (
                  <TextField
                    value={`${username}`}
                    onChange={(e) => setUsername(e.target.value)}
                    onKeyDown={updateUsername}
                    autoFocus
                    onBlur={handleBlur}
                    className="profilePopcardTextField"
                  />
                ) : (
                  <Box component="div">
                    {username}
                    <img
                      src={editLogo}
                      alt="edit"
                      onClick={() => setShowInputToggle(true)}
                      className="editIcon"
                    />
                  </Box>
                )}
              </Typography>
            </Box>
            <Box className="infoContainer">
              <IosSwitch
                checked={active}
                onChange={handleSwitchChange}
              />
              <Box className="actionButtonsContainer">
                <Typography className="targetTypography">Target</Typography>
                <FormControl className="profilePopcardTargets">
                  <Select
                    value={targetType}
                    onChange={(e) => handleTargetType(e.target.value)}
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                  >
                    <MenuItem value="" disabled className="profilePopcardSelectItemText">
                      Target
                    </MenuItem>
                    <MenuItem value="google">
                      <span className="profilePopcardSelectItem">
                        <img
                          className="profilePopcardSelectLogo"
                          src={GoogleIcon}
                          alt="URL Icon"
                        />
                        <Typography
                          className="profilePopcardSelectItemText"
                        >
                          Google
                        </Typography>
                      </span>
                    </MenuItem>
                    <MenuItem value="instagram">
                      <span className="profilePopcardSelectItem">
                        <img
                          className="profilePopcardSelectLogo"
                          src={InstagramIcon}
                          alt="Message Icon"
                        />
                        <Typography
                          className="profilePopcardSelectItemText"
                        >
                          Instagram
                        </Typography>
                      </span>
                    </MenuItem>
                    <MenuItem value="url">
                      <span className="profilePopcardSelectItem">
                        <img
                          className="profilePopcardSelectLogo"
                          src={urlIcon}
                          alt="URL Icon"
                        />
                        <Typography
                          className="profilePopcardSelectItemText"
                        >
                          URL
                        </Typography>
                      </span>
                    </MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  className="profilePopcardTextField"
                  inputRef={googleAutocompleteRef}
                  value={targetLabel && targetLabel}
                  variant="outlined"
                  fullWidth
                  label="Search for your business"
                  placeholder="Search for your business"
                  sx={{
                    display: targetType === "google" ? "block" : "none",
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment
                        position="end"
                        className="profilePopcardTextFiedlClearButton"
                        onClick={handleClearTextField}
                      >
                        {/* for when the palce is selected */}
                        {
                          ((googlePlaceName && googlePlaceName !== "")) && <ClearIcon sx={{ color: "#F1416C" }} />
                        }
                        {/* for when only the text is there */}
                        {
                          (targetLabel && targetLabel !== "" && googlePlaceName === "") && <ClearIcon />
                        }
                      </InputAdornment>
                    )
                  }}
                  onChange={(e) => setTargetLabel(e.target.value)}
                />
                {
                  targetType !== "google" &&
                  <TextField
                    variant="outlined"
                    value={googlePlaceId !== "" ? googlePlaceId : target}
                    onChange={(e) => handleTargetChange(e.target.value)}
                    className="profilePopcardTextField"
                    label={targetType === "instagram" ? "Enter Instagram username" : "Enter your website URL"}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment
                          position="end"
                          className="profilePopcardTextFiedlClearButton"
                          onClick={handleClearTextField}
                        >
                          {
                            target !== "" && <ClearIcon />
                          }
                        </InputAdornment>
                      )
                    }}
                  />
                }
              </Box>
              <Box className="workingHours">
                <Typography className="targetTypography">
                  Working hours per week
                </Typography>
                <Box className="currentWorkingHours">
                  <img
                    className="incDecIcon"
                    src={decrementLogo}
                    onClick={handleWorkingHours("decrement")}
                  />
                  <Typography className="incrementDecrement">
                    {workingHours}
                  </Typography>
                  <img
                    className="incDecIcon"
                    src={incrementLogo}
                    onClick={handleWorkingHours("increment")}
                  />
                </Box>
              </Box>
            </Box>
            <Tooltip
              title={
                (username === "" || username.length <= 3)
                && "Please fill in all the fields"
              }
            >
              <Box>
                <PopcardButton
                  value={isEditLoading ? <CircularProgress className="loader" size={20} /> : "Save"}
                  disabled={
                    username === "" ||
                    username.length <= 3 ||
                    (target === "" && googlePlaceId === "") ||
                    targetType === ""
                  }
                  onClick={handleSaveProfile}
                  startIcon={
                    <img
                      src={saveLogo}

                      style={{ width: "20px", height: "20px", display: `${isEditLoading ? "none" : "flex"}` }}
                    />
                  }
                />
              </Box>
            </Tooltip>
          </>
        )
        }
        {
          isEditSuccess &&
          <PopcardSnackbar
            message={"Profile has been saved"}
            severity="success"
          />
        }
        {
          isEditError &&
          <PopcardSnackbar
            message={editError?.data?.message}
            severity="error"
          />
        }
        {
          isProfileError &&
          <PopcardSnackbar
            message={pofileError?.data?.message}
            severity="error"
          />
        }
      </Container>
    </>
  );
};

ProfilePopcard.propTypes = {
  popcardDetails: PropTypes.object.isRequired,
  clipboardCopy: PropTypes.func.isRequired,
};

export default ProfilePopcard;
