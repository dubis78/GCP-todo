import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { CredentialsContext } from "../App";
import Todos from "../components/Todos";

const Dashboard=()=> {
  const [credentails, setCredentials] = useContext(CredentialsContext);
  const logout = () => {
    setCredentials(null);
  };

  return (
    <div>
      {credentails && <button onClick={logout}>Logout</button>}
      <h1>Welcome {credentails && credentails.username}</h1>
      {credentails && <Todos />}
      {!credentails && <Link to="/register">Register</Link>}
      <br />
      {!credentails && <Link to="/login">Login</Link>}
      
    </div>
  );
}

export default Dashboard;