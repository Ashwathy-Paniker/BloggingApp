import React from "react";
import {
  Button,
  Container,
  Table,
  Form,
  Row,
  Col,
  Modal,
} from "react-bootstrap";
import { useState, useEffect, useRef } from "react";
import { getAllBlog, editBlog } from "../../config/MyService";
import { useNavigate } from "react-router";
import { BsFillPencilFill } from "react-icons/bs";
import Header from "../Header/Header";

import { useDispatch, useSelector } from "react-redux";
import { getProductsByFilter } from "../redux/actions/filterActions";

export default function Allblogs() {
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  let [UserBlog, setUserBlog] = useState([]);
  const { products } = useSelector((state) => state.products);

  const handleSearch = (e) => {
    resetState();
    setText(e.target.value);
    dispatch(getProductsByFilter({ type: "text", query: e.target.value }));
  };
  const resetState = () => {
    setText("");
  };

  useEffect(() => {
    getAllBlog().then((res) => {
      if (res.data.user) {
        console.log(res.data.user);
        let data1 = res.data.user;
        setUserBlog(data1);
        console.log([data1]);
        console.log(UserBlog);
      } else {
        console.log(res.data.err);
      }
    });
  }, []);

  return (
    <div>
      <Header />
      <div className="container">
        <form className="form-inline my-2 my-lg-0">
          <input
            className="form-control mr-sm-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            name="search"
            value={text}
            onChange={handleSearch}
          />
        </form>

        <div className="row">
          {
            text != ""
              ? products.map((val, index) => (
                  <div className=" container col-md-6 col-lg-4">
                    <div className="card1">
                      <img
                        src={`/images/${val.myImage}`}
                        className="card-img-top filetype"
                        alt="No images posted"
                      />
                      <div className="card-body text-center">
                        <h3 className="card-title">
                          {val.title}
                        </h3>
                        <i dangerouslySetInnerHTML={{ __html: val.des }}></i>
                        <p className="card-text">{val.tags}</p>
                        Author:
                        <p>
                          <i className="card-text">{val.user}</i>
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              : // { UserBlog.length !== 0 ? (
                UserBlog.map((val, index) => (
                  <div className=" container col-md-6 col-lg-4">
                    <div className="card1">
                      <img
                        src={`/images/${val.myImage}`}
                        className="card-img-top filetype"
                        alt="No images posted"
                      />
                      <div className="card-body text-center">
                        <h3 className="card-title">
                          {val.title}
                        </h3>
                        <i dangerouslySetInnerHTML={{ __html: val.des }}></i>
                        <p className="card-text">{val.tags}</p>
                        Author:
                        <p>
                          <i className="card-text">{val.user}</i>
                        </p>
                      </div>
                    </div>
                  </div>
                ))
          }
        </div>
      </div>
    </div>
  );
}
