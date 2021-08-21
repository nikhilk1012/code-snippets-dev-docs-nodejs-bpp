const axios = require("axios");
const _ = require("lodash");

const httpResponse = (status, error) => {
  let res = {
    message: {
      ack: {
        status: `${status}`,
      },
    },
  };
  if (error) {
    error =
      typeof error === "string"
        ? error
        : error.message
        ? error.message
        : JSON.stringify(error);
    res.error = error;
  }
  return res;
};

const bgURL = () => {
  return "https://mock.bg.com/beckn/";
};

const lookup = (headers) => {
  return 'http://localhost:3000'
};


const respond = async (headers, context, message, pathURI) => {
  const uri  = await lookup(headers);
  const response = {
    context,
    message,
  };
  console.log(`${uri}${pathURI}`);
  return axios({ url: `${uri}${pathURI}`, method: "POST", data: response });
};

module.exports = {
  bgURL,
  httpResponse,
  lookup,
  respond
};
