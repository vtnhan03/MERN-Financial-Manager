import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  Text,
  useToast,
} from "@chakra-ui/react";
import { createExpense } from "../lib/api"; // Adjust the import path as necessary
import useCategories from "../hooks/useCategory"; // Adjust the import path as necessary
import useBudgets from "../hooks/useBudget";

const ExpenseForm = () => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [expenseDate, setExpenseDate] = useState("");
  const [budgetId, setBudgetId] = useState("");

  const toast = useToast();
  const queryClient = useQueryClient();
  const formatAmount = (value) => {
    const numericValue = value.replace(/[^0-9]/g, "");
    return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };
  const handleAmountChange = (e) => {
    const value = e.target.value;
    const formattedAmount = formatAmount(value);
    setAmount(formattedAmount);
  };

  const { categories } = useCategories();
  const { budgets } = useBudgets();
  const { mutate: addExpense, isLoading } = useMutation({
    mutationFn: createExpense,
    onSuccess: () => {
      toast({
        title: "Expense created.",
        description: "Your expense has been successfully created.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      queryClient.invalidateQueries(["expenses"]);
      // Reset form fields
      setName("");
      setAmount("");
      setCategoryId("");
      setExpenseDate("");
    },
    onError: (error) => {
      toast({
        title: "Error creating expense.",
        description:
          error?.response?.data?.message ||
          "There was an error processing your request.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addExpense({
      name,
      amount,
      categoryId,
      budgetId,
      expenseDate,
    });
  };

  return (
    <Container>
      <Flex height="100vh" alignItems="center" justifyContent="center">
        <Box
          p={8}
          maxWidth="500px"
          borderWidth={1}
          borderRadius={8}
          boxShadow="lg"
        >
          <form onSubmit={handleSubmit}>
            <FormControl isRequired>
              <FormLabel>Name</FormLabel>
              <Input
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormControl>
            <FormControl isRequired mt={6}>
              <FormLabel>Amount</FormLabel>
              <Input
                type="text"
                placeholder="Enter amount"
                value={amount}
                onChange={handleAmountChange}
                mr={2}
              />
              <Text alignSelf="center">VND</Text>
            </FormControl>
            <FormControl isRequired mt={4}>
              <FormLabel>Budget</FormLabel>
              <Select
                placeholder="Select budget"
                value={budgetId}
                onChange={(e) => setBudgetId(e.target.value)}
              >
                {budgets.map((budget) => (
                  <option key={budget._id} value={budget._id}>
                    {budget.name}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl isRequired mt={4}>
              <FormLabel>Category</FormLabel>
              <Select
                placeholder="Select category"
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
              >
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl isRequired mt={4}>
              <FormLabel>Expense Date</FormLabel>
              <Input
                type="date"
                value={expenseDate}
                onChange={(e) => setExpenseDate(e.target.value)}
              />
            </FormControl>
            <Button width="full" mt={4} type="submit" isLoading={isLoading}>
              Submit
            </Button>
          </form>
        </Box>
      </Flex>
    </Container>
  );
};

export default ExpenseForm;
