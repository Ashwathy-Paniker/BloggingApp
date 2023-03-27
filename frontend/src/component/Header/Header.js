import React, { useState, useEffect } from "react";
import {
  Container,
  Navbar,
  Button,
  Nav,
  // Form,
  // FormControl,
  // NavDropdown,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import {FaUserCircle,FaSignOutAlt,
  // FaBloggerB,
  // FaBlog,
  // FaRegComments,
} from "react-icons/fa";
import { CgComment } from "react-icons/cg";
import { Navigate, useNavigate } from "react-router-dom";
// import { RiLogoutCircleRLine, RiShieldUserFill } from "react-icons/ri";
// import { MdOpenInBrowser } from "react-icons/md";
// import {GoCommentDiscussion } from "react-icons/go";
// import { BiLogIn, BiLogInCircle} from "react-icons/bi";

export default function Header() {
  const navigate = useNavigate();
  const [len, setLen] = useState(0);
  const [flag, setflag] = useState(1);
  useEffect(() => {}, []);

  const logout = (e) => {
    e.preventDefault();
    localStorage.clear();
    setflag(0);
    // localStorage.removeItem("user");
    navigate("/login");
  };
  const login = (e) => {
    e.preventDefault();
    localStorage.clear();
    setflag(0);
    // localStorage.removeItem("user");
    navigate("/login");
  };
  return (
    <div>
      <Navbar className="navbg text-white" expand="lg">
        <Container fluid>
          <Navbar.Brand href="#">
            <h1 className="text-white head">
              <Link to="/" style={{ textDecoration: "none" }}>
                <CgComment size="60px" style={{ color: "white" }} /> Blog<span style={{ color: "white" }}>Spot</span>
              </Link>
            </h1>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse
            id="responsive-navbar-nav"
            className="justify-content-end"
          >
            <Nav className="justify-content-end">
              <Navbar.Text className="text-white">
                {/* <Button className="btn btn-light" > */}
                {localStorage.getItem("useremail") ? (
                  <Link to="/myblogs" style={{ textDecoration: "none" }}>
                    <h5 className="text-white">My Blogs</h5>
                  </Link>
                ) : ("")
                }
                {/* </Button> */}
              </Navbar.Text>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Navbar.Text className="text-white">
                {/* <Button className="btn btn-light" > */}
                <Link to="/post" style={{ textDecoration: "none" }}>
                  <h5 className="text-white">Create Post</h5>
                </Link>
                {/* </Button> */}
              </Navbar.Text>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <Button variant="outline-light">
                <Navbar.Text className="text-white">
                  {/* Signed in as: */}
                  <FaUserCircle size="20px" />
                  <h6>{localStorage.getItem("useremail")}</h6>
                </Navbar.Text>
              </Button>
              &nbsp;
              {localStorage.getItem("useremail") ? (
                <button className=" btn topnav-right text-dark">
                  <FaSignOutAlt
                    className="text-primary"
                    size="40px"
                    onClick={logout}
                  />{" "}
                </button>
              ) : (
                <button className=" btn topnav-right text-dark ">
                  <Link to="/login" style={{ textDecoration: "none" }}>
                    <h5 className="text-white">Login</h5>
                  </Link> 
                </button>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <img src="images/dash6.jpg" width="100%" height="300px" /><br/><br/>
    </div>
  );
}
