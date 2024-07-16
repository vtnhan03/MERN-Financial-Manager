import { Doughnut } from "react-chartjs-2";
import "chart.js/auto";

const GoalRatioGraphic = ({ goalAmount, currentAmount }) => {
  const remainingAmount = goalAmount - currentAmount;

  const data = {
    labels: ["Current Amount", "Remaining Amount"],
    datasets: [
      {
        label: "Goal Progress",
        data: [currentAmount, remainingAmount],
        backgroundColor: ["rgba(54, 162, 235, 0.6)", "rgba(255, 99, 132, 0.6)"],
        borderColor: ["rgba(54, 162, 235, 1)", "rgba(255, 99, 132, 1)"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
    },
  };

  return <Doughnut data={data} options={options} />;
};

export default GoalRatioGraphic;
