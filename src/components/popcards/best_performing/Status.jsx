// styling
import '../../../styles/BestPerforming.css';
import Typography from '@mui/material/Typography';
// utils
import PropTypes from 'prop-types';

const Status = ({ status }) => {
  return (
    <div className={status ? "bestPerformingStatusActive" : "bestPerformingStatusInactive"}>
      <Typography className={status ? "bestPerformingStatusTextActive" : "bestPerformingStatusTextInactive"}>
        {status ? "Active" : "Inactive"}
      </Typography>
    </div>
  )
};

Status.propTypes = {
  status: PropTypes.bool.isRequired,
};

export default Status;