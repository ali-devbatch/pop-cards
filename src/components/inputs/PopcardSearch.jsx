// styling
import '../../styles/Main.css';
import InputBase from '@mui/material/InputBase';
import { styled } from '@mui/material/styles';
import search from '../../assets/search.svg';
import ClearIcon from '@mui/icons-material/Clear';
import InputAdornment from '@mui/material/InputAdornment';
import useMediaQuery from '@mui/material/useMediaQuery';
// utils
import PropTypes from 'prop-types';

const StyledInputBase = styled(InputBase)(() => ({
  "&>img": {
    marginLeft: "10px",
  },
  "& .MuiInputBase-input": {
    paddingLeft: "10px",
    fontSize: "12px",
    color: "#A1A5B7",
    fontWeight: 600,
  }
}));

const PopcardSearch = ({ value, onChange, className, onRestore }) => {
  const maxWidth500 = useMediaQuery('(max-width:500px)');

  const handleClear = () => {
    onChange("");
    onRestore();
  }

  return (
    <StyledInputBase
      sx={{
        ml: 1,
        flex: 1,
        border: "1px solid #E1E3EA",
        padding: "3px",
        borderRadius: "5px",
        height: "40px",
        maxHeight: "40px",
      }}
      placeholder={maxWidth500 ? "Search" : "Search by Name or Target"}
      startAdornment={<img src={search} alt="search icon" className='bestPerformingIcon' />}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={className}
      endAdornment={
        <InputAdornment position="end">
          {
            value !== "" &&
            <ClearIcon
              className='bestPerformingSearchClear'
              onClick={handleClear}
            />
          }
        </InputAdornment>
      }
    />
  )
}

PopcardSearch.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  className: PropTypes.string,
  onRestore: PropTypes.func,
}

export default PopcardSearch;