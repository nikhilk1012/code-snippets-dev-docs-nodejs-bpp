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
  return "https://mock.bg.com/beckn/"
}
module.exports = {
  bgURL,
  httpResponse,
  lookupBAP,
};
