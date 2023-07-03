import axios from "axios";
//const pjson = require("../../package.json");
//const account = pjson.version;

const api = axios.create({
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
});

export default api;
