export const daysLeft = (deadline) => {
  const differnce = new Date(deadline).getTime() - Date.now();
  const remainingDays = differnce / (1000 * 3600 * 24);

  return remainingDays.toFixed(0);
};

export const calculateBarPercentage = (goal, raisedAmount) => {
  const percentage = Math.round((raisedAmount * 100) / goal);

  return percentage;
};

export const checkIfImage = (url, callback) => {
  const img = new Image();
  img.src = url;

  if (img.complete) {
    callback(ture);
  }

  img.onload = () => callback(true);
  img.onerror = () => callback(false);
};
