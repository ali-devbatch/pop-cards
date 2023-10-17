import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import PropTypes from 'prop-types';

const IOSSwitch = styled(({ checked, onChange, ...props }) => (
  <Switch
    focusVisibleClassName=".Mui-focusVisible"
    disableRipple
    {...props}
    checked={checked}
    onChange={(e) => onChange(e.target.checked)}
  />
))(({ theme, checked }) => ({
  width: 84,
  height: 30,
  padding: 0,
  cursor: 'pointer',
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(55px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        background: '#FBBF24',
        opacity: 1,
        border: 0,
        padding: '10px'
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#33cf4d',
      border: '6px solid #fff',
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color: theme.palette.mode === 'light'
        ? theme.palette.grey[100]
        : theme.palette.grey[600],
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 24,
    height: 24,
    marginTop: '1px',
  },
  '& .MuiSwitch-track': {
    padding: '10px',
    borderRadius: '23.041px',
    background: '#E9E9EA',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
    '&:after, &:before': {
      position: 'absolute',
      top: '3.2px',
      color: "#78350F",
      fontFamily: "Poppins",
      fontSize: "12.289px",
      fontStyle: "normal",
      fontWeight: 500,
      lineHeight: "normal"
    },
    '&:after': {
      content: checked && "'Active'",
      left: '8px',
      display: "flex",
      alignItems: "center",
      height: "75%"
    },
    '&:before': {
      content: !checked && "'Inactive'",
      right: '7px',
      display: "flex",
      alignItems: "center",
      height: "75%"
    },
  },
}));

export default function IosSwitch(props) {
  const [checked, setChecked] = useState(props.checked);

  const handleChange = () => {
    setChecked((prevChecked) => !prevChecked);
    props.onChange(!checked);
  };

  useEffect(() => {
    setChecked(props.checked);
  }, [props.checked]);

  return (
    <label>
      <input
        type="checkbox"
        checked={checked}
        onChange={handleChange}
        style={{ display: 'none' }}
      />
      <IOSSwitch
        sx={{ marginTop: 1 }}
        checked={checked}
        onChange={props.onChange}
      />
    </label>
  );
}

IosSwitch.propTypes = {
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};
