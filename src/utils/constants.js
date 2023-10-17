export const headCells = [
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Name",
    sort: true,
  },
  {
    id: "target",
    numeric: false,
    disablePadding: false,
    label: "Target",
    sort: false,
  },
  {
    id: "active",
    numeric: false,
    disablePadding: false,
    label: "Status",
    sort: false,
  },
  {
    id: "last_scanned",
    numeric: true,
    disablePadding: false,
    label: "Last Scanned",
    sort: true,
  },
  {
    id: "scans_per_hour",
    numeric: true,
    disablePadding: false,
    label: "Scans Per Hour",
    sort: true,
  },
  {
    id: "last_7_days_chart_data",
    numeric: false,
    disablePadding: false,
    label: "Last 7 Days",
    sort: false,
  }
];

export const TimeIntervals = {
  today: new Date(),
  oneWeekAgo: (() => {
    const date = new Date();
    date.setDate(date.getDate() - 7);
    return date;
  })(),
  oneMonthAgo: (() => {
    const date = new Date();
    date.setMonth(date.getMonth() - 1);
    return date;
  })(),
  threeMonthsAgo: (() => {
    const date = new Date();
    date.setMonth(date.getMonth() - 3);
    return date;
  })(),
  oneYearAgo: (() => {
    const date = new Date();
    date.setFullYear(date.getFullYear() - 1);
    return date;
  })(),
};