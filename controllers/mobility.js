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
        .send(util.httpResponse("NACK", `Invalid Locations`));
    }
    // ... Returns the ack immediately and continue the processing after validation
    res.status(200).send(util.httpResponse("ACK"));
    // ... Searching BPP Internal Resources
    const providers = await mobility.findMobiltyProviders(startLoc, endLoc);
    // ... Getting BPP Description
    const description = await mobility.findMobilityDescription();
    let message = {
      catalog: {
        "bpp/providers": providers,
        "bpp/descriptor": description,
      },
    };
    await util.respond(headers, context, message, "/on_search");
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
    const itemIds = _.get(order, "items").map((item) => item.id);
    if (!items.length) {
      return res
        .status(400)
        .send(util.httpResponse("NACK", `No Items Present`));
    }
    // ... Returns the ack immediately and continue the processing after validation
    res.status(200).send(util.httpResponse("ACK"));
    let message = { order: {} };
    const { quote, provider, items } =
      mobility.returnQuoteOnSelectedItems(itemIds);
    message.order = { provider, items, quote };
    await util.respondToBAP(headers, context, message, "/on_select");
  } catch (error) {
    res.status(500).send(util.httpResponse("ACK", error));
  }
};

module.exports = {
  search,
  select,
};
