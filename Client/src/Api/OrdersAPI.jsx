import axios from "axios";

import { API_URL_BASE } from "../utils/apiURL";

export const getUserOrderDetails = async (userId) => {
  try {
    let result = await axios(`${API_URL_BASE}/get-order?user_id=${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      withCredentials: true,
    });
    return result;
  } catch (error) {
    return error;
  }
};

export const addOrder = async (data) => {
  try {
    let result = await axios(`${API_URL_BASE}/add-order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      withCredentials: true,

      data: data,
    });
    return result;
  } catch (error) {
    return error;
  }
};
