const formatDate = isoString => {
  const date = new Date(isoString); // Parse the ISO string
  const day = String(date.getDate()).padStart(2, '0'); // Add leading zero to day
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};

export { formatDate };
