import { useParams } from "react-router-dom";
import useExpenses from "../hooks/useExpense";
import {
  Box,
  Container,
  Heading,
  VStack,
  Spinner,
  Button,
  Text,
  Flex,
  useColorModeValue,
} from "@chakra-ui/react";
import ExpenseItem from "../components/ExpenseItem";
import { navigate } from "../lib/navigation";

const BudgetDetails = () => {
  const { budgetId } = useParams();
  const { expenses, isLoading, error } = useExpenses(budgetId);

  const cardBg = useColorModeValue("white", "gray.700");
  const cardShadow = useColorModeValue("md", "dark-lg");

  if (isLoading)
    return (
      <Flex justify="center" align="center" minH="50vh">
        <Spinner size="xl" />
      </Flex>
    );
  if (error)
    return (
      <Box textAlign="center" py={10}>
        <Text color="red.500">An error occurred: {error.message}</Text>
      </Box>
    );

  return (
    <Container maxW="container.xl" py={6}>
      <Box
        borderWidth="1px"
        borderRadius="lg"
        p={6}
        bg={cardBg}
        boxShadow={cardShadow}
      >
        <Heading as="h2" size="lg" mb={4} color="blue.500" textAlign="center">
          Expenses for Budget
        </Heading>
        <Flex justify="center" mb={4}>
          <Button colorScheme="blue" onClick={() => navigate("/add-expense")}>
            Add Expense
          </Button>
        </Flex>
        <VStack spacing={4} align="stretch">
          {expenses.length > 0 ? (
            expenses.map((expense) => (
              <ExpenseItem key={expense.id} expense={expense} />
            ))
          ) : (
            <Text textAlign="center">No expenses found for this budget.</Text>
          )}
        </VStack>
      </Box>
    </Container>
  );
};

export default BudgetDetails;
