import axios from "axios";

//401 Unauthorized
//403 Forbidden
//404 Not Found
//500 Internal Server Error

axios.interceptors.request.use(
  (config) => {
    // Do something before request is sent
    document.body.classList.add("loading");
    return config;
  },
  (error) => {
    // Do something with request error
    Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    document.body.classList.remove("loading");
    return response;
  },
  (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    document.body.classList.remove("loading");
    if (axios.isAxiosError(error)) {
      if (error.response) {
        if (error.response.status === 401) {
          window.location.href = "/"; //redirect to root page
        }
      }
    }

    return Promise.reject(error);
  }
);

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};
