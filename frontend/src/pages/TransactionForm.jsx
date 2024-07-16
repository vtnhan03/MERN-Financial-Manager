import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  useToast,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { createTransaction } from "../lib/api";

const formatAmount = (value) => {
  const numericValue = value.replace(/[^0-9]/g, "");
  return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

const AddTransactionModal = ({ isOpen, onClose, goalId }) => {
  const [amount, setAmount] = useState("");
  const [transactionDate, setTransactionDate] = useState("");
  const [type, setType] = useState("deposit");
  const toast = useToast();

  const { mutate: addTransaction, isLoading } = useMutation({
    mutationFn: createTransaction,
    onSuccess: () => {
      toast({
        title: "Transaction added.",
        description: "The transaction has been added successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      onClose();
    },
    onError: () => {
      toast({
        title: "Error.",
        description: "There was an error adding the transaction.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    },
  });

  const handleAddTransaction = (e) => {
    e.preventDefault();
    if (!amount || !transactionDate || !type) {
      alert("Please fill in all fields.");
      return;
    }
    addTransaction({
      amount: parseInt(amount.replace(/\./g, ""), 10),
      transactionDate,
      type,
      goalId,
    });
  };

  const handleAmountChange = (e) => {
    const value = e.target.value;
    const formattedAmount = formatAmount(value);
    setAmount(formattedAmount);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Transaction</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl isRequired>
            <FormLabel>Amount</FormLabel>
            <Input type="text" value={amount} onChange={handleAmountChange} />
            <Text alignSelf="center">VND</Text>
          </FormControl>
          <FormControl isRequired mt={4}>
            <FormLabel>Transaction Date</FormLabel>
            <Input
              type="date"
              value={transactionDate}
              onChange={(e) => setTransactionDate(e.target.value)}
            />
          </FormControl>
          <FormControl isRequired mt={4}>
            <FormLabel>Type</FormLabel>
            <Select value={type} onChange={(e) => setType(e.target.value)}>
              <option value="deposit">Deposit</option>
              <option value="withdrawal">Withdrawal</option>
            </Select>
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
            onClick={handleAddTransaction}
            isLoading={isLoading}
          >
            Add
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddTransactionModal;
