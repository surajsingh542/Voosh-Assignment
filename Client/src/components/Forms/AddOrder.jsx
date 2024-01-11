import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Loaderimage from "../../images/loader.gif";
import { useNavigate } from "react-router-dom";
import { addOrder } from "../../Api/OrdersAPI";

export default function AddOrder() {
  const navigate = useNavigate();
  const [load, setLoad] = useState(false);

  const [formData, setFormData] = useState({
    user_id: "",
    sub_total: "",
    phone_number: "",
  });

  //handle form change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //handle form submit
  const handleSubmit = (e) => {
    setLoad(true);
    e.preventDefault();
    addOrder(formData).then((res) => {
      if (res.status === 200) {
        setLoad(false);
        navigate("/", { replace: true });
      } else {
        setLoad(false);
        toast(res?.response?.data?.message);
      }
    });
  };

  return (
    <>
      <ToastContainer></ToastContainer>
      <>
        <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Add Order
            </h2>
          </div>

          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    User Id
                  </label>
                  <div className="mt-1">
                    <input
                      value={formData.user_id}
                      onChange={handleChange}
                      name="user_id"
                      required
                      type="text"
                      className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Sub Total
                  </label>
                  <div className="mt-1">
                    <input
                      value={formData.sub_total}
                      onChange={handleChange}
                      name="sub_total"
                      required
                      type="number"
                      className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <input
                    id="phone_number"
                    name="phone_number"
                    required
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    onChange={handleChange}
                    value={formData.phone_number}
                    placeholder="Phone Number"
                  />
                </div>
                <div>
                  <button
                    type="submit"
                    className="flex w-full  justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
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
                      <>Add Order</>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </>
    </>
  );
}
