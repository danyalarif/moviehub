import { showNotification } from "@mantine/notifications";
import http from "./axiosInstance";

//helper for making a get request to api
export const axiosGet = async (url) => {
  try {
    const response = await http.get(url);
    //only return data if request was successful
    if (response.data.data) return response.data.data;
    showNotification({
      title: "Error",
      message: response.data.message,
      color: "red",
    });
    return null
  } catch (e) {
    console.log(e);
    //message returned by server
    if (e?.response?.data?.message) {
      showNotification({
        title: "Error",
        message: e.response.data.message,
        color: "red",
      });
    } else {
      //in case of unknown error
      throw e;
    }
  }
};

//helper for making a post request to api
export const axiosPost = async (url, data) => {
  try {
    const response = await http.post(url, data);
    if (response.data.data) return response.data.data;
    showNotification({
      title: "Error",
      message: response.data.message,
      color: "red",
    });
    return null
  } catch (e) {
    console.log(e);
    if (e?.response?.data?.message) {
      showNotification({
        title: "Error",
        message: e.response.data.message,
        color: "red",
      });
    } else {
      throw e;
    }
  }
};

//helper for making a put request to api
export const axiosPut = async (url, data) => {
  try {
    const response = await http.put(url, data);
    if (response.data.data) return response.data.data;
    showNotification({
      title: "Error",
      message: response.data.message,
      color: "red",
    });
    return null
  } catch (e) {
    console.log(e);
    if (e?.response?.data?.message) {
      showNotification({
        title: "Error",
        message: e.response.data.message,
        color: "red",
      });
    } else {
      throw e;
    }
  }
};

//helper for making a delete request to api
export const axiosDelete = async (url) => {
  try {
    const response = await http.delete(url);
    //only return data if request was successful
    if (response.data.data) return response.data.data;
    showNotification({
      title: "Error",
      message: response.data.message,
      color: "red",
    });
    return null
  } catch (e) {
    console.log(e);
    //message returned by server
    if (e?.response?.data?.message) {
      showNotification({
        title: "Error",
        message: e.response.data.message,
        color: "red",
      });
    } else {
      //in case of unknown error
      throw e;
    }
  }
};