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
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { createBudget } from "../lib/api";

const formatAmount = (value) => {
  const numericValue = value.replace(/[^0-9]/g, "");
  return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

const BudgetForm = () => {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const toast = useToast();

  const {
    mutate: addBudget,
    isLoading,
    // isError,
  } = useMutation({
    mutationFn: createBudget,
    onSuccess: () => {
      toast({
        title: "Budget created.",
        description: "Your budget entry has been successfully created.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      // Reset form fields
      setName("");
      setAmount("");
      setDescription("");
    },
    onError: () => {
      toast({
        title: "Error.",
        description: "There was an error creating your budget entry.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !amount || !description) {
      alert("Please fill in all fields.");
      return;
    }
    addBudget({ name, amount: amount.replace(/\./g, ""), description });
  };

  const handleAmountChange = (e) => {
    const value = e.target.value;
    const formattedAmount = formatAmount(value);
    setAmount(formattedAmount);
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
              <FormControl isRequired mt={6}>
                <FormLabel>Description</FormLabel>
                <Textarea
                  placeholder="Enter description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
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

export default BudgetForm;
