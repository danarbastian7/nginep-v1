import axios from "axios"
import logo from "./logo.svg"
import { useEffect, useState } from "react"
import Home from "./components/home/Home"

import { Route, Router, Routes, useLocation } from "react-router-dom"
import Login from "./pages/Login"
import { Link } from "react-router-dom"
import Navbar from "./components/navbar/Navbar"
import SignUpForm from "./components/sign-up-form/sign-up-form.components"
import MyProfile from "./components/my-profile/MyProfile"
import EditProfile from "./components/edit-profile/EditProfile"

import NotFoundPage from "./components/404"

import { useDispatch, useSelector } from "react-redux"
import { axiosInstance } from "./api/index"
import { login } from "./redux/features/authSlice"

import OrderList from "./components/order/OrderList"
import Listing from "./pages/listing/Listing"
import ListingDetails from "./pages/listing/ListingDetails"
import AddRoom from "./components/room/AddRoom"

import UserPage from "./components/user/User"

function App() {
  const authSelector = useSelector((state) => state.auth)
  console.log(authSelector, "test")
  const [message, setMessage] = useState("")
  const location = useLocation()

  const [authCheck, setAuthCheck] = useState(false)
  const dispatch = useDispatch()
  const keepUserLoggedIn = async () => {
    try {
      const auth_token = localStorage.getItem("auth_token")

      if (!auth_token) {
        setAuthCheck(true)
        return
      }

      const response = await axiosInstance.get("/auth/refresh-token", {
        headers: {
          authorization: `Bearer ${auth_token}`,
        },
      })
      console.log(response)

      dispatch(login(response.data.data))
      localStorage.setItem("auth_token", response.data.token)
    } catch (err) {
      console.log(err)
      setAuthCheck(true)
    }
  }
  useEffect(() => {
    keepUserLoggedIn()
  }, [])

  useEffect(() => {
    ;(async () => {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/greetings`
      )
      setMessage(data?.message || "")
    })()
  }, [])

  return (
    <main>
      {/* {
        location.pathname.match("tenant") ? : 
        <Navbar />} */}
      <Navbar />
      {/* {!loaded ? <Loader /> : <ListingDetails />} */}
      <Routes>
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<SignUpForm />} />
        <Route
          path="/myprofile"
          element={authSelector.id === 0 ? <Login /> : <MyProfile />}
        />
        <Route path="/notfound" element={<NotFoundPage />} />

        <Route path="/editprofile" element={<EditProfile />} />
        <Route path="/inputroom" element={<AddRoom />} />

        {/* ========== Tenant Area =========== */}
        {/* <Route
          path="/tenant/:id"
          element={
            authSelector.role === "tenant" ? <Tenant /> : <NotFoundPage />
          }
        /> */}

        {/* <Route path="/property" element={<Property />} /> */}
        <Route path="/orderlist" element={<OrderList />} />

        {/* <Route path="/listing" element={<Listing />} /> */}
        <Route
          path="/tenant/:id"
          element={
            authSelector.role === "tenant" ? <Listing /> : <NotFoundPage />
          }
        />
        <Route
          path="/user/:id"
          element={
            authSelector.role === "user" ? <UserPage /> : <NotFoundPage />
          }
        />

        <Route path="/listing/details/:id" element={<ListingDetails />} />
      </Routes>
      {/* <Footer /> */}
    </main>
  )
}

export default App
