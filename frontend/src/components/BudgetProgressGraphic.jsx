import { Doughnut } from "react-chartjs-2";
import "chart.js/auto";

const BudgetProgressGraphic = ({ totalBudget, currentSpending }) => {
  const remainingBudget = totalBudget - currentSpending;

  const data = {
    labels: ["Current Spending", "Remaining Budget"],
    datasets: [
      {
        data: [currentSpending, remainingBudget],
        backgroundColor: ["rgba(255, 206, 86, 0.6)", "rgba(75, 192, 192, 0.6)"],
        borderColor: ["rgba(255, 206, 86, 1)", "rgba(75, 192, 192, 1)"],
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

export default BudgetProgressGraphic;
