// styling
import '../../../styles/BestPerforming.css';
import Typography from '@mui/material/Typography';
import Google from '@mui/icons-material/Google';
import InstagramIcon from '@mui/icons-material/Instagram';
import LanguageIcon from '@mui/icons-material/Language';
// utils
import PropTypes from 'prop-types';

const Target = ({ type, value }) => {
  return (
    <div className="bestPerformingTarget">
      {
        type === "url" ?
          <LanguageIcon /> :
          type === "google" ?
            <Google /> :
            type === "instagram" ?
              <InstagramIcon /> : null
      }
      <Typography className="bestPerformingTargetName">
        {value}
      </Typography>
    </div>
  )
};

Target.propTypes = {
  type: PropTypes.string || PropTypes.null,
  value: PropTypes.string || PropTypes.null,
};

export default Target;