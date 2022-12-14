import React from "react"
import styled from "styled-components"
import "./EditProfile.scss"
import { useDispatch, useSelector } from "react-redux"
import { Button, Input, Select, useToast } from "@chakra-ui/react"
import { useFormik } from "formik"
import { useParams, useNavigate } from "react-router-dom"
import { axiosInstance } from "../../api/index"
import { login } from "../../redux/features/authSlice"
import { useState } from "react"

const EditProfile = () => {
  const authSelector = useSelector((state) => state.auth)

  const [edit, setEdit] = useState(false)
  const dispatch = useDispatch()
  const toast = useToast()
  const params = useParams()
  const navigate = useNavigate()
  const [user, setUser] = useState({})

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      gender: "",
      birthdate: "",
      profile_picture: null,
    },
    onSubmit: async ({
      username,
      email,
      gender,
      birthdate,
      profile_picture,
      phone_number,
    }) => {
      try {
        const userData = new FormData()
        if (username && username !== authSelector.username) {
          userData.append("username", username)
        }
        if (email && email !== authSelector.email) {
          userData.append("email", email)
        }
        if (gender && gender !== authSelector.gender) {
          userData.append("gender", gender)
        }
        if (birthdate && birthdate !== authSelector.birthdate) {
          userData.append("birthdate", birthdate)
        }
        if (phone_number && phone_number !== authSelector.phone_number) {
          userData.append("phone_number", phone_number)
        }
        if (profile_picture) {
          userData.append("profile_picture", profile_picture)
        }
        const userResponse = await axiosInstance.patch("/auth/me", userData)

        dispatch(login(userResponse.data.data))
        // setEdit(false)
        toast({ title: "Profile edited", status: "success" })
        navigate("/myprofile")
      } catch (err) {
        console.log(err)
        toast({
          title: "Failed to edit",
          status: "error",
          description: err.response.data.message,
        })
      }
    },
  })
  const formChangeHandler = ({ target }) => {
    const { name, value } = target
    formik.setFieldValue(name, value)
  }

  return (
    <div>
      <div className="profile-container">
        <div className="row wrapper">
          <div className="col-10 col-lg-5">
            <form className="shadow-lg" encType="multipart/form-data">
              <div className="form-group">
                <label for="email_field">Name</label>
                <br />
                <input
                  type={"username"}
                  id="name_field"
                  className="form-control"
                  name="username"
                  onChange={formChangeHandler}
                  defaultValue={authSelector.username}
                  style={{
                    height: "30px",
                    fontSizeAdjust: "initial",
                  }}
                />
              </div>
              <div className="form-group">
                <label for="email_field">Email</label>
                <br />
                <input
                  id="email_field"
                  className="form-control"
                  name="email"
                  placeholder="Email"
                  onChange={formChangeHandler}
                  defaultValue={authSelector.email}
                  style={{
                    width: "230px",
                  }}
                />
              </div>
              <div className="form-group">
                <label for="email_field">Phone Number</label>
                <br />
                <input
                  id="email_field"
                  className="form-control"
                  name="phone_number"
                  placeholder="phone_number"
                  onChange={formChangeHandler}
                  defaultValue={authSelector.phone_number}
                  style={{
                    width: "230px",
                  }}
                />
              </div>
              <div className="form-group">
                <label for="birthdate">Birthdate</label>
                <br />
                <input
                  type="date"
                  id="birthdate"
                  name="birthdate"
                  onChange={formChangeHandler}
                  defaultValue={authSelector.birthdate}
                  style={{
                    height: "30px",
                    fontSizeAdjust: "initial",
                  }}
                />
                {/* <DatePicker
                  onChange={formChangeHandler}
                  name="birthdate"
                  id="birthdate"
                  // className="form-control"
                /> */}
              </div>
              <div className="form-group">
                <label for="gender">Gender</label>
                <br />
                <div>
                  <Select
                    size={"sm"}
                    borderRadius="5px"
                    color={"blue.400"}
                    border="2px"
                    borderColor={"blue.500"}
                    width="150px"
                    onChange={formChangeHandler}
                    defaultValue={authSelector.gender}
                    name="gender"
                  >
                    <option value={"female"}>Female</option>
                    <option value={"male"}>Male</option>
                  </Select>
                </div>
              </div>
              <div className="form-group">
                <label for="avatar_upload"></label>
                <div className="d-flex align-items-center">
                  <div className="avatar">
                    <div className="custom-file">
                      <Input
                        width={"15rem"}
                        border="none"
                        mt={"20px"}
                        type="file"
                        name="profile_picture"
                        id="customFile"
                        accept="image/*"
                        onChange={(event) =>
                          formik.setFieldValue(
                            "profile_picture",
                            event.target.files[0]
                          )
                        }
                      />
                    </div>
                    <img
                      className="rounded-circle"
                      alt="Avatar Preview"
                      name={authSelector.username}
                      src={
                        formik.values.profile_picture
                          ? URL.createObjectURL(formik.values.profile_picture)
                          : authSelector.profile_picture
                      }
                      style={{
                        marginLeft: "50px",
                        marginTop: "20px",
                      }}
                    />
                  </div>
                </div>
              </div>
              {/* <Link to={"/myprofile"}> */}
              {/* {formik.handleSubmit ? ( */}
              <Button
                colorScheme={"green"}
                type="button"
                onClick={formik.handleSubmit}
                ml="50px"
              >
                Update
              </Button>
              {/* // ) : null} */}
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditProfile
