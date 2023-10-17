export const stringToColor = (string) => {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
};

export const stringAvatar = (name) => {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: name.includes(" ")
      ? `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`
      : name.slice(0, 2).toUpperCase(),
  };
};

export const formatDateAgo = (date) => {
  const now = new Date();
  const timeDiff = now - date; // Difference in milliseconds

  const years = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 365));
  const months = Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 30));
  const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

  if (years > 0) {
    return years === 1 ? "1 year ago" : `${years} years ago`;
  } else if (months > 0) {
    return months === 1 ? "1 month ago" : `${months} months ago`;
  } else if (days > 0) {
    return days === 1 ? "1 day ago" : `${days} days ago`;
  } else {
    return "Today";
  }
};

export const descendingComparator = (a, b, orderBy) => {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
};

// export const getComparator = (order, orderBy) => {
//   return order === "desc"
//     ? (a, b) => descendingComparator(a, b, orderBy)
//     : (a, b) => -descendingComparator(a, b, orderBy);
// }

// export const stableSort = (array, comparator) => {
//   if (array === undefined || array?.length <= 0) return []

//   const stabilizedThis = array?.map((el, index) => [el, index]);
//   stabilizedThis.sort((a, b) => {
//     const order = comparator(a[0], b[0]);
//     if (order !== 0) {
//       return order;
//     }
//     return a[1] - b[1];
//   });
//   return stabilizedThis.map((el) => el[0]);
// }

export const convertDatesToDayNames = (dates) => {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const dayNames = dates.map((date) => {
    const dayOfWeek = new Date(date).getDay();
    return daysOfWeek[dayOfWeek];
  });

  return dayNames;
};

export const formatDateRange = (startDate, endDate, type) => {
  const options = {
    year: "numeric",
    month: type === "short" ? "short" : "long",
    day: "numeric",
  };
  const startFormatted = startDate.toLocaleDateString(undefined, options);
  const endFormatted = endDate.toLocaleDateString(undefined, options);

  return `${startFormatted} - ${endFormatted}`;
};

const formatDateWithOrdinal = (utcDateString, unit) => {
  const date = new Date(utcDateString);
  const day = date.getUTCDate();
  const date_time_str = utcDateString;
  const date_time_parts = date_time_str.split("T");
  const time_part = date_time_parts[1].slice(0, 5);
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const monthName = monthNames[date.getUTCMonth()];

  let dayWithOrdinal;
  if (day === 1 || day === 21 || day === 31) {
    dayWithOrdinal = `${day}st`;
  } else if (day === 2 || day === 22) {
    dayWithOrdinal = `${day}nd`;
  } else if (day === 3 || day === 23) {
    dayWithOrdinal = `${day}rd`;
  } else {
    dayWithOrdinal = `${day}th`;
  }

  if (unit == "month") {
    return `${monthName}`;
  } else if (unit == "hour") {
    return `${dayWithOrdinal} ${monthName} - ${time_part}`;
  } else {
    return `${dayWithOrdinal} ${monthName}`;
  }
};

export const formatDatesToDayMonth = (utcDatesArray, unit) => {
  return utcDatesArray.map((date) => formatDateWithOrdinal(date, unit));
};

export const customRounding = (decimalValue) => {
  const firstDecimal = (decimalValue * 10) % 10;

  if (firstDecimal > 5) {
    return Math.ceil(decimalValue);
  } else {
    return Math.floor(decimalValue);
  }
};

export const checkWildcardRouter = (routes, pathname) => {
  return routes.some((str) => pathname.startsWith(str.substring(0, 9)));
};

export const extractTextAfterPopcards = (inputString) => {
  const keyword = "/popcards/";
  const index = inputString.indexOf(keyword);

  if (index !== -1) {
    return inputString.substring(index + keyword.length);
  }

  return "";
};

export const getTokenFromQueryString = () => {
  // Get the current URL's search parameters
  const queryString = window.location.search;

  // Create a URLSearchParams object from the query string
  const searchParams = new URLSearchParams(queryString);

  // Check if the 'token' parameter exists in the query string
  if (searchParams.has("token")) {
    // Retrieve and return the value of the 'token' parameter
    return searchParams.get("token");
  } else {
    // If 'token' parameter is not found, return null or handle the absence as needed
    return null;
  }
};

export const getGreeting = (userName) => {
  if (!userName || typeof userName !== "string") {
    return "Hello!";
  }
  const currentTime = new Date().getHours();
  let timeOfDay;
  if (currentTime >= 5 && currentTime < 12) {
    timeOfDay = "morning";
  } else if (currentTime >= 12 && currentTime < 17) {
    timeOfDay = "afternoon";
  } else if (currentTime >= 17 && currentTime < 21) {
    timeOfDay = "evening";
  } else {
    timeOfDay = "night";
  }
  const firstName = userName?.split(" ")[0];

  return `Good ${timeOfDay}, ${firstName}`;
};
