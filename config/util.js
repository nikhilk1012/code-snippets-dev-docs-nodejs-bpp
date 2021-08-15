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

const lookup = (headers, context) => {
  let uri = _.get(context, "bap_uri")
  let publicKey = ""
  if (headers["Proxy-Authorization"]) {
    uri = bgURL(headers);
  }
  return { uri, publicKey };
};

const addSignature = (headers) => {
  // TO-DO Add Signature
}

const respond = async (headers, context, message, pathURI) => {
  const { uri } = await lookup(headers, context);
  const response = {
    context,
    message,
  };
  addSignature(headers);
  return axios({ url: `${uri}${pathURI}`, method: "POST", data: response });
};

module.exports = {
  bgURL,
  httpResponse,
  lookup,
  respond
};
