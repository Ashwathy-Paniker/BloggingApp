import React from "react";
import { Button, Container, Form, Row, Col, Modal } from "react-bootstrap";
import { useState, useEffect, useRef } from "react";
import { getBlog, editBlog } from "../../config/MyService";
import { useNavigate } from "react-router";
import { BsFillPencilFill } from "react-icons/bs";
import Header from "../Header/Header";
import { Editor } from "react-draft-wysiwyg";
import { convertToRaw, EditorState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import jwt_decode from "jwt-decode";


// regex = "^(?=.*[a-zA-Z])(?=.*[0-9])[A-Za-z0-9]+$";

export default function Myblogs() {
  let [UserBlog, setUserBlog] = useState([]);
  const [showadd, setShowadd] = useState(false);
  let [title, setTitle] = useState("");
  // let [des, setDes] = useState("");
  let [tags, setTag] = useState("");
  let [user, setUser] = useState("");
  let [Blog_id, setBlog_id] = useState("");
  let editorState = EditorState.createEmpty();
  let [des, setDes] = useState(editorState);

  const navigate = useNavigate();
  const handleClose = () => setShowadd(false);

  const onEditorStateChange = (editorState) => {
    setDes(editorState);
  };

  const edit = (event, val, val1) => {
    event.preventDefault();
    console.log(val);
    console.log(val1);
    console.log("edit  address clicked");
    setBlog_id(val);
    setTitle(val1.title);
    setDes(val1.des);
    setTag(val1.tags);
    setUser(localStorage.getItem("useremail"));
    setShowadd(true);
    console.log(showadd);
  };

  const AddBlog = (e) => {
    e.preventDefault();
    let update = true;
    console.log("Add blog");
    let data = {
      title: title,
      des: des,
      tags: tags,
      user: localStorage.getItem("useremail"),
    };
    console.log(data);
    console.log(Blog_id);
    editBlog(data, Blog_id).then((res) => {
      console.log(res.data);
    });
    setShowadd(false);
    window.location.reload();
  };

  const singleitem = (id) => {
    setShowadd(false);
    navigate("/preview", {
      state: { id: id },
    });
  };
 
  useEffect(() => {
    if (localStorage.getItem('_token') != undefined) {
      let token = localStorage.getItem('_token');
      let decode = jwt_decode(token);
      console.log(decode)
      getBlog(localStorage.getItem("useremail")).then((res) => {
        // if (res.data.user) {
          // console.log(res.data.user);
          let data1 = res.data.user;
          setUserBlog(data1);
          // console.log([data1]);
          // console.log(UserBlog);
        // }
        //  else {
        //   console.log(res.data.err);
        // }
      });
  }
  else {
      navigate("/login")
  }
  }, []);

  return (
    <div>
      <Header />
      <div className="container">
        <div className="row">
          {UserBlog.length !== 0 ? (
            UserBlog.map((val, index) => (
              <div className=" container col-md-6 col-lg-4">
                <div className="card1">
                  <img
                    src={`/images/${val.myImage}`}
                    className="card-img-top filetype"
                    alt="No images posted"
                  />
                  <div className="card-body text-center">
                    <h3 className="card-title">{val.title}</h3>
                    <div dangerouslySetInnerHTML={{ __html: val.des }}></div>
                    <p className="card-text">{val.tags}</p>
                    Author:
                    <p>
                      <i className="card-text">{val.user}</i>
                    </p>
                    <br />
                    <button
                      className="btn btn-primary"
                      onClick={(e) => {
                        edit(e, val._id, val);
                      }}
                    >
                      <BsFillPencilFill /> Edit
                    </button>
                    {showadd ? (
                      <Modal show={showadd} onHide={handleClose}>
                        <Modal.Header closeButton>
                          <Modal.Title>Edit Your Blog</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <Form className="container">
                            <Form.Group>
                              <Form.Label column sm="2">
                                Title
                              </Form.Label>
                              <Col>
                                <Form.Control
                                  type="text"
                                  placeholder="Enter title"
                                  name="title"
                                  value={title}
                                  onChange={(e) => {
                                    setTitle(e.target.value);
                                  }}
                                />
                              </Col>
                            </Form.Group>
                            <br />
                            <Form.Group>
                              <Form.Label>Description</Form.Label>
                              <Col>
                                <Form.Control
                                  type="text"
                                  placeholder="Enter description"
                                  // ref={(val) => (des = val)}
                                  value={des}
                                  name="des"
                                  onChange={(e) => {
                                    setDes(e.target.value);
                                  }}
                                />
                              </Col>
                            </Form.Group>
                            <br />
                            <Form.Group>
                              <Form.Label>Tags</Form.Label>
                              <Col>
                                <Form.Control
                                  type="text"
                                  placeholder="Enter Tags"
                                  value={tags}
                                  name="tags"
                                  onChange={(e) => {
                                    setTag(e.target.value);
                                  }}
                                />
                              </Col>
                            </Form.Group>
                            <br />
                            <div className=" text-center">
                              <button
                                className="btn btn-primary"
                                onClick={AddBlog}
                              >
                                Save
                              </button>
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                              <button
                                className="btn btn-primary"
                                onClick={() => singleitem(Blog_id)}
                              >
                                {" "}
                                Preview{" "}
                              </button>
                            </div>
                            <br />
                          </Form>
                        </Modal.Body>
                      </Modal>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="container">
              <br />
              <h3>No data available</h3>
              <img src="images/nodata2.gif" width="40%" height="300px" />
              <br />
              <br />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
