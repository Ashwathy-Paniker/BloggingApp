import React, { useState, useEffect } from "react";
import axios from "axios";
import { BsCloudUploadFill } from "react-icons/bs";
import {
  Container,
  Nav,
  Form,
  Row,
  Col,
  Button,
  FloatingLabel,
} from "react-bootstrap";
import { useNavigate } from "react-router";
import { createBlog,authentication } from "../../config/MyService";
import Header from "../Header/Header";

// import './CreateBlog.css';
import { Editor } from "react-draft-wysiwyg";
import { convertToRaw, EditorState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure();

export default function Addpost() {
  let [info, setInfo] = useState({ title: "", tags: "" });
  let editorState = EditorState.createEmpty();
  let [des, setDes] = useState(editorState);

  // useEffect(() => {
  //   if (localStorage.getItem("_token") != undefined) {
  //     authentication(localStorage.getItem("_token")).then((res) => {
  //       if (res.data.err) {
  //         alert(res.data.msg);
  //         // console.log(res.data.msg)
  //       }
  //     });
  //   } else {
  //     alert("Please Login to proceed");
  //     navigate("/login");
  //   }})


  const onEditorStateChange = (editorState) => {
    setDes(editorState);
  };

  let [image, setImage] = useState("");
  console.log(info);
  console.log(des);

  const handleChange = (event) => {
    setInfo({ ...info, [event.target.name]: event.target.value });
  };
  // const ref = React.createRef();

  const navigate = useNavigate();
  
  const url = image? image : "./images/dash5.jpg";

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setInfo({ ...info, myImage: event.target.files[0] });
      setImage(URL.createObjectURL(event.target.files[0]));
    }
  };

  const addBlog = (e) => {
    e.preventDefault();
    let email = localStorage.getItem("useremail");
    let formData = new FormData();
    formData.append("myImage", info.myImage);
    formData.append("title", info.title);
    formData.append("tags", info.tags);
    formData.append("des", info.des.value);
    formData.append("user", email);
    console.log(formData);
    createBlog(formData).then((res) => {
      if (res.data.err) {
        alert(res.data.err);
      } else {
        alert(res.data.msg);
        navigate("/");
      }
    });
  };
  

  return (
    <>
      {" "}
      <Header />
      <Container className="cardPOST">
        <i><h2 className=" text-center">Publish your passions,your way</h2></i>
        <i><h3 className=" text-center">Create a unique and beatiful blog :)</h3></i><br/>
        {localStorage.getItem("useremail") ?
        <Form encType="multipart/form-data">
          <div style={{ textAlign: "center" }}>
            <img src={url} className="filetype" />
            <br />
            <br />

            <label htmlFor="files">
              <BsCloudUploadFill size="40px" color="blue" /> Upload your file
            </label>
            <input
              type="file"
              id="files"
              style={{ display: "none" }}
              onChange={onImageChange}
              name="myImage"
              className="pl-5 mb-2 filetype"
            />
          </div>

          <Form.Group className="mb-3 mt-3">
            <Form.Label>
              <b>Title: </b>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter title"
              id="title"
              name="title"
              onChange={handleChange}
            />
             {info.title != '' && info.title.length < 4 && <span className="text-danger">Title should be atleast 3 characters is Required *</span>}
          </Form.Group>
          <Form.Group>
            <Editor
              editorState={des}
              toolbarClassName="toolbarClassName"
              wrapperClassName="wrapperClassName"
              editorClassName="editorClassName"
              onEditorStateChange={onEditorStateChange}
              editorStyle={{ border: "2px solid white" }}
            />
            <textarea
              style={{ display: "none" }}
              disabled
              ref={(val) => (info.des = val)}
              value={draftToHtml(convertToRaw(des.getCurrentContent()))}
            />
          </Form.Group>

          <Form.Group className="mb-3 mt-3">
            <Form.Label>
              <b>Tags: </b>
            </Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter tags"
              id="tags"
              name="tags"
              onChange={handleChange}
            />
          </Form.Group><br/>

          <Button variant="primary" className="btn-block" onClick={addBlog}>
            Add Blog
          </Button>
        </Form> : <div><br/><h6>Please LoginFirst to create your blog</h6>
                  <h4></h4>
        </div>}
      </Container>
    </>
  );
}
