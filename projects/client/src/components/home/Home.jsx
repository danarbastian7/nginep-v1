import React, { useEffect, useState } from "react"
import "./Home.scss"
import Popular from "../popular/Popular"
import RoomCard from "../room/RoomCard"
import ListingDetails from "../../pages/listing/ListingDetails"
import Listing from "../../pages/listing/Listing"
import { axiosInstance } from "../../api"
import { Alert, AlertTitle } from "@chakra-ui/react"
var data = require("../../db/cities_name_data.json")

const Home = () => {
  const [property, setProperty] = useState([])
  const [totalCount, setTotalCount] = useState(0)
  const [page, setPage] = useState(1)
  const [searchInput, setSearchInput] = useState("")
  const [value, setValue] = useState("")

  const fetchProperties = async () => {
    try {
      const response = await axiosInstance.get(`/property?`, {
        params: {
          _limit: 2,
          _page: page,
          _sortDir: "ASC",
          _expand: "properties",
          cities_name: searchInput,
        },
      })
      setTotalCount(response.data.dataCount)

      if (page === 1) {
        setProperty(response.data.data)
      } else setProperty([...property, ...response.data.data])
    } catch (err) {
      console.log(err)
    }
  }
  const renderProperty = () => {
    return property.map((val) => {
      return (
        <Popular
          id={val.id}
          name={val.name}
          city={val.City}
          properties_image={val.PropertyImages}
        />
      )
    })
  }

  console.log(property)
  const setMoreBtnHandler = () => {
    setPage(page + 1)
  }

  useEffect(() => {
    fetchProperties()
  }, [page, searchInput])
  return (
    <div>
      <div>
        <section className="home" id="home">
          <div className="secContainer container">
            <div className="homeText">
              <h1 className="title">Stay Cheapest Full Happiness</h1>
              <p className="subTitle">
                Stay with us and add your new memorable experiences
              </p>
              <button className="btn">
                <a href="#">Explore</a>
              </button>
            </div>
            <div className="homeCard grid">
              {/* <div className="locationDiv">
                <label htmlFor="location">Name</label>
                <br />
                <input type={"text"} placeholder="Let's stay with us" />
              </div> */}

              <div className="distDiv">
                <label htmlFor="distance">Location</label>
                <br />
                <input
                  type={"text"}
                  placeholder="search from location"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                />
              </div>

              <div className="priceDiv">
                <label htmlFor="price">Date</label>
                <br />
                <input type={"date"} placeholder="$150 - $500" />
              </div>
              <button className="btn" onClick={fetchProperties}>
                Search
              </button>
            </div>
          </div>
        </section>
      </div>

      {renderProperty()}

      <div>
        {property.length >= totalCount ? null : (
          <button
            onClick={setMoreBtnHandler}
            style={{
              marginTop: "320px",
              // display: "flex",
              // margin: "auto",
              marginLeft: "130px",
            }}
          >
            See More
          </button>
        )}
      </div>
      <div>
        {!property.length ? (
          <Alert
            status="warning"
            marginTop={"200px"}
            backgroundColor="red.500"
            color={"white"}
          >
            <AlertTitle>No Property on your location filter</AlertTitle>
          </Alert>
        ) : null}
      </div>
    </div>
  )
}

export default Home
