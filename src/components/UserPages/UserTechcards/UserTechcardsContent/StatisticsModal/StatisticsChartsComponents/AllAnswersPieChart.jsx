import { Pie } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js";
function AllAnswersPieChart({ data, options }) {
  const folderAnswersRight = data.allRight.reduce((a, b) => a + b, 0);
  const folderAnswersWrong = data.allWrong.reduce((a, b) => a + b, 0);

  const allAnswers = {
    labels: ["Right", "Wrong"],

    datasets: [
      {
        data: [folderAnswersRight, folderAnswersWrong],
        backgroundColor: ["#00ff00", "#ff0000"],
        borderColor: ["#007700", "#770000"],
        borderWidth: 1,
      },
    ],
  };
  return data.allRight.length !== 0 || data.allWrong.length !== 0 ? (
    <>
      <h2>Your right and wrong answers from all time:</h2>
      <Pie data={allAnswers} options={options} />
    </>
  ) : (
    ""
  );
}

export default AllAnswersPieChart;
