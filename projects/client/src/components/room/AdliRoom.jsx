import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
} from "@chakra-ui/react"

const AdliRoom = () => {
  return (
    <>
      <Flex zIndex="0" minH="100vh" align="center" justify="center">
        <Stack
          spacing="4"
          w="full"
          maxW="md"
          rounded="xl"
          boxShadow="lg"
          bg="white"
          p="6"
          my="12"
        >
          <Heading lineHeight="1.1" fontSize={{ base: "2xl", md: "3xl" }}>
            Add New Room :
          </Heading>
          <FormControl isRequired>
            <FormLabel>Input Room</FormLabel>
            <Input placeholder="type here" type="email" />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Input Room</FormLabel>
            <Input placeholder="type here" />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Input Room</FormLabel>
            <Input placeholder="type here" />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Input Room</FormLabel>
            <Input placeholder="type here" />
          </FormControl>
          <Stack spacing="6">
            <Button bg="blue.400" color="white" _hover={{ bg: "blue.500" }}>
              Submit
            </Button>
          </Stack>
        </Stack>
      </Flex>
    </>
  )
}

export default AdliRoom