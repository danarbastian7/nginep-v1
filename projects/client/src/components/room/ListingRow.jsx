import React, { useState } from "react"

import {
  Box,
  Button,
  Center,
  Flex,
  Image,
  Stack,
  Text,
  useColorModeValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react"
import { TfiTrash } from "react-icons/tfi"
import { Link } from "react-router-dom"

const ListingRow = ({ name, image_url, id, properties }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [images, setImages] = useState([])

  const getImages = properties.map((val) => val.image_url)
  console.log(getImages)

  return (
    <Center py={3}>
      <Link to={`/listing/details/${id}`}>
        <Stack
          borderRadius="lg"
          w="355px"
          height="100px"
          direction="row"
          bg={useColorModeValue("white", "gray.900")}
          boxShadow={"base"}
          padding={4}
        >
          <Flex flex={0.5} ml="10px">
            {/* {properties.map((val) => (
              <Image src={val.image_url} h="100%" layout={"fill"} />
            ))} */}

            <Image src={getImages[0]} h="100%" layout={"fill"} />

            {/* <Image
              ml={"50px"}
              rounded={"md"}
              src={
                properties ||
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNK7-n-r_w_qCEIjsnu8VXMBamUkSmLUr9Eg&usqp=CAU"
              }
            /> */}
          </Flex>
          <Stack
            flex={1}
            flexDirection="column"
            justifyContent="center"
            alignItems="start"
          >
            <Text
              fontSize={"md"}
              fontFamily={"body"}
              fontWeight="bold"
              pl="50px"
            >
              {name || "name"}
            </Text>
          </Stack>
        </Stack>
      </Link>
      <Box onClick={onOpen} position="relative" right={"30px"}>
        <TfiTrash />
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent w="350px">
          <ModalHeader>Delete Listing</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Are you sure want to delete this listing?</ModalBody>

          <ModalFooter>
            <Button variant={"solid"} mr={3}>
              Delete
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Center>
  )
}

export default ListingRow
