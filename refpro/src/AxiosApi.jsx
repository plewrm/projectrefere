import axios from "axios";

export const headers = () => {
  const LocalStorageData = JSON.parse(localStorage.getItem("loggedin"));

  if (!localStorage.getItem("loggedin")) {
    return {
      "Content-Type": "application/json",
      Accept: "application/json, text/plain, */*",
     };
  } else {
     return {
      Authorization: "Bearer " + LocalStorageData.token,
      "Content-Type": "application/json",
      Accept: "application/json, text/plain, */*",
     };
  }
};

const instance = axios.create({
  // baseURL: "https://83b6-2401-4900-1c46-b744-451b-c866-6125-d25.in.ngrok.io/",
  // baseURL: "https://sl9612.deta.dev/",
  // baseURL: "http://127.0.0.1:8000/",
  baseURL: "http://localhost:3000/",
  headers: headers("Access-Control-Allow-Origin: *"),  
  params: {}, // do not remove this, its added to add params later in the config
});

instance.interceptors.request.use(
  function (config) {
     return config;
  },
  function (error) {
     return Promise.reject(error);
  }
);
instance.interceptors.response.use(undefined, (err) => {
   
  if (err.response !== undefined) {
    if (err.response.status === 401) {
      localStorage.clear();
       window.location.reload();
    }
  }

 });

export default instance;
 