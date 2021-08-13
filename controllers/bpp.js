const _ = require("lodash");
const axios = require("axios");
const bpp = require("../services/bpp");
const util = require("../config/util");

/**
 * Performs the search using message intent.
 * @param {object} req Api request object.
 * @param {object} res Api response object.
 * @return {object} The search result executed by Mobilty Bpp.
 */
const search = async ({ headers, body }, res) => {
  try {
    const intent = _.get(body, "message.intent");
    const context = _.get(body, "context");
    if (!context) {
      return res.status(400).send(util.httpResponse("NACK", "Missing Context"));
    }
    const startLoc = _.get(intent, "fulfillment.start.location.gps");
    const endLoc = _.get(intent, "fulfillment.start.location.gps");
    if (!startLoc || !endLoc) {
      return res
        .status(400)
        .send(
          util.httpResponse(
            "NACK",
            `Invalid Locations. Please check the request again`
          )
        );
    }
    // ... Returns the ack immediately and continue the processing after validation
    res.status(200).send(util.httpResponse("ACK"));
    // ... Searching BPP Internal Resources
    const mobilitySearchCatalog = await bpp.findMobiltyResourcesfromCatalog(startLoc, endLoc);
    // ... Using Headers
    const { bppId, bppURI } = await util.lookupBAP(headers);
    // ... Constructing Request for BAP
    const bapURI = _.get(context, "bap_uri");
    const bapResponseData = {
      context: {
        ...context,
        bpp_id: bppId,
        bpp_uri: bppURI,
      },
      message: {
        catalog: mobilitySearchCatalog,
      },
    };
    let callingURL = bapURI;
    if (headers["Proxy-Authorization"]) {
      callingURL = util.bgURL(headers);
    }
    await axios({ URL: callingURL, method: "POST", data: bapResponseData });
  } catch (error) {
    res.status(500).send(util.httpResponse("ACK", error));
  }
};
module.exports = {
  search,
};
