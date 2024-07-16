import { Route, Routes, useNavigate } from "react-router-dom";
import AppContainer from "./components/AppContainer";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Settings from "./pages/Settings";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import VerifyEmail from "./pages/VerifyEmail";
import { setNavigate } from "./lib/navigation";
import Home from "./pages/Home";
import BudgetForm from "./pages/BudgetForm";
import GoalForm from "./pages/GoalForm";
import BudgetDetails from "./pages/BudgetDetails";
import ExpenseForm from "./pages/ExpenseForm";
import GoalDetails from "./pages/GoalDetails";
import UpdateBudgetForm from "./pages/UpdateBudgetForm";
import UpdateGoalForm from "./pages/UpdateGoalForm";

function App() {
  // set the navigate function on our API client for use in the axios error interceptor
  // this allows us to redirect to the login page when an auth error occurs
  const navigate = useNavigate();
  setNavigate(navigate);
  return (
    <Routes>
      <Route path="/" element={<AppContainer />}>
        <Route index element={<Home />} />
        <Route path="profile" element={<Profile />} />
        <Route path="settings" element={<Settings />} />
        <Route path="add-budget" element={<BudgetForm />} />
        <Route path="add-goal" element={<GoalForm />} />
        <Route path="add-expense" element={<ExpenseForm />} />
        <Route path="update-budget/:budgetId" element={<UpdateBudgetForm />} />
        <Route path="update-goal/:goalId" element={<UpdateGoalForm />} />

        <Route path="goals/:goalId" element={<GoalDetails />} />
        <Route path="budgets/:budgetId" element={<BudgetDetails />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/email/verify/:code" element={<VerifyEmail />} />
      <Route path="/password/forgot" element={<ForgotPassword />} />
      <Route path="/password/reset" element={<ResetPassword />} />
    </Routes>
  );
}

export default App;
