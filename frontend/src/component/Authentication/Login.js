import React, { useState } from "react";
import { login } from "../../config/MyService";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { CgComment } from "react-icons/cg";

export default function Login() {
  const [state, setState] = useState({
    email: "",
    password: "",
  });
  const handler = (event) => {
    const { name, value } = event.target;
    setState({ ...state, [name]: value });
  };

  const navigate = useNavigate();
  const postRegis = (event) => {
    event.preventDefault();
    login(state).then((res) => {
      if (res.data.err == 0) {
        console.log(res.data.msg);
        localStorage.setItem("_token", res.data.token);
        localStorage.setItem("useremail", state.email);
        alert(res.data.msg);
        navigate("/");
      }
      if (res.data.err == 1) {
        alert(res.data.msg);
      }
    });
  };

  return (
    <div>
      <div>
        <div className="row">
          <div className="col-md-6 col-sm-12 ">
            <img
              src="images/login.png"
              style={{ width: "100%", height: "600px" }}
            />
          </div>
          <div className="container col-md-6 col-sm-12 cardLogin border">
            <h1 className="head">
              <CgComment size="50px" style={{ color: "blue" }} /> Blog
              <span style={{ color: "blue" }}>Spot</span>
            </h1>
            <br />
            <h2>SignIn</h2>
            <br />
            <br />

            <form method="post" onSubmit={postRegis}>
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Enter Email ID"
                  className="form-control"
                  onChange={handler}
                />
              </div>
              <br />
              <br />
              <div className="form-group">
                <input
                  type="password"
                  name="password"
                  placeholder="Enter Password"
                  className="form-control"
                  onChange={handler}
                />
              </div>
              <br />
              <div className="text-center">
                {/* <input
                  type="submit"
                  value="Signin"
                  className="btn btn-primary text-center"
                /> */}
                <button onClick={postRegis}>Signiin</button>
              </div>
            </form>
            <br />
            <div className="container text-center">
              <Link to="/Register">
                <span>Click here to Register </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
