import React, { useState } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { addUser } from "../../config/MyService";
import {AiOutlineCamera} from "react-icons/ai";
// import { AiOutlineGoogle } from "react-icons/ai";
import {CgComment } from "react-icons/cg";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
// import Header from "./Header";
// import SocialButton from "./SocialButton";
// import Footer from "./Footer";

const regForEmail = RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);

export default function Register() {
  let [fname, setFname] = useState("");
  let [lname, setLname] = useState("");
  let [mobile, setMobile] = useState("");
  let [email, setEmail] = useState("");
  let [gender, setGender] = useState("");
  let [password, setPassword] = useState("");
  let [confirmpassword, setConfirmpassword] = useState("");
  let [image, setImage] = useState("");
  let [profilepic, setprofilepic] = useState({profile:''});


  const navigate = useNavigate();

  const url = image ? image: "";

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      // const temp = event.target.files[0]
      setprofilepic({ profile: event.target.files[0] });
      console.log(profilepic)
      setImage(URL.createObjectURL(event.target.files[0]));
    }
  };

  const register = () => {
    let formData = new FormData();
    formData.append('fname', fname)
    formData.append('lname', lname)
    formData.append('mobile', mobile)
    formData.append('email', email)
    formData.append('password', password)
    formData.append('gender',gender)
    formData.append('profile', profilepic.profile)
    
    addUser(formData).then((res) => {
      if (res.data.err) {
        alert(res.data.err);
      } else {
        alert(res.data.msg);
        navigate("/login");
      }
    });
  };

  return (
    <div>
      {/* <Header /> */}
      <br/>
      <Container className="container cardLogin border">
      <h1 className="head">
          <CgComment size="50px" style={{ color: "blue" }} /> Blog
              <span style={{ color: "blue" }}>Spot</span>
            </h1>
            <br />
            <h2>SignUp</h2>
            <br />
           

        <Form encType="multipart/form-data" className="container">
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Enter First Name"
              name="fname"
              id="fname"
              onChange={(event) => {
                setFname(event.target.value);
              }}
              required
            />
            {fname != "" && fname.length < 4 && (
              <span className="text-danger">Enter FirstName correctly</span>
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Enter Last Name"
              name="lname"
              id="lname"
              onChange={(event) => {
                setLname(event.target.value);
              }}
              required
            />
            {lname != "" && lname.length < 4 && (
              <span className="text-danger">Enter lastName correctly</span>
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              type="number"
              placeholder="Enter Mobile Number"
              name="mobile"
              id="mobile"
              onChange={(event) => {
                setMobile(event.target.value);
              }}
              required
            />
            {mobile != "" && mobile.length < 10 && (
              <span className="text-danger">Enter Mobile correctly</span>
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              type="email"
              placeholder="Enter Email"
              name="email"
              id="email"
              onChange={(event) => {
                setEmail(event.target.value);
              }}
              required
            />
            {email != "" && !regForEmail.test(email) && (
              <span className="text-danger">Enter Email correctly</span>
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              type="password"
              placeholder="Enter Password"
              name="password"
              id="password"
              onChange={(event) => {
                setPassword(event.target.value);
              }}
              required
            />
            {password != "" && password.length < 8 && (
              <span className="text-danger">Enter Password with 8 characters</span>
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              type="password"
              placeholder="Enter ConfirmPassword"
              name="confirmpassword"
              id="confirmpassword"
              onChange={(event) => {
                setConfirmpassword(event.target.value);
              }}
              required
            />
            {confirmpassword != "" && confirmpassword != password && (
              <span className="text-danger">Passwords doesn't match</span>
            )}
          </Form.Group>
          <br />
          <div className="mb-3">
            <label className="pr-2">Gender:&nbsp;</label>
            <input
              type="radio"
              value="Male"
              name="gender"
              className="mt-1 pl-2"
              onChange={(event) => {
                setGender(event.target.value);
              }}            />{" "}
            Male &nbsp;
            <input
              type="radio"
              value="Female"
              name="gender"
              className="mt-1 pl-2"
              onChange={(event) => {
                setGender(event.target.value);
              }}            />{" "}
            Female
            
          </div>

          <div style={{ textAlign: "center" }}>
            <img src={image} className="filetypeR" />
            <br />
            <br />

            <label htmlFor="files">
              <AiOutlineCamera size="40px" color="blue" />
            </label>
            <input
              type="file"
              id="files"
              style={{ display: "none" }}
              onChange={onImageChange}
              name="profile"
              className="pl-5 mb-2 filetype"
            />
          </div>

          <Col className="text-center">
            <Button variant="primary" onClick={register}>
              Register
            </Button>
          </Col>
          <br />
          <Col className="text-center">
            <p className=" text-center">
              {" "}
              <Link to="/login">Click here to Login </Link>
            </p>
          </Col>
        </Form>
      </Container>
      {/* <Footer /> */}
    </div>
  );
}