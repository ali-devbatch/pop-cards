// styling
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
// utils
import PropTypes from 'prop-types';

export default function TopNavigation(props) {

  const { tabChange, value } = props;

  return (
    <Box className='topTabs'>
      <Tabs value={value} onChange={tabChange} centered>
        <Tab label="User Profile" />
        <Tab label="Analytics" />
      </Tabs>
    </Box>
  );
}

TopNavigation.propTypes = {
  tabChange: PropTypes.func.isRequired,
  value: PropTypes.number.isRequired,
};