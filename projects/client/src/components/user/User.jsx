import {
  Box,
  Center,
  Container,
  Grid,
  GridItem,
  HStack,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react"
import React, { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { GrLinkPrevious } from "react-icons/gr"
import { axiosInstance } from "../../api"
import { Carousel as Carousel2, Progress } from "antd"
import moment from "moment"
import { Carousel } from "react-responsive-carousel"
import "react-responsive-carousel/lib/styles/carousel.min.css"

const UserPage = () => {
  const [getUserTransaction, setGetUserTransaction] = useState([])
  const params = useParams()

  const fetchUserTransaction = async () => {
    try {
      const response = await axiosInstance.get(`/transaction/user/${params.id}`)

      setGetUserTransaction(response.data.data)
      console.log(response, "coba2")
    } catch (err) {
      console.log(err)
    }
  }
  console.log(getUserTransaction, "coba")
  useEffect(() => {
    fetchUserTransaction()
  }, [])
  return (
    <Center>
      <Container width={"-moz-max-content"} height="auto" mt={"75px"}>
        <Link to={`/`}>
          <GrLinkPrevious size={"25px"} />
        </Link>
        <Text>Here your order list</Text>
        {getUserTransaction.map((val) => {
          return (
            <Box
              border={"1px solid orange"}
              borderRadius="5px"
              mb={"15px"}
              padding="5px"
            >
              <Grid templateColumns={"repeat(2, 1fr)"}>
                <GridItem>
                  {/* <Carousel
                    autoplay
                    dotPosition="left"
                    easing="linear"
                    effect="fade"
                    dots={false}
                  > */}
                  <Carousel
                    showArrows={true}
                    showThumbs={true}
                    thumbWidth={100}
                    infiniteLoop={true}
                    autoPlay={true}
                    stopOnHover={true}
                  >
                    {val.Property.PropertyImages.map((value) => (
                      <Image
                        src={`${value.image_url}`}
                        rounded={"md"}
                        fit={"cover"}
                        align={"center"}
                        maxW={"100%"}
                        height="420px"
                      />
                    ))}
                  </Carousel>
                </GridItem>
                <GridItem>
                  <Box
                    borderRadius="5px"
                    backgroundColor={"whitesmoke"}
                    border="2px solid white"
                  >
                    <Text>{val.Property.name}</Text>
                    <Text fontSize={"13px"}>
                      {val.Property.address}, {val.Property.City.cities_name}
                    </Text>
                    <Text fontSize={"14px"} fontFamily="monospace">
                      CheckIn:{" "}
                      {moment(val.start_date).utc().format("YYYY-MM-DD")}
                      <br />
                      CheckOut:{" "}
                      {moment(val.end_date).utc().format("YYYY-MM-DD")}
                    </Text>
                    <Text fontSize={"12px"}>
                      Order status: {val.status}
                      <br />
                      {val.status === "waiting for payment" && (
                        <Progress percent={30} />
                      )}
                      {val.status === "need accepted" && (
                        <Progress percent={50} status="active" />
                      )}
                      {val.status === "accepted" && <Progress percent={100} />}
                      {val.status === "cancelled" && (
                        <Progress percent={100} status="exception" />
                      )}
                    </Text>
                    <br />
                    <Text fontSize={"13px"}>
                      Room name: {val.PropertyItem.item_name}
                      <br />
                      Max capacity: {val.PropertyItem.capacity}
                    </Text>

                    <Text fontSize={"13px"}>Room preview: </Text>
                    <Carousel2
                      autoplay
                      effect="fade"
                      dotPosition="left"
                      dots={false}
                      easing="linear"
                    >
                      {val.PropertyItem.Images.map((values) => (
                        <Image
                          src={`http://localhost:8000/public/${values.picture_url}`}
                          rounded={"md"}
                          fit={"cover"}
                          align={"center"}
                          maxW={"100%"}
                        />
                      ))}
                    </Carousel2>
                  </Box>
                </GridItem>
              </Grid>
            </Box>
          )
        })}
      </Container>
    </Center>
  )
}

export default UserPage
