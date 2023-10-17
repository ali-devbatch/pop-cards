// styling
import '../../styles/BestPerforming.css';
import {
  Button
} from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
// utils
import PropTypes from 'prop-types';

const PopcardTablePagination = ({ totalPages, onPageChange, page }) => {

  const handlePageChange = (page) => {
    onPageChange(page);
  };

  const renderPaginationButtons = () => {
    const buttons = [];
    const maxButtons = 5;

    for (let i = 1; i <= totalPages; i++) {
      if (buttons.length === maxButtons) break;
      buttons.push(
        <Button
          key={i}
          onClick={() => handlePageChange(i)}
          className={
            page === i
              ? 'bestPerformingTablePaginationButtonSelected'
              : 'bestPerformingTablePaginationButton'
          }
          disabled={page === i}
        >
          {i}
        </Button>
      );
    }

    return buttons;
  }

  return (
    <div className="bestPerformingTablePagination">
      <Button
        onClick={() => handlePageChange(page - 1)}
        disabled={page === 1}
        className='bestPerformingTablePaginationChevron'
        style={{ marginRight: '10px' }}
      >
        <ChevronLeftIcon />
      </Button>
      <>{renderPaginationButtons()}</>
      <Button
        onClick={() => handlePageChange(page + 1)}
        disabled={page === totalPages}
        className='bestPerformingTablePaginationChevron'
      >
        <ChevronRightIcon />
      </Button>
    </div>
  )
}

PopcardTablePagination.propTypes = {
  totalPages: PropTypes.number,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number,
};

export default PopcardTablePagination;