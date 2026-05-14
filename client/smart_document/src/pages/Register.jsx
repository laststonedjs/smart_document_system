import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// api
import api from "../services/api";
// components
import Button from "../components/Button";

import toast from "react-hot-toast";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000";

const RegisterPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });

  const [loading, setLoading] =
    useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]:
        e.target.value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (
      formData.password !==
      formData.confirmPassword
    ) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const res = await api.post(
        `${API_URL}/api/auth/register`,
        {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }
      );

      localStorage.setItem(
        "token",
        res.data.token
      );

      toast.success("Register successful!");
      navigate("/dashboard");
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data
          ?.message ||
          "Register failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Create Account</h1>

        <p className="auth-subtitle">
          Start managing your documents
        </p>

        <form
          onSubmit={handleRegister}
          className="auth-form"
        >
          <input
            type="text"
            name="name"
            placeholder="Full name"
            value={formData.name}
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm password"
            value={
              formData.confirmPassword
            }
            onChange={handleChange}
          />

          <Button
            type="submit"
            variant="primary"
            disabled={loading}
            className="auth-button"
          >
            {loading
              ? "Creating account..."
              : "Register"}
          </Button>
        </form>

        <div className="auth-footer">
          Already have an account?{" "}
          <Link to="/login">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;