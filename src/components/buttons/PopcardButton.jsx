// styling
import { Button } from "@mui/material";
// utils
import PropTypes from 'prop-types';

const PopcardButton = (props) => {
  return (
    <Button
      variant="contained"
      sx={{
        width: "100%",
        background: "#FBBF24",
        padding: "16px 4px",
        fontSize: "16px",
        fontWeight: 600,
        boxShadow: "none",
        borderRadius: "5px",
        marginBottom: "20px",
        textTransform: "none",
        maxHeight: "46px",
        "&:hover": {
          background: "#F0B10E",
          boxShadow: "none",
        }
      }}
      {...props}
    >
      {props.value}
    </Button>
  );
}

PopcardButton.propTypes = {
  value: PropTypes.string,
}

export default PopcardButton;