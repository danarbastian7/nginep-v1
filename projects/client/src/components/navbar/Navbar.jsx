import React from "react"
import { useState } from "react"
import "./Navbar.scss"
import { IoIosHome } from "react-icons/io"
import { HiX, HiMenu } from "react-icons/hi"
import Login from "../../pages/Login"
import { Link, Outlet } from "react-router-dom"
import Popular from "../popular/Popular"
import { useSelector } from "react-redux"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [openOption, setOpenOption] = useState(false)
  const [active, setActive] = useState("navBar")
  const showNav = () => {
    setActive("navBar activeNavbar")
  }
  const removeNav = () => {
    setActive("navBar")
  }
  const authSelector = useSelector((state) => state.auth)

  const [transparent, setTransparent] = useState("header")
  const addBg = () => {
    if (window.scrollY >= 10) {
      setTransparent("header activeHeader")
    } else {
      setTransparent("header")
    }
  }
  window.addEventListener("scroll", addBg)

  return (
    <section className="navBarSection">
      <div className={transparent}>
        <div className="logoDiv">
          <a href="/" className="logo">
            <h1>
              <IoIosHome className="icon" />
              Nginep.com
            </h1>
          </a>
        </div>
        <div
          className={active}
          onClick={() => {
            setOpenOption(!openOption)
          }}
        >
          <ul className="navLists flex">
            <li className="navItem">
              <a href="/" className="navLink">
                Home
              </a>
            </li>
            <li className="navItem">
              {authSelector.role === "tenant" ? (
                <a href={`/tenant/${authSelector.id}`} className="navLink">
                  Tenant Page
                </a>
              ) : (
                <a href={`/user/${authSelector.id}`} className="navLink">
                  User Page
                </a>
              )}
            </li>
            <li className="navItem">
              <a href="/myprofile" className="navLink">
                My Profile
              </a>
            </li>
            <div className="headerBtns flex">
              <button className="btn loginBtn">
                <Link to="/login">
                  <a href="/login">Login/Logout</a>
                </Link>
              </button>
              <button className="btn">
                <a href="/register">Sign Up</a>
              </button>
            </div>
          </ul>

          <div onClick={removeNav} className="closeNavbar">
            <HiX className="icon" />
          </div>
        </div>

        <div
          onClick={showNav}
          className="toggleNavbar"
          style={{ paddingRight: "1rem" }}
        >
          <HiMenu
            className="icon"
            onClick={() => {
              setIsOpen(!isOpen)
            }}
          />
        </div>
      </div>
      <Outlet />
    </section>
  )
}

export default Navbar
