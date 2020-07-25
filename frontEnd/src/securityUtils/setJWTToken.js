import axios from "axios";

//很关键 为所有请求带上token的头 这样就合理化了
const setJWTToken = (token) => {
  if (token) {
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

export default setJWTToken;
