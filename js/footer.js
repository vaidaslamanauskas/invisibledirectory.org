// Function to get the current date in the format "March 29, 2024"
function getCurrentDate() {
  const currentDate = new Date();
  const month = currentDate.getMonth();
  const day = currentDate.getDate();
  const year = currentDate.getFullYear();

  return `${getMonthName(month)} ${day}, ${year}`;
}

// Function to get month name because javascript is the way it is really ...
function getMonthName(monthIndex) {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  return months[monthIndex];
}

// Update the content of the div with id "todays-date"
document.getElementById('todays-date').innerHTML = getCurrentDate();