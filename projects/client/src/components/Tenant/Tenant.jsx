import React from "react"
import "./Tenant.scss"
import Sidebar from "../sidebar/Sidebar"
import { useState, useEffect } from "react"
import image from "../../assets/Foto_Danar_Sadan_Bastian_4x6-removebg-preview.jpg"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { Avatar, useToast } from "@chakra-ui/react"
import Listing from "../../pages/listing/Listing"
import ListingRow from "../room/ListingRow"
import { axiosInstance } from "../../api"
const Tenant = () => {
  const [tenant, setTenant] = useState([])
  const params = useParams()

  const fetchTenant = async () => {
    try {
      // const response = await axiosInstance.get(`/tenant/${params.id}`)
      const response = await axiosInstance.get("/property")
      setTenant(response.data.data)
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }
  const renderTenant = () => {
    return tenant.map((val) => {
      return (
        <ListingRow
          id={val.id}
          name={val.cities_name}

          // image_url={val?.PropertyImages[0]?.image_url}
        />
      )
    })
  }

  useEffect(() => {
    fetchTenant()
  }, [])

  return (
    <>
      {/* <Sidebar /> */}

      <Listing />
    </>
  )
}

export default Tenant
