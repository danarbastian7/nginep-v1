import React, { useEffect, useState } from "react"
import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  useColorModeValue,
  Image,
  HStack,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  VStack,
  FormControl,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react"
import { BsThreeDotsVertical } from "react-icons/bs"
import { axiosInstance } from "../../api"
import { useParams } from "react-router-dom"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { BiEditAlt } from "react-icons/bi"
import { TfiTrash } from "react-icons/tfi"
import { useFormik } from "formik"

const RoomCard = ({
  item_name,
  price,
  capacity,
  description,
  images,
  picture_url,
  onDelete,
  id,
}) => {
  const params = useParams()
  const toast = useToast()
  const roomId = id
  console.log(roomId)

  // const { isOpen, onOpen, onClose } = useDisclosure()
  const modalDelete = useDisclosure()
  const modalEditInfo = useDisclosure()
  const [openModalEdit, setOpenModalEdit] = useState(false)
  const [closeModalEdit, setCloseModalEdit] = useState(false)

  const cancelRef = React.useRef()
  const initialRef = React.useRef()
  const finalRef = React.useRef()

  const confirmDeleteBtnHandler = () => {
    // onClose()
    modalDelete.onClose()
    onDelete()
  }
  //=======================UPDATE ROOM INFO
  const formik = useFormik({
    initialValues: {
      item_name: item_name,
      description: description,
      capacity: capacity,
      price: price,
    },
    onSubmit: async ({ item_name, description, capacity, price }) => {
      try {
        const response = await axiosInstance.patch(`/room/editroom/${roomId}`, {
          item_name,
          description,
          capacity,
          price,
        })

        toast({
          title: "Success to edit room info",
          status: "success",
        })
        window.location.reload(false)
      } catch (err) {
        console.log(err)
        toast({
          title: "Failed to edit room info",
          status: "error",
        })
      }
    },
  })
  const formChangeHandler = ({ target }) => {
    const { name, value } = target
    formik.setFieldValue(name, value)
  }

  console.log(formik)
  const settings = {
    dots: true,
    lazyLoad: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 2,
  }

  return (
    <Center py={2}>
      <Box
        maxW={"445px"}
        w={"full"}
        h="600px"
        bg={useColorModeValue("white", "gray.900")}
        boxShadow={"2xl"}
        rounded={"md"}
        p={6}
        overflow={"hidden"}
      >
        <Stack>
          <Box
            h={"270px"}
            bg={"gray.100"}
            mt={-6}
            mx={-6}
            mb={20}
            pos={"relative"}
          >
            <Popover>
              <PopoverTrigger>
                <IconButton
                  background={"blue.500"}
                  _hover="none"
                  width={"30px"}
                >
                  <BsThreeDotsVertical color="white" size={"20px"} />
                </IconButton>
              </PopoverTrigger>
              <PopoverContent
                w="fit-content"
                border={"none"}
                _focus={{ boxShadow: "none" }}
              >
                <PopoverArrow />
                <PopoverBody>
                  <VStack>
                    <Button
                      w="194px"
                      variant="ghost"
                      rightIcon={<BiEditAlt />}
                      justifyContent="space-between"
                      fontWeight="normal"
                      fontSize="sm"
                      // onClick={() => setOpenModalEdit(true)}
                      onClick={modalEditInfo.onOpen}
                    >
                      Edit Room Info
                    </Button>

                    <Modal
                      isOpen={modalEditInfo.isOpen}
                      onClose={modalEditInfo.onClose}
                    >
                      <ModalOverlay />
                      <ModalContent>
                        <ModalHeader>Edit your room information</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                          <FormControl isRequired>
                            <FormLabel>Room type</FormLabel>
                            <Input
                              placeholder="type here"
                              type="text"
                              name="item_name"
                              defaultValue={item_name}
                              onChange={formChangeHandler}
                            />
                          </FormControl>
                          <FormControl isRequired>
                            <FormLabel>Description</FormLabel>
                            <Input
                              placeholder="type here"
                              type="text"
                              h={"200px"}
                              textTransform="full-size-kana"
                              name="description"
                              defaultValue={description}
                              onChange={formChangeHandler}
                            />
                          </FormControl>
                          <FormControl isRequired>
                            <FormLabel>Capacity</FormLabel>
                            <Input
                              placeholder="type here"
                              type="number"
                              name="capacity"
                              defaultValue={capacity}
                              onChange={formChangeHandler}
                            />
                          </FormControl>
                          <FormControl isRequired>
                            <FormLabel>Price</FormLabel>
                            <Input
                              placeholder="type here"
                              type="number"
                              name="price"
                              defaultValue={price}
                              onChange={formChangeHandler}
                            />
                          </FormControl>
                        </ModalBody>
                        <ModalFooter>
                          <Button
                            colorScheme={"red"}
                            onClick={modalEditInfo.onClose}
                            // onClose={closeModalEdit}
                            // isOpen={() => setCloseModalEdit(false)}
                          >
                            Close
                          </Button>
                          <Button
                            colorScheme={"blue"}
                            type="submit"
                            onClick={formik.handleSubmit}
                          >
                            Save
                          </Button>
                        </ModalFooter>
                      </ModalContent>
                    </Modal>
                    {/* </form> */}

                    <Button
                      w="194px"
                      variant="ghost"
                      rightIcon={<BiEditAlt />}
                      justifyContent="space-between"
                      fontWeight="normal"
                      fontSize="sm"
                    >
                      Edit Room Images
                    </Button>
                    <Button
                      w="194px"
                      variant="ghost"
                      rightIcon={<TfiTrash />}
                      justifyContent="space-between"
                      fontWeight="normal"
                      colorScheme="red"
                      fontSize="sm"
                      // onClick={onOpen}
                      onClick={modalDelete.onOpen}
                      position="relative"
                    >
                      Delete
                    </Button>

                    <AlertDialog
                      isCentered
                      // isOpen={isOpen}
                      isOpen={modalDelete.isOpen}
                      leastDestructiveRef={cancelRef}
                      // onClose={onClose}
                      onClose={modalDelete.onClose}
                    >
                      <AlertDialogOverlay
                        backgroundColor={"white"}
                        boxSize="-webkit-max-content"
                        justifyItems={"center"}
                        alignSelf="center"
                        borderRadius={"10px"}
                        isCentered
                      >
                        <AlertDialogHeader fontSize={"md"} fontWeight="bold">
                          Delete Room
                        </AlertDialogHeader>
                        <AlertDialogBody>
                          Are you sure to delete this room ?
                        </AlertDialogBody>
                        <AlertDialogFooter>
                          <Button
                            ref={cancelRef}
                            // onClick={onClose}
                            onClick={modalDelete.onClose}
                            colorScheme="gray"
                            color={"black"}
                          >
                            Cancel
                          </Button>
                          <Button
                            colorScheme={"red"}
                            onClick={confirmDeleteBtnHandler}
                          >
                            Delete
                          </Button>
                        </AlertDialogFooter>
                      </AlertDialogOverlay>
                    </AlertDialog>
                  </VStack>
                </PopoverBody>
              </PopoverContent>
            </Popover>
            <Slider {...settings}>
              {images.map((val) => (
                <Image
                  // src={val.picture_url}
                  src={`http://localhost:8000/public/${val.picture_url}`}
                  maxHeight="250px"
                  borderRadius={"15px"}

                  // layout={"fill"}
                />
              ))}
            </Slider>
          </Box>

          <Heading
            color={useColorModeValue("gray.700", "white")}
            fontSize={"2xl"}
            fontFamily={"body"}
          >
            {item_name || "name"}
          </Heading>
          <HStack>
            <Text color={"green.500"} fontWeight={800} fontSize={"sm"}>
              {new Intl.NumberFormat("ja-JP", {
                style: "currency",
                currency: "JPY",
              }).format(price)}
            </Text>
            <Text color={"gray.500"} fontSize={"smaller"}>
              / room / night
            </Text>
          </HStack>

          <Text color={"blackAlpha.500"} fontWeight={800} fontSize={"sm"}>
            {capacity || "capacity"} Guests
          </Text>
          <Text color={"gray.500"}>{description || "description"}</Text>
        </Stack>
      </Box>
    </Center>
  )
}

export default RoomCard
