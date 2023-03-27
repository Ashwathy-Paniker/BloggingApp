import React from "react";
import { Button, Container, Table, Form, Row, Col , Modal,} from "react-bootstrap";
import { useState, useEffect, useRef } from "react";
import { getSingleBlog } from "../../config/MyService";
import { useNavigate,useLocation } from "react-router";
import {BsFillPencilFill} from "react-icons/bs";
import Header from "../Header/Header";

export default function Previewblog() {
  
  const [postdata, setPostdata] = useState("");

  const navigate = useNavigate();
  const { state } = useLocation();

  useEffect(() => {
    console.log(state.id);
    getSingleBlog(state.id)
      .then((res) => {
        console.log(res.data);
        setPostdata(res.data.singleblog);

      });
  }, []);
  return (
    <div>
      <Header />
      <div className="container">
        <div className="row">
         
                <div className=" container col-md-6 col-lg-4">
                  <div className="card1">
                    <img
                      src={`/images/${postdata.myImage}`}
                      className="card-img-top"
                      alt=" "
                    />
                    <div className="card-body text-center">
                      <h4
                        className="card-title"
                        style={{ color: "blue" }}
                      >
                        {postdata.title}
                      </h4>
                      <i dangerouslySetInnerHTML={{ __html: postdata.des }}></i>
                      <p className="card-text">{postdata.tags}</p>
                      Author:<p className="card-text">{localStorage.getItem('useremail')}</p>
                    
                    </div>
                  </div>
                </div>
              
          
        </div>
      </div>
    </div>
  );
}
