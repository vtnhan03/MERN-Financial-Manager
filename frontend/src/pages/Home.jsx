import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Text,
  VStack,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Spinner,
  useColorModeValue,
} from "@chakra-ui/react";
import useGoals from "../hooks/useGoal";
import useBudgets from "../hooks/useBudget";
import { useNavigate } from "react-router-dom";
import useDeleteBudget from "../hooks/useDeleteBudget";
import { useQueryClient } from "@tanstack/react-query";
import useDeleteGoal from "../hooks/useDeleteGoal";
import GoalRatioGraphic from "../components/GoalRatioGraphic";
import BudgetProgressGraphic from "../components/BudgetProgressGraphic";

const HomePage = () => {
  const navigate = useNavigate();
  const { goals } = useGoals();
  const { budgets } = useBudgets();
  const { deleteBudget, isPending } = useDeleteBudget();
  const { deleteGoal, isGoalPending } = useDeleteGoal();
  const queryClient = useQueryClient();

  const addBudget = () => {
    navigate("/add-budget");
  };

  const addGoal = () => {
    navigate("/add-goal");
  };

  const updateBudget = (budgetId) => {
    navigate(`/update-budget/${budgetId}`);
  };
  const budgetDetail = (budgetId) => {
    navigate(`/budgets/${budgetId}`);
  };
  const goalDetail = (goalId) => {
    navigate(`/goals/${goalId}`);
  };
  const updateGoal = (goalId) => {
    navigate(`/update-goal/${goalId}`);
  };
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "VND",
      minimumFractionDigits: 0,
    })
      .format(value)
      .replace(/\D00(?=\D*$)/, "");
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleDeleteBudget = async (budgetId) => {
    try {
      await deleteBudget(budgetId);
      queryClient.invalidateQueries(["budgets"]);
      queryClient.invalidateQueries(["goals"]);
    } catch (error) {
      console.error("Error deleting budget:", error);
    }
  };

  const handleDeleteGoal = async (goalId) => {
    try {
      await deleteGoal(goalId);
      queryClient.invalidateQueries(["budgets"]);
      queryClient.invalidateQueries(["goals"]);
    } catch (error) {
      console.error("Error deleting goal:", error);
    }
  };

  const cardBg = useColorModeValue("white", "gray.700");
  const cardShadow = useColorModeValue("md", "dark-lg");

  return (
    <Container maxW="container.xl" py={6}>
      <Flex direction={{ base: "column", md: "row" }} gap={6}>
        <Box
          flex="1"
          borderWidth="1px"
          borderRadius="lg"
          p={6}
          bg={cardBg}
          boxShadow={cardShadow}
        >
          <Heading size="lg" mb={6} color="blue.500">
            Budgets
          </Heading>
          <Button colorScheme="blue" onClick={addBudget} mb={6}>
            Add Budget
          </Button>
          {budgets.length > 0 ? (
            <VStack spacing={6}>
              {budgets.map((budget) => (
                <Card
                  key={budget._id}
                  p={5}
                  shadow="md"
                  borderWidth="1px"
                  bg={cardBg}
                  boxShadow={cardShadow}
                >
                  <CardHeader>
                    <Heading fontSize="xl">{budget.name}</Heading>
                  </CardHeader>
                  <CardBody>
                    <Text>Total: {formatCurrency(budget.amount)}</Text>
                    <Text>
                      Left:{" "}
                      {budget.amountLeft
                        ? formatCurrency(budget.amountLeft)
                        : "N/A"}
                    </Text>
                    <Text>
                      Description:{" "}
                      {budget.description ? budget.description : "N/A"}
                    </Text>
                    <BudgetProgressGraphic
                      totalBudget={budget.amount}
                      currentSpending={budget.amountLeft}
                    />
                  </CardBody>
                  <CardFooter>
                    <Button
                      colorScheme="red"
                      size="sm"
                      onClick={() => handleDeleteBudget(budget._id)}
                      isLoading={isPending}
                      mr={3}
                    >
                      Delete
                    </Button>
                    <Button
                      colorScheme="blue"
                      size="sm"
                      onClick={() => budgetDetail(budget._id)}
                      mr={3}
                    >
                      Details
                    </Button>
                    <Button
                      colorScheme="blue"
                      size="sm"
                      onClick={() => updateBudget(budget._id)}
                    >
                      Update
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </VStack>
          ) : (
            <Flex justify="center" align="center">
              <Spinner size="xl" />
              <Text ml={4}>Loading budgets or no budgets available...</Text>
            </Flex>
          )}
        </Box>

        <Box
          flex="1"
          borderWidth="1px"
          borderRadius="lg"
          p={6}
          bg={cardBg}
          boxShadow={cardShadow}
        >
          <Heading size="lg" mb={6} color="green.500">
            Goals
          </Heading>
          <Button colorScheme="green" onClick={() => addGoal()} mb={6}>
            Add Goal
          </Button>
          <VStack spacing={6}>
            {goals.length > 0 ? (
              goals.map((goal) => (
                <Card
                  key={goal._id}
                  p={5}
                  shadow="md"
                  borderWidth="1px"
                  bg={cardBg}
                  boxShadow={cardShadow}
                >
                  <CardHeader>
                    <Heading fontSize="xl">{goal.name}</Heading>
                  </CardHeader>
                  <CardBody>
                    <Text>Goal: {formatCurrency(goal.targetAmount)}</Text>
                    <Text>
                      Current Amount:{" "}
                      {goal.currentAmount
                        ? formatCurrency(goal.currentAmount)
                        : "N/A"}
                    </Text>
                    <Text>
                      Due Date:{" "}
                      {goal.dueDate ? formatDate(goal.dueDate) : "N/A"}
                    </Text>
                    <GoalRatioGraphic
                      goalAmount={goal.targetAmount}
                      currentAmount={goal.currentAmount}
                    />
                  </CardBody>
                  <CardFooter>
                    <Button
                      colorScheme="red"
                      size="sm"
                      onClick={() => handleDeleteGoal(goal._id)}
                      isLoading={isGoalPending}
                      mr={3}
                    >
                      Delete
                    </Button>
                    <Button
                      colorScheme="blue"
                      size="sm"
                      onClick={() => goalDetail(goal._id)}
                      mr={3}
                    >
                      Details
                    </Button>
                    <Button
                      colorScheme="blue"
                      size="sm"
                      onClick={() => updateGoal(goal._id)}
                      mr={3}
                    >
                      Update
                    </Button>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <Flex justify="center" align="center">
                <Spinner size="xl" />
                <Text ml={4}>Loading goals or no goals available...</Text>
              </Flex>
            )}
          </VStack>
        </Box>
      </Flex>
    </Container>
  );
};

export default HomePage;
