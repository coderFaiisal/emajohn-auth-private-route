import React, { useContext, useState } from "react";
import "./Register.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/UserContext";

const Register = () => {
  const { createUser } = useContext(AuthContext);

  const [errorMessage, setErrorMessage] = useState(null);
  const [success, setSuccess] = useState(false);
  const handleFormSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;
    console.log(email, password, confirmPassword);
    if (password.length < 6) {
      setErrorMessage("Password should be 6 characters");
      return;
    } else if (password !== confirmPassword) {
      setErrorMessage("Your password doesn't match");
      return;
    }
    createUser(email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        form.reset();
        setErrorMessage(null);
        setSuccess(true);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <div>
      <form onSubmit={handleFormSubmit} className="form-container">
        <h1>Register</h1>
        <div className="form-control">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Your Email"
            required
          />
        </div>
        <div className="form-control">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Your Password"
            required
          />
        </div>
        <div className="form-control">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="ConfirmPassword"
            placeholder="Confirm Password"
            required
          />
        </div>
        {success ? <p className="success-message">User Created Successfully</p> : <p className="error-message">{errorMessage}</p>}

        <button className="submit-btn">Register</button>
        <p>
          Already Have an Account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
