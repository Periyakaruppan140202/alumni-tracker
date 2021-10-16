import React, { useEffect, useState } from "react";
import { Router, useHistory, Route } from "react-router";
import CollegeList from "../components/CollegeList";
import { GetUserContext } from "../StateMangement/StateProvider";
import { Container, Table, Form, Button } from "react-bootstrap";
import Spinner from "../components/Spinner";
import Loader from "../components/Loader";
import { ToastContainer, toast } from "react-toastify";
import "../../node_modules/react-toastify/dist/ReactToastify.css";

function AdminDash() {
  const [{ token, role }, dispatch] = GetUserContext();
  const history = useHistory();
  const [isLoading, setisLoading] = useState(false);
  const [allcollege, setallcollege] = useState([]);
  const [listprogram, setlistprogram] = useState("");
  const [listcourses, setlistcourses] = useState("");
  const [collegeName, setcollegeName] = useState("");
  const getallcollege = async () => {
    setisLoading(true);
    const colleges = await fetch("http://localhost:3000/college", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await colleges.json();
    console.log(result);
    setallcollege(result);
    setisLoading(false);
  };

  const findcllg = (cllgId) => {
    const cllg = allcollege.find((clg) => clg.id === cllgId);

    history.push(`/${cllg.id}`);
  };

  const findpost = (cllgId) => {
    const cllg = allcollege.find((clg) => clg.id === cllgId);
    console.log(cllg);
    history.push(`/post/${cllg.id}`);
  };

  // console.log(college);
  useEffect(() => {
    getallcollege();
  }, []);

  const converttoarray = () => {
    const programs = listprogram.split(",");

    const listingcourses = listcourses.split(",");
    return {
      programs,
      listingcourses,
    };
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (!collegeName || !listcourses || !listprogram) {
        throw new Error("Fill all fields");
      }
      const { programs, listingcourses } = converttoarray();
      console.log(programs.length);

      const addcollege = await fetch("http://localhost:3000/college", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          collegeName,
          program: programs,
          courses: listingcourses,
        }),
      });

      const res = await addcollege.json();
      console.log(res);
      if (res.status === 200 || res.status === 201) {
        // alert("college added");
        getallcollege();
        setlistcourses("");
        setlistprogram("");
        setcollegeName("");
      }
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <>
      <div>
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
      </div>
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
        ADMIN DASH
      </h1> */}
        <Container
          style={{
            marginTop: "20px",
            width: "90vw",
            textAlign: "center",
          }}
        >
          <h3 style={{ margin: "20px" }}>LIST OF ALL COLLEGES</h3>
          <Table responsive striped bordered hover>
            <thead>
              <tr
                style={{
                  backgroundColor: "#212529",
                  color: "#FFFFFF",
                }}
              >
                <th>
                  <h5>College Name</h5>
                </th>
                <th>
                  <h5>Verify</h5>
                </th>
              </tr>
            </thead>
            {isLoading && <Loader />}
            <CollegeList
              colleges={allcollege}
              selectcllg={findcllg}
              selectpost={findpost}
            />
          </Table>
        </Container>

        <div
          style={{
            // width: "80%",
            // padding: "10px 7px 5px 7px",
            marginTop: "20px",
            marginBottom: "20px",
            // backgroundColor: "white",
            // color: "#212529",
          }}
        >
          <Form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              border: "1px solid lightgrey",
              padding: "10px 7px 5px 7px",
              borderRadius: "10px",
              boxShadow: "2px 2px lightgrey",
              backgroundColor: "white",
              boxShadow: "0px 2px 10px -4px grey",
              width: "80%",
            }}
            className="form"
          >
            <h3 style={{ textAlign: "center", marginTop: "20px" }}>
              ADD THE COLLEGE DETAILS TO BE LISTED
            </h3>
            <Form.Group className="mb-3" controlId="formBasicCollege">
              <Form.Label className="font-bold">
                <b>College Name:</b>
              </Form.Label>
              <Form.Control
                style={{ marginTop: "10px", padding: "5px 9px" }}
                placeholder="Specify the College name"
                type="text"
                value={collegeName}
                onChange={(e) => {
                  setcollegeName(e.target.value);
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPrograms">
              <Form.Label className="font-bold">
                <b>Programs</b>
              </Form.Label>
              <Form.Control
                type="text"
                value={listprogram}
                style={{ marginTop: "10px", padding: "5px 9px" }}
                onChange={(e) => {
                  setlistprogram(e.target.value);
                }}
                placeholder="Enter the program provided with commas separated between each course"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCourses">
              <Form.Label className="font-bold">
                <b>Courses</b>
              </Form.Label>
              <Form.Control
                type="text"
                value={listcourses}
                style={{ marginTop: "10px", padding: "5px 9px" }}
                onChange={(e) => {
                  setlistcourses(e.target.value);
                }}
                placeholder="Enter the courses provided with commas separated between each course"
              />
            </Form.Group>

            {/* <Button
            type="submit"
            style={{ outline: "none", marginTop: "10px", marginBottom: "40px" }}
          >
            Submit
          </Button> */}
            <div className="d-grid gap-2 login-button">
              <Button
                variant="outline-primary"
                type="submit"
                onClick={() => {
                  toast("New College Added to the List!", {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                  });
                }}
              >
                Submit
              </Button>
            </div>
          </Form>
        </div>
        <br />
      </div>
    </>
  );
}

export default AdminDash;
