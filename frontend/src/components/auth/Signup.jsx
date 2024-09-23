import { Link, useNavigate } from "react-router-dom";
import Navbar from "../shared/Navbar";
import { useState } from "react";
import axios from "axios";
import { setUser } from "../../reduxStore/authSlice"; // Adjusted alias
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const Signup = () => {
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    file: null, // Keeping 'file' field since backend expects it
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onChangeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const onFileChangeHandler = (e) => {
    setInput({
      ...input,
      file: e.target.files?.[0], // Update the 'file' field
    });
  };

  const onSubmitEvenetHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("email", input.email);
    formData.append("password", input.password);
    formData.append("address", input.address);
    if (input.file) {
      formData.append("file", input.file); // Append 'file' since that's expected by backend
    }

    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/users/register",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login"); // Redirect after successful registration
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
      console.log(input);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>
          <form onSubmit={onSubmitEvenetHandler}>
            {/* Profile Picture Upload */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Profile Picture
              </label>
              <div className="flex items-center mt-1">
                <label className="relative flex items-center cursor-pointer">
                  <input
                    type="file"
                    name="file" // Keep 'file' as the name
                    onChange={onFileChangeHandler}
                    className="sr-only"
                    accept="image/*"
                  />
                  <span className="inline-flex items-center justify-center w-full p-2 border border-gray-300 rounded-md bg-gray-50 hover:bg-gray-100 text-gray-700">
                    Choose a file
                  </span>
                </label>
              </div>
            </div>

            {/* Name Input */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={input.name}
                onChange={onChangeEventHandler}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            {/* Email Input */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={input.email}
                onChange={onChangeEventHandler}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            {/* Password Input */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                name="password"
                onChange={onChangeEventHandler}
                value={input.password}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            {/* Address Input */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Address
              </label>
              <input
                type="text"
                name="address"
                value={input.address}
                onChange={onChangeEventHandler}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-red-500 text-white p-2 rounded-md hover:bg-red-600"
            >
              Register
            </button>
          </form>

          {/* Link to Login */}
          <div className="flex justify-center mt-3">
            <Link to="/login">
              <p className="font-medium cursor-pointer text-red-700 hover:text-red-600">
                LOG IN
              </p>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
