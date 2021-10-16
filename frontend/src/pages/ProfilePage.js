import Button from "@restart/ui/esm/Button";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { GetUserContext } from "../StateMangement/StateProvider";
import dp from "../images/dp.jpg";
import { ToastContainer, toast } from "../../node_modules/react-toastify";
import "../../node_modules/react-toastify/dist/ReactToastify.css";

function ProfilePage() {
  const { userid } = useParams();
  const [username, setusername] = useState("");
  const [{ token, role }, dispatch] = GetUserContext();
  const [profile, setprofile] = useState({});
  const getUserData = async () => {
    const data = await fetch(`http://localhost:3000/user/profile/${userid}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    const jsondata = await data.json();
    const { profiledetails } = jsondata;
    console.log(profiledetails);
    setprofile(profiledetails);
    setusername(profiledetails.username);
  };

  const handleedit = async () => {
    const editz = await fetch(`http://localhost:3000/user/profile/${userid}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({ username }),
    });
    const response = await editz.json();
    console.log(response);
    dispatch({
      type: "LOGIN",
      token,
      role,
      userid,
      name: username,
    });
    setName(username);
    toast(`Username is Updated to ${username}`, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  const [name, setName] = useState(profile.username);
  useEffect(() => {
    getUserData();
  }, [name]);

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
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          margin: "50px",
          height: "auto",
          textTransform: "",
        }}
      >
        <div
          style={{
            justifyContent: "center",
            backgroundColor: "white",
            boxShadow: "0px 2px 10px -4px grey",
            alignItems: "center",
            flexDirection: "column",
            padding: "20px",
            borderRadius: "5px",
            textTransform: "",
          }}
        >
          <h1 style={{ margin: "20px", textAlign: "center" }}>
            <img src={dp} width="80px" />

            <h4>
              <span style={{ fontSize: "0.75em" }}>@</span>
              {profile.username}
            </h4>
          </h1>
          <p>
            <b>User Email:</b> {profile.email}
          </p>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <p>
              <b>Username:</b>
              <input
                style={{
                  backgroundColor: "transparent",
                  width: "150px",
                  border: "none",
                  margin: "5px",
                  height: "23px",
                }}
                type="text"
                value={username}
                onChange={(e) => setusername(e.target.value)}
              />
            </p>

            <Button
              onClick={handleedit}
              style={{
                outline: "none",
                height: "30px",
                lineHeight: "0px",
                backgroundColor: "#f3f2ef",
                color: "black",
                borderRadius: "5px",
                border: "1px solid grey",
              }}
            >
              Edit
            </Button>
          </div>
          <p>
            <b>College: </b>
            {profile.college}
          </p>
          <p>
            <b>Graduate Year: </b>
            {profile.graduated_year}
          </p>
          <p>
            <b>Program: </b>
            {profile.program}
          </p>
          <p>
            <b>Course: </b>
            {profile.course}
          </p>
        </div>
      </div>
    </>
  );
}

export default ProfilePage;
