import React, { useState, useContext } from "react";
import Axios from "axios";
import { useHistory } from "react-router-dom";
import { CredentialsContext } from "../App";

export const handleErrors = async (response) => {
  if (!response.ok) {
    const { message } = await response.json();
    throw Error(message);
  }
  return response.json();
};

const Login=()=> {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [, setCredentials] = useContext(CredentialsContext);

  const login = async(e) => {
    e.preventDefault();
    try {
      const { data } = await Axios.post(`http://localhost:8080/login`, {
        email,
        password
      });
      if(data.email){        
        setCredentials(data);
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
      <h1>Login</h1>
      {error && <span style={{ color: "red" }}>{error}</span>}
      <form onSubmit={login}>
        <input
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email"
        />
        <br />
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
        />
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;