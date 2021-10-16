import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { GetUserContext } from "../StateMangement/StateProvider";
import { Form, Button, Container } from "react-bootstrap";
import { ToastContainer, toast } from "../../node_modules/react-toastify";
import "../../node_modules/react-toastify/dist/ReactToastify.css";

function Posts() {
  const history = useHistory();
  const [{ token }, dispatch] = GetUserContext();
  const [allcollege, setallcollege] = useState([]);
  const [cllgpost, setcllgpost] = useState("");
  const [title, settitle] = useState("");
  const [collegeId, setCollegeId] = useState("");
  const [description, setdescription] = useState("");

  const getallcollege = async () => {
    const colleges = await fetch("http://localhost:3000/college", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await colleges.json();
    console.log(result);
    setallcollege(result);
  };

  useEffect(() => {
    getallcollege();
  }, []);

  useEffect(() => {
    if (cllgpost) {
      const cllgId = allcollege.find((cllg) => cllg.collegeName === cllgpost);
      // console.log(cllgId.id);
      setCollegeId(cllgId.id);
    }
  }, [cllgpost]);

  const addcollegePost = async (postid) => {
    try {
      const addingpost = await fetch(
        `http://localhost:3000/college/posts/${collegeId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          body: JSON.stringify({ postId: postid }),
        }
      );
      if (addingpost.status === 200 || addingpost.status === 201) {
        console.log(await addingpost.json());
        // alert("post is added");
        setdescription("");
        settitle("");
        setcllgpost("");
        // history.push("/admin");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (!cllgpost || !title || !description) {
        throw new Error("Fill all the fields");
      }
      const sendpost = await fetch("http://localhost:3000/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          eventTitle: title,
          description,
        }),
      });
      const posts = await sendpost.json();
      console.log(posts);

      const { _id } = posts.postdetail;
      addcollegePost(_id);
      toast("Post is created!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div
        style={{
          display: "flex",
          height: "100vh",
          width: "100%",
          // alignItems: "center",
          flexDirection: "column",
        }}
      >
        {/* <h1
        style={{
          textAlign: "center",
          backgroundColor: "#009ffd",
          paddingTop: "20px",
          paddingBottom: "20px",
        }}
      >
        Create Post for the college
      </h1> */}
        <Container className="container-margin">
          <Form
            onSubmit={handleSubmit}
            style={{
              // display: "flex",
              // flexDirection: "column",
              // border: "2px solid grey",
              // padding: "15px 8px 10px 8px",
              // borderRadius: "5px",
              // margin: "5px",
              border: "1px solid lightgrey",
              padding: "10px 7px 5px 7px",
              borderRadius: "10px",
              boxShadow: "2px 2px lightgrey",
              backgroundColor: "white",
              boxShadow: "0px 2px 10px -4px grey",
              marginBottom: "30px",
              marginTop: "30px",
            }}
            className="form"
          >
            <h3 style={{ textAlign: "center", marginTop: "10px" }}>
              Create Post for the College
            </h3>
            <Form.Group className="mb-3" controlId="formBasic">
              <Form.Label>
                <b>College:</b>
              </Form.Label>
              <Form.Select
                aria-label="Default select example"
                style={{ marginTop: "10px", outline: "none" }}
                onChange={(e) => setcllgpost(e.target.value)}
              >
                <option>Select the college for which post is posted</option>
                {allcollege.map((cllg) => (
                  <option value={cllg.collegeName}>{cllg.collegeName}</option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicUsername">
              <Form.Label>
                <b>Title of post:</b>
              </Form.Label>
              <Form.Control
                type="text"
                value={title}
                placeholder="Enter the title of the post"
                style={{ marginTop: "10px", outline: "none" }}
                onChange={(e) => {
                  settitle(e.target.value);
                }}
              />
            </Form.Group>

            {/* <input
          type=""
          value={description}
          style={{ marginTop: "10px",outline:"none",}}
          placeholder="Enter the description of the post"
          onChange={(e) => {
            setdescription(e.target.value);
          }}
        /> */}

            <Form.Group className="mb-3" controlId="formBasicUsername">
              <Form.Label>
                <b>Description of post:</b>
              </Form.Label>
              <Form.Control
                as="textarea"
                value={description}
                style={{ marginTop: "10px", outline: "none", height: "100px" }}
                placeholder="Enter the description of the post"
                onChange={(e) => {
                  setdescription(e.target.value);
                }}
                name="textarea"
              />
            </Form.Group>
            <div className="d-grid gap-2 login-button">
              <Button variant="outline-success" className="m-20 " type="submit">
                Submit
              </Button>
            </div>
          </Form>
        </Container>
      </div>
    </>
  );
}

export default Posts;
