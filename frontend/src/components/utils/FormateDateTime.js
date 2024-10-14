export const formatDateTime = (dateString) => {
  const dateObj = new Date(dateString);
  const option = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const formattedDate = dateObj.toLocaleDateString(undefined, option);

  let hours = dateObj.getHours();
  const minutes = dateObj.getMinutes();
  const ampm = hours > 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12;
  const formattedTime = `${hours}:${minutes < 10 ? "0" : ""}${minutes} ${ampm}`;
  return `${formattedDate} at ${formattedTime}`;
};
