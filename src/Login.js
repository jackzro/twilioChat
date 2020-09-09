import React from "react";

function Login({ username, handleLogin, handleUsernameChange }) {
  return (
    <div>
      <form onSubmit={handleLogin}>
        <label>Username</label>
        <input type="text" onChange={handleUsernameChange} value={username} />
        <button type="submit">Log In</button>
      </form>
      <h1>login</h1>
    </div>
  );
}

export default Login;
