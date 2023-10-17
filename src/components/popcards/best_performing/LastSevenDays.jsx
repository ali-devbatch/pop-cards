import { useState } from 'react';
// styling
import '../../../styles/BestPerforming.css';
// utils
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import PropTypes from 'prop-types';
import {
  convertDatesToDayNames
} from '../../../utils/functions';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    tooltip: {
      enabled: false,
    },
    labels: {
      enabled: false,
    }
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
      ticks: {
        display: false,
      },
      border: {
        display: false
      }
    },
    y: {
      grid: {
        display: false,
      },
      ticks: {
        display: false,
      },
      border: {
        display: false
      }
    }
  }
};

const LastSevenDays = ({ chartData, trend }) => {
  const [labels,] = useState(convertDatesToDayNames(chartData.x));
  const [values,] = useState(chartData.y);

  return (
    <Line
      data={{
        labels,
        datasets: [
          {
            data: labels.map((l, index) => values[index]),
            borderColor: trend === "neutral" ? "#FFBF00" : trend === "up" ? "#50cd89" : "#f1416c",
            pointStyle: false
          },
        ]
      }}
      options={options}
      style={{
        maxWidth: "100px",
        maxHeight: "50px",
      }}
    />
  )
}

LastSevenDays.propTypes = {
  chartData: PropTypes.object.isRequired,
}

export default LastSevenDays;