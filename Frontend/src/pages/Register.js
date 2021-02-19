import React, { useState, useContext } from "react";
import Axios from "axios";
import { useHistory } from "react-router-dom";
import { CredentialsContext } from "../App";
import { handleErrors } from "./Login";

const Register=()=>{
  const [user, setUser] = useState({});
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [, setCredentials] = useContext(CredentialsContext);

  const handleChange = e => {
    const { name, value } = e.target;
    setUser(prevState => ({
        ...prevState,
        [name]: value
    }));
};

  const register = async(e) => {
    e.preventDefault();
    try {
      const { data } = await Axios.post(`http://localhost:8080/register`,user);
      if(data.email){        
        setCredentials({data});
        history.push("/");
      }
      else{}
    }catch (error) {
      setError(error.message);
    }
  };

  const history = useHistory();

  return (
    <div>
      <h1>Register</h1>
      {error && <span style={{ color: "red" }}>{error}</span>}
      <form onSubmit={register}>
      <input
        //  value={user.name}
         type="text"
          onChange={handleChange}
          placeholder="Name"
          name="name"
        />
        <br />
        <input
        // value={user.lastName}
          type="text"
          onChange={handleChange}
          placeholder="Last Name"
          name="lastName"
        />
        <input
        //  value={user.email}
         type="email"
          onChange={handleChange}
          placeholder="Email"
          name="email"
        />
        <br />
        <input
        // value={user.password}
          type="password"
          onChange={handleChange}
          placeholder="Password"
          name="password"
        />
        <br />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;