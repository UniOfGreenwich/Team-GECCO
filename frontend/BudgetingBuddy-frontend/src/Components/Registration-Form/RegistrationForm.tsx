import { useState } from "react";
import StandardInput from "../Standard-input/standardInput";

function RegistrationForm() {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    console.log(username);
    console.log(email);
    console.log(password);
  };

  return (
    <form onSubmit={handleSubmit}>
      <StandardInput
        type="text"
        label="Username"
        placeholder="Enter your username"
        value={username}
        onChange={setUserName}
      />
      <StandardInput
        type="email"
        label="Email"
        placeholder="Enter your email"
        value={email}
        onChange={setEmail}
      />

      <StandardInput
        type="password"
        label="Password"
        placeholder="Enter your password"
        value={password}
        onChange={setPassword}
      />

      <button type="submit">Register</button>
    </form>
  );
}

export default RegistrationForm;
