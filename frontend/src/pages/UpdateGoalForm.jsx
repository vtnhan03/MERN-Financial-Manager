import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import { updateGoal } from "../lib/api";
import useGoalById from "../hooks/useGoalById";
import { useParams } from "react-router-dom";

const formatAmount = (value) => {
  if (typeof value !== "string") {
    value = String(value);
  }
  const numericValue = value.replace(/[^0-9]/g, "");
  return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

const UpdateGoalForm = () => {
  const { goalId } = useParams();
  const { goal } = useGoalById(goalId);
  const [name, setName] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const [dueDate, setDueDate] = useState("");
  const toast = useToast();

  useEffect(() => {
    if (goal) {
      setName(goal.name || "");
      setTargetAmount(formatAmount(goal.targetAmount) || "");
      setDueDate(
        goal.dueDate ? new Date(goal.dueDate).toISOString().split("T")[0] : ""
      );
    }
  }, [goal]);

  const { mutate: updateGoalMutation, isLoading } = useMutation({
    mutationFn: updateGoal,
    onSuccess: () => {
      toast({
        title: "Goal updated.",
        description: "Your goal has been successfully updated.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    },
    onError: () => {
      toast({
        title: "Error.",
        description: "There was an error updating your goal.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !targetAmount || !dueDate) {
      alert("Please fill in all fields.");
      return;
    }
    const getFormattedDueDate = () => {
      return new Date(dueDate).toISOString().split("T")[0];
    };
    updateGoalMutation({
      id: goalId,
      name,
      targetAmount: targetAmount.replace(/\./g, ""),
      dueDate: getFormattedDueDate(),
    });
  };

  const handleAmountChange = (e) => {
    const value = e.target.value;
    const formattedAmount = formatAmount(value);
    setTargetAmount(formattedAmount);
  };

  return (
    <Container>
      <Flex height="100vh" alignItems="center" justifyContent="center">
        <Box
          p={8}
          maxWidth="400px"
          borderWidth={1}
          borderRadius={8}
          boxShadow="lg"
        >
          <Box textAlign="center">
            <Heading>Update Goal</Heading>
          </Box>
          <Box my={4} textAlign="left">
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
                <FormLabel>Target Amount</FormLabel>
                <Input
                  type="text"
                  placeholder="Enter amount"
                  value={targetAmount}
                  onChange={handleAmountChange}
                  mr={2}
                />
                <Text alignSelf="center">VND</Text>
              </FormControl>
              <FormControl isRequired mt={6}>
                <FormLabel>Due Date</FormLabel>
                <Input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  mr={2}
                />
              </FormControl>
              <Button width="full" mt={4} type="submit" isLoading={isLoading}>
                Submit
              </Button>
            </form>
          </Box>
        </Box>
      </Flex>
    </Container>
  );
};

export default UpdateGoalForm;
