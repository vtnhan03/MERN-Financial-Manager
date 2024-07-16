import {
  Box,
  Text,
  Spinner,
  Flex,
  useColorModeValue,
  HStack,
  VStack,
} from "@chakra-ui/react";
import useCategoryById from "../hooks/useCategoryById";

const ExpenseItem = ({ expense }) => {
  const {
    category,
    isLoading: categoryLoading,
    error: categoryError,
  } = useCategoryById(expense.categoryId);

  const formattedAmount = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    currencyDisplay: "code",
    minimumFractionDigits: 0,
  })
    .format(expense.amount)
    .replace(/,/g, ".")
    .replace(/\sVND$/, " VND");

  const formattedDate = new Date(expense.expenseDate).toLocaleDateString(
    "vi-VN",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  const cardBg = useColorModeValue("white", "gray.800");
  const cardShadow = useColorModeValue("sm", "dark-lg");

  if (categoryLoading)
    return (
      <Flex justify="center" align="center" py={4}>
        <Spinner size="md" />
      </Flex>
    );
  if (categoryError)
    return (
      <Box textAlign="center" color="red.500">
        An error occurred: {categoryError.message}
      </Box>
    );

  return (
    <Box
      p={5}
      shadow={cardShadow}
      borderWidth="1px"
      borderRadius="md"
      bg={cardBg}
      width="100%"
    >
      <VStack align="start" spacing={2}>
        <Text fontSize="xl" fontWeight="bold">
          {expense.name}
        </Text>
        <HStack justify="space-between" width="100%">
          <Text>
            Amount:{" "}
            <Text as="span" color="green.500" fontWeight="bold">
              {formattedAmount}
            </Text>
          </Text>
          <Text fontSize="sm" color="gray.500">
            {formattedDate}
          </Text>
        </HStack>
        <Text>Category: {category.name}</Text>
      </VStack>
    </Box>
  );
};

export default ExpenseItem;
