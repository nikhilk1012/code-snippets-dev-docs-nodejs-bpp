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
const lookupBAP = (headers) => {
  let bppURI = "https://mock_bpp.com/beckn/";
  let bppId = "https://mock_bpp.com/";
  return { bppId, bppURI };
};

const bgURL = () => {
  return "https://mock.bg.com/beckn/";
};

const respondToBAP = (context, headers, message, pathURI) => {
  // ... Using Headers
  const { bppId, bppURI } = await lookupBAP(headers);
  // ... Constructing Request for BAP
  const bapURI = _.get(context, "bap_uri");
  const response = {
    context: {
      ...context,
      bpp_id: bppId,
      bpp_uri: bppURI,
    },
    message,
  };
  let callingURL = bapURI;
  if (headers["Proxy-Authorization"]) {
    callingURL = bgURL(headers);
  }
  await axios({ URL: `${callingURL}/${pathURI}`, method: "POST", data: response });
};
module.exports = {
  bgURL,
  httpResponse,
  lookupBAP,
  respondToBAP
};
