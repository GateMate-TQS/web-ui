import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import image1 from "../assets/login/1.jpeg";
import Cookies from "js-cookie";

function Login() {
  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      window.location.href = "/";
    }
  }, []);

  const [loginError, setLoginError] = useState(null);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://deti-tqs-04.ua.pt/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          login: formData.email,
          password: formData.password,
        }),
      });

      const responseContent = await response.json();
      if (response.status === 200) {
        Cookies.set("token", responseContent.accessToken, { expires: 1 });
        setLoginError(null);
        window.location.href = "/";
      } else {
        setLoginError("Invalid email or password");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div>
        <Navbar />
      </div>

      <div className="flex-1">
        <div className="relative">
          <img className="w-full h-96 object-cover" src={image1} />
          <div className="absolute inset-y-0 left-20 flex flex-col items-start justify-center">
            <div className="text-blue-800 text-8xl font-bold mb-4">Login</div>
          </div>
        </div>
        {loginError && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mx-auto w-1/2 h-10 text-center flex items-center justify-center mt-10"
            role="alert"
          >
            <strong className="font-bold">{loginError}</strong>
          </div>
        )}
        <form
          className="max-w-md mx-auto mt-8 p-4 bg-gray-100 shadow-md"
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">
              Email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="text-center">
            <span>
              Don't have an account?{" "}
              <Link to="/register" className="text-blue-800">
                Register here
              </Link>
            </span>
          </div>
          <div className="w-full bg-teal-500 rounded-sm border border-teal-500 justify-start items-start inline-flex">
            <button
              type="submit"
              className=" px-10 py-5  text-center text-white text-base font-normal w-full"
            >
              Login
            </button>
          </div>
        </form>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default Login;
