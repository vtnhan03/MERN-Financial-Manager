// GoalDetails.jsx
import { useParams } from "react-router-dom";
import {
  Box,
  Container,
  Heading,
  VStack,
  Spinner,
  Text,
  Stack,
  Divider,
  Badge,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import useGoalTransaction from "../hooks/useGoalTransaction";
import AddTransactionModal from "../pages/TransactionForm";

const GoalDetails = () => {
  const { goalId } = useParams();
  const { transactions, isLoading, error } = useGoalTransaction(goalId);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      minimumFractionDigits: 0,
    }).format(value);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (isLoading)
    return (
      <Box textAlign="center" py={10}>
        <Spinner size="xl" />
        <Text mt={4}>Loading...</Text>
      </Box>
    );
  if (error)
    return (
      <Box textAlign="center" py={10}>
        An error occurred: {error.message}
      </Box>
    );

  return (
    <Container maxW="container.md" py={10}>
      <Heading as="h2" size="lg" mb={6} textAlign="center">
        Transactions for Goal
      </Heading>
      <Button colorScheme="blue" onClick={onOpen} mb={6}>
        Add Transaction
      </Button>
      <VStack spacing={6}>
        {transactions.length > 0 ? (
          transactions.map((transaction) => (
            <Box
              key={transaction._id}
              p={6}
              shadow="md"
              borderWidth="1px"
              borderRadius="md"
              width="100%"
            >
              <Stack direction="row" justifyContent="space-between">
                <Text fontSize="lg" fontWeight="bold">
                  {formatDate(transaction.transactionDate)}
                </Text>
                <Badge
                  colorScheme={
                    transaction.type === "withdrawal" ? "red" : "green"
                  }
                >
                  {transaction.type}
                </Badge>
              </Stack>
              <Divider my={3} />
              <Text fontSize="lg">
                Amount:{" "}
                <Text
                  as="span"
                  color={
                    transaction.type === "withdrawal" ? "red.500" : "green.500"
                  }
                  fontWeight="bold"
                >
                  {formatCurrency(transaction.amount)}
                </Text>
              </Text>
            </Box>
          ))
        ) : (
          <Text>No transactions found for this goal.</Text>
        )}
      </VStack>
      <AddTransactionModal isOpen={isOpen} onClose={onClose} goalId={goalId} />
    </Container>
  );
};

export default GoalDetails;
