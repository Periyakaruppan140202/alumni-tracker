import React, { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import { useParams } from "react-router";
import { GetUserContext } from "../StateMangement/StateProvider";
import Spinner2 from "../components/Spinner2";
import Loader2 from "../components/Loader2";
import { ToastContainer, toast } from "../../node_modules/react-toastify";
import "../../node_modules/react-toastify/dist/ReactToastify.css";

function AlumniPage() {
  const [{ token }, dispatch] = GetUserContext();
  const [alumni, setalumni] = useState([]);
  const [cllg, setcllg] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const { cllgid } = useParams();
  // const [allcollege, setallcollege] = useState([]);
  // const [flag, setflag] = useState(0);

  const rendercollege = async () => {
    setisLoading(true);
    const colleges = await fetch("http://localhost:3000/college", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await colleges.json();
    console.log(result);
    let college = result.find((clg) => clg.id === cllgid);
    setcllg(college.collegeName);
    console.log(college.alumni);
    setalumni(college.alumni);
    setisLoading(false);
  };

  useEffect(() => {
    rendercollege();
  }, []);

  const handleverify = async (userid) => {
    const verify = await fetch(`http://localhost:3000/admin/verify/${userid}`, {
      method: "PATCH",
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    console.log(await verify.json());
    rendercollege();
    toast("User is Verified!", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const handledelete = async (userid) => {
    const verify = await fetch(`http://localhost:3000/admin/${userid}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    console.log(await verify.json());
    rendercollege();
  };
  return (
    <div>
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
      <div>
        <h1
          style={{
            textAlign: "center",
            // backgroundColor: "#009ffd",
            paddingBottom: "10px",
            paddingTop: "20px",
            minHeight: "100px",
          }}
        >
          {cllg}
        </h1>
        <Container style={{ marginTop: "20px", textAlign: "center" }}>
          <h3>List of Alumni to be verified</h3>
          <Table size="sm" responsive striped bordered hover>
            <thead>
              <tr style={{ backgroundColor: "#212529", color: "#FFFFFF" }}>
                <th>Username</th>
                <th>MailId</th>
                <th>Year</th>
                <th>Program</th>
                <th>Course</th>
                <th>Verify</th>
                <th>delete</th>
              </tr>
            </thead>
            {isLoading && <Loader2 />}
            {alumni.map((user) => (
              <tbody>
                <tr>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.graduated_year}</td>
                  <td>{user.program}</td>
                  <td>{user.course}</td>
                  <td>
                    {user.verified ? (
                      "Verified"
                    ) : (
                      <button
                        style={{
                          background: "transparent",
                          color: "green",
                          outline: "none",
                          border: "none",
                        }}
                        onClick={handleverify.bind(this, user._id)}
                      >
                        Verify
                      </button>
                    )}
                  </td>
                  <td>
                    {user.verified ? (
                      "-"
                    ) : (
                      <button
                        style={{
                          background: "transparent",
                          color: "red",
                          outline: "none",
                          border: "none",
                        }}
                        onClick={handledelete.bind(this, user._id)}
                      >
                        Delete
                      </button>
                    )}
                  </td>
                </tr>
              </tbody>
            ))}
          </Table>
        </Container>
      </div>
      )
      {alumni.length === 0 && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <h4>No Alumni found</h4>
        </div>
      )}
    </div>
  );
}

export default AlumniPage;
