import { useState } from "react";
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
import { createGoal } from "../lib/api";
const formatAmount = (value) => {
  const numericValue = value.replace(/[^0-9]/g, "");
  return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

const GoalForm = () => {
  const [name, setName] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const [dueDate, setDueDate] = useState("");

  const toast = useToast();

  const {
    mutate: addGoal,
    isLoading,
    // isError,
  } = useMutation({
    mutationFn: createGoal,
    onSuccess: () => {
      toast({
        title: "Budget created.",
        description: "Your goal has been successfully created.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      setName("");
      setTargetAmount("");
      setDueDate("");
    },
    onError: () => {
      toast({
        title: "Error.",
        description: "There was an error creating your goal.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    },
  });

  const handleDueDateChange = (event) => {
    setDueDate(event.target.value); // Assuming `setDueDate` is the setter from useState for [`dueDate`](command:_github.copilot.openSymbolFromReferences?%5B%7B%22%24mid%22%3A1%2C%22fsPath%22%3A%22e%3A%5C%5Ctest2%5C%5Ctesttt%5C%5Cfrontend%5C%5Csrc%5C%5Cpages%5C%5CGoalForm.jsx%22%2C%22_sep%22%3A1%2C%22external%22%3A%22file%3A%2F%2F%2Fe%253A%2Ftest2%2Ftesttt%2Ffrontend%2Fsrc%2Fpages%2FGoalForm.jsx%22%2C%22path%22%3A%22%2FE%3A%2Ftest2%2Ftesttt%2Ffrontend%2Fsrc%2Fpages%2FGoalForm.jsx%22%2C%22scheme%22%3A%22file%22%7D%2C%7B%22line%22%3A23%2C%22character%22%3A2%7D%5D "../../test2/testtt/frontend/src/pages/GoalForm.jsx")
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !targetAmount || !dueDate) {
      alert("Please fill in all fields.");
      return;
    }
    const getFormattedDueDate = () => {
      return new Date(dueDate).toISOString().split("T")[0];
    };
    addGoal({
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
            <Heading>Create Budget</Heading>
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
                <FormLabel>Due date</FormLabel>
                <Input
                  type="date"
                  value={dueDate}
                  onChange={handleDueDateChange} // Ensure this handler is defined and updates `dueDate`
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

export default GoalForm;
