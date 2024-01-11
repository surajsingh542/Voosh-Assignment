import React, { useEffect, useState } from "react";
import { userLogin } from "../../Api/UserAPI";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../../utils/auth";
import Loaderimage from "../../images/loader.gif";

import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const auth = useAuth();
  const location = useLocation();

  const redirectPath = location.state?.path || "/";

  const [load, setLoad] = useState(false);

  const [formData, setFormData] = useState({
    phone_number: "",
    password: "",
  });

  const onChangeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = (e) => {
    setLoad(true);
    e.preventDefault();
    userLogin(formData).then((res) => {
      if (res.status === 200) {
        auth.login(res.data.data);
        setLoad(false);
        navigate(redirectPath, { replace: true });
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
                Sign in to your account
              </h3>
            </div>
            <form onSubmit={submitHandler}>
              <div className="mb-6">
                <label
                  className="block mb-2 text-coolGray-800 font-medium"
                  htmlFor="phone_number"
                >
                  Phone Number
                </label>
                <input
                  onChange={onChangeHandler}
                  value={formData.phone_number}
                  name="phone_number"
                  id="phone_number"
                  className="appearance-none block w-full p-3 leading-5 text-coolGray-900 border border-coolGray-200 rounded-lg shadow-md placeholder-coolGray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                  placeholder="Phone Number"
                  required
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
                  onChange={onChangeHandler}
                  value={formData.password}
                  name="password"
                  id="password"
                  className="appearance-none mb-6 block w-full p-3 leading-5 text-coolGray-900 border border-coolGray-200 rounded-lg shadow-md placeholder-coolGray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                  type="password"
                  placeholder="************"
                  required
                />
              </div>

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
                  <>Sign In</>
                )}
              </button>
              <p className="text-center">
                <span className="text-xs font-medium">
                  Don’t have an account?{" "}
                  <Link to="/register" className="text-green-600">
                    Sign up
                  </Link>
                </span>
              </p>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
