// styling
import '../../../styles/BestPerforming.css';
import {
  Avatar,
  Typography
} from '@mui/material';
// utils
import {
  stringAvatar,
} from '../../../utils/functions';
import PropTypes from 'prop-types';

const User = ({ image, name }) => {
  return (
    <div className="bestPerformingUser">
      <span className='bestPerformingUserImageContainer'>
        {
          image ? (
            <img src={image} alt={name} className="bestPerformingUserImage" />
          ) : (
            <Avatar {...stringAvatar(name)} className="bestPerformingUserImage" />
          )
        }
      </span>
      <Typography className="bestPerformingUserName">
        {name ? name : "N/A"}
      </Typography>
    </div>
  );
};

User.propTypes = {
  image: PropTypes.string || PropTypes.null,
  name: PropTypes.string || PropTypes.null,
};

export default User;