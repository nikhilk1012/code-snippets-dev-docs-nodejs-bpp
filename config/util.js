const axios = require("axios");

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
  if (headers["Proxy-Authorization"]) {
    uri = bgURL(headers);
  }
  return { uri };
};

const addSignature = (headers) => {
  // TO-DO Add Signature
}

const respond = (headers, context, message, pathURI) => {
  const { uri } = await lookup(headers);
  const response = {
    context,
    message,
  };
  addSignature(headers);
  return axios({ URL: `${uri}/${pathURI}`, method: "POST", data: response });
};

module.exports = {
  bgURL,
  httpResponse,
  lookup,
  respond
};
