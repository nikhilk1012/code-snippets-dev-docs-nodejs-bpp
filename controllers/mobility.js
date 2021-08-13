const _ = require("lodash");
const mobility = require("../services/mobility");
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
    const catalog = await mobility.findMobiltyResourcesfromCatalog(startLoc, endLoc);
    let message = {
      catalog,
    };
    let pathURI = '/on_search';
    await util.respondToBAP(headers, context, message, pathURI);
  } catch (error) {
    res.status(500).send(util.httpResponse("ACK", error));
  }
};

/**
 * Returns Quote using request message.
 * @param {object} req Api request object.
 * @param {object} res Api response object.
 * @return {object} returns the quotes provided by mobility
 */
const select = ({ headers, body }, res) => {
  try {
    const order = _.get(body, "message.order");
    const context = _.get(body, "context");
    if (!context) {
      return res.status(400).send(util.httpResponse("NACK", "Missing Context"));
    }
    const items = _.get(order, "items");
    if (!items.length) {
      return res
        .status(400)
        .send(util.httpResponse("NACK", `No Items Present`));
    }
    // ... Returns the ack immediately and continue the processing after validation
    res.status(200).send(util.httpResponse("ACK"));
    const order = mobility.returnQuoteOnSelectedItems(items);
    let message = {
      order,
    };
    let pathURI = '/on_select';
    await util.respondToBAP(headers, context, message, pathURI);
  } catch (error) {
    res.status(500).send(util.httpResponse("ACK", error));
  }
};

module.exports = {
  search,
  select,
};
