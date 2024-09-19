exports.formatTime = (isoString) => {
  const date = new Date(isoString);

  // Get hours and minutes
  const hours = date.getUTCHours().toString().padStart(2, "0"); // Convert hours to 2-digit format
  const minutes = date.getUTCMinutes().toString().padStart(2, "0"); // Convert minutes to 2-digit format

  return `${hours}:${minutes}`; // Combine hours and minutes
};

exports.formatDate = (isoDateString) => {
  const date = new Date(isoDateString);
  const options = { day: "numeric", month: "short", year: "numeric" }; // For '2 Mar 2024'
  return date.toLocaleDateString("en-GB", options);
};
