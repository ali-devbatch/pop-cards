// styling
import "../../styles/BasicCard.css";
import { Box, Typography, Container } from "@mui/material";
// import upLogo from '../../assets/arrowUp.svg';
// import downLogo from '../../assets/arrowDown.svg';
// utils
import PropTypes from "prop-types";

export default function BasicCard(props) {
  const {
    icon,
    value,
    title,
    // percentage,
    // trend
  } = props;

  return (
    <>
      <Container className="basicCardContainer">
        <Box className="basicCardTop">
          <img src={icon} alt={icon} />
        </Box>
        <Box className="basicCardBottom">
          <Box className="basicCardBottomLeft">
            <Typography className="basicCardBottomLeftLarge">
              {value}
            </Typography>
            <Typography className="basicCardBottomLeftSmall">
              {title}
            </Typography>
          </Box>
          {/* <Box className={trend === "up" ? "basicCardBottomRightUp" : "basicCardBottomRightDown"}>
             <Typography fontWeight={600}>
               <img src={trend === 'up' ? upLogo : downLogo} /> {" " + percentage}
             </Typography>
           </Box> */}
        </Box>
      </Container>
    </>
  );
}

BasicCard.propTypes = {
  icon: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  // percentage: PropTypes.string.isRequired,
  // trend: PropTypes.string.isRequired
};
