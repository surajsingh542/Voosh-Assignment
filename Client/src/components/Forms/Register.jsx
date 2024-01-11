import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../utils/auth";
import { ToastContainer, toast } from "react-toastify";
import Loaderimage from "../../images/loader.gif";

import { addUser } from "../../Api/UserAPI";

const Register = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const [load, setLoad] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone_number: "",
    password: "",
  });

  const onChangeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (!formData.phone_number || !formData.password || !formData.name) {
      return alert("Please provide all details");
    }
    addUser(formData).then((res) => {
      if (res.status === 200) {
        auth.login(res.data.data);
        setLoad(false);
        navigate("/", { replace: true });
      } else {
        setLoad(false);
        auth.logout();
        toast(res?.response?.data?.message);
      }
    });
  };

  return (
    <>
      <ToastContainer></ToastContainer>

      <section className="py-24 md:py-32 bg-white">
        <div className="container px-4 mx-auto">
          <div className="max-w-sm mx-auto">
            <div className="mb-6 text-center">
              <h3 className="mb-4 text-2xl md:text-3xl font-bold">
                Register for an account
              </h3>
            </div>
            <form onSubmit={onSubmitHandler}>
              <div className="mb-6">
                <label
                  className="block mb-2 text-coolGray-800 font-medium"
                  htmlFor="name"
                >
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  required
                  onChange={onChangeHandler}
                  value={formData.name}
                  className="appearance-none block w-full p-3 leading-5 text-coolGray-900 border border-coolGray-200 rounded-lg shadow-sm placeholder-coolGray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                  type="text"
                  placeholder="Abc"
                />
              </div>
              <div className="mb-6">
                <label
                  className="block mb-2 text-coolGray-800 font-medium"
                  htmlFor="phone_number"
                >
                  Phone Number
                </label>
                <input
                  id="phone_number"
                  name="phone_number"
                  required
                  className="appearance-none block w-full p-3 leading-5 text-coolGray-900 border border-coolGray-200 rounded-lg shadow-sm placeholder-coolGray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                  onChange={onChangeHandler}
                  value={formData.phone_number}
                  placeholder="Phone Number"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block mb-2 text-coolGray-800 font-medium"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  required
                  onChange={onChangeHandler}
                  value={formData.password}
                  className="appearance-none block w-full p-3 leading-5 text-coolGray-900 border border-coolGray-200 rounded-lg shadow-sm placeholder-coolGray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                  type="password"
                  placeholder="********"
                />
              </div>
              <div className="flex flex-wrap items-center justify-between mb-6"></div>
              <button
                className="inline-block py-3 px-7 mb-6 w-full text-base text-green-50 font-medium text-center leading-6 bg-green-500 hover:bg-green-600 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded-md shadow-sm"
                type="submit"
              >
                {load ? (
                  <div className="flex justify-center items-center">
                    <img
                      src={Loaderimage}
                      alt="loader"
                      className="w-5 h-5 mix-blend-color-burn"
                    />
                  </div>
                ) : (
                  <>Register</>
                )}
              </button>
              <p className="text-center">
                <span className="text-xs font-medium">
                  Already have an account?{" "}
                  <Link to="/login" className="text-green-600">
                    Sign in
                  </Link>
                </span>
              </p>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Register;
