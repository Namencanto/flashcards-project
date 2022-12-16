import { Pie } from "react-chartjs-2";
function AllStatusesPieChart({ statuses, options }) {
  const colors = ["green", "lightgreen", "lightblue", "orange", "crimson"];
  const chartColors = [];
  const statusesValues = Object.values(statuses);
  colors.forEach((color, i) => {
    if (statusesValues[i] > 0) chartColors.push(color);
  });

  const labels = [];

  for (const key in statuses) {
    if (statuses[key] > 0) {
      // Split the key on capital letters and convert to normal case
      const splitKey = key
        .replace(/([A-Z])/g, " $1")
        .trim()
        .toLowerCase();
      // Uppercase the first letter of each word
      const formattedKey = splitKey.replace(/\b\w/g, function (l) {
        return l.toUpperCase();
      });
      labels.push(formattedKey);
    }
  }

  function checkStatusesExist(obj) {
    for (const value of Object.values(obj)) {
      if (value !== 0) {
        return true;
      }
    }
    return false;
  }
  const allStatuses = {
    labels,
    datasets: [
      {
        data: statusesValues.filter((val) => val > 0),
        backgroundColor: chartColors,
      },
    ],
  };
  return checkStatusesExist(statuses) ? (
    <>
      <h2>Your techcards statuses:</h2>
      <Pie data={allStatuses} options={options} />
    </>
  ) : (
    ""
  );
}

export default AllStatusesPieChart;
