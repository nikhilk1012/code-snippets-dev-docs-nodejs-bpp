const _ = require("lodash");
const mobilityService = require("../services/mobility");
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
    const endLoc = _.get(intent, "fulfillment.end.location.gps");
    if (!startLoc || !endLoc) {
      return res
        .status(400)
        .send(util.httpResponse("NACK", `Invalid Locations`));
    }
    // ... Returns the ack immediately and continue the processing after validation
    res.status(200).send(util.httpResponse("ACK"));
    // ... Searching BPP Internal Resources
    const providers = await mobilityService.findMobiltyProviders(startLoc, endLoc);
    // ... Getting BPP Description
    const description = await mobilityService.findMobilityDescription();
    let message = {
      catalog: {
        "bpp/providers": providers,
        "bpp/descriptor": description,
      },
    };
    await util.respond(headers, context, message, "/mobility/on_search");
  } catch (error) {
    res.status(500).send(util.httpResponse("NACK", error));
  }
};

/**
 * Returns Quote using request message.
 * @param {object} req Api request object.
 * @param {object} res Api response object.
 * @return {object} returns the quotes provided by mobilityService
 */
const select = async ({ headers, body }, res) => {
  try {
    const order = _.get(body, "message.order");
    const context = _.get(body, "context");
    if (!context) {
      return res.status(400).send(util.httpResponse("NACK", "Missing Context"));
    }
    const itemIds = _.get(order, "items").map((item) => item.id);
    if (!itemIds.length) {
      return res
        .status(400)
        .send(util.httpResponse("NACK", `No Items Present`));
    }
    // ... Returns the ack immediately and continue the processing after validation
    res.status(200).send(util.httpResponse("ACK"));
    let message = { order: {} };
    const { quote, provider, items } = mobilityService.returnQuoteOnSelectedItems(itemIds);
    message.order = { provider, items, quote };
    await util.respond(headers, context, message, "/mobility/on_select");
  } catch (error) {
    res.status(500).send(util.httpResponse("NACK", error));
  }
};

/**
 * Adds the Order Details to BPP.
 * @param {object} req Api request object.
 * @param {object} res Api response object.
 * @return {object} returns the order details on each update
 */
const init = async ({ headers, body }, res) => {
  try {
    const order = _.get(body, "message.order");
    const context = _.get(body, "context");
    if (!context) {
      return res.status(400).send(util.httpResponse("NACK", "Missing Context"));
    }
    // ... Returns the ack immediately and continue the processing after validation
    res.status(200).send(util.httpResponse("ACK"));
    // ... Confirm required details are added to the order
    const isvalidated = mobilityService.validateOrderOnDetails(order);
    if (isvalidated) {
      order.quote = mobilityService.getQuote(order);
      order.payments = mobilityService.getPaymentDetails(order.quote);
    }
    await mobilityService.saveOrder(order);
    const message = {
      order,
    };
    await util.respond(headers, context, message, "/mobility/on_init");
  } catch (error) {
    res.status(500).send(util.httpResponse("NACK", error));
  }
};

/**
 * Confirms the Order By BPP
 * @param {object} req Api request object.
 * @param {object} res Api response object.
 * @return {object} returns the order
 */
const confirm = async ({ headers, body }, res) => {
  try {
    const order = _.get(body, "message.order");
    const paymentTransactionId = _.get(body, "paymentTransactionId");
    const context = _.get(body, "context");
    if (!context) {
      return res.status(400).send(util.httpResponse("NACK", "Missing Context"));
    }
    // ... Returns the ack immediately and continue the processing after validation
    res.status(200).send(util.httpResponse("ACK"));
    const isvalidated = mobilityService.validateOrderOnPayment(order, paymentTransactionId);
    if (isvalidated) {
      const message = {
        order,
      };
      await util.respond(headers, context, message, "/mobility/on_confirm");
    } else {
      res.status(500).send(util.httpResponse("NACK", "Invalid Order"));
    }
  } catch (error) {
    res.status(500).send(util.httpResponse("NACK", error));
  }
};

/**
 * Gets the Order Status from BPP
 * @param {object} req Api request object.
 * @param {object} res Api response object.
 * @return {object} returns the order Status
 */
const status = async ({ headers, body }, res) => {
  try {
    const orderId = _.get(body, "message.order_id");
    const context = _.get(body, "context");
    if (!context) {
      return res.status(400).send(util.httpResponse("NACK", "Missing Context"));
    }
    // ... Returns the ack immediately and continue the processing after validation
    res.status(200).send(util.httpResponse("ACK"));
    const order = await mobilityService.getOrderById(orderId);
    const message = {
      order,
    };
    if (message.order) {
      await util.respond(headers, context, message, "/mobility/on_confirm");
    } else {
      res.status(500).send(util.httpResponse("NACK", "Invalid Order"));
    }
  } catch (error) {
    res.status(500).send(util.httpResponse("NACK", error));
  }
};

/**
 * Cancels the Order Status by BPP
 * @param {object} req Api request object.
 * @param {object} res Api response object.
 * @return {object} returns the order Status
 */
const cancel = async ({ headers, body }, res) => {
  try {
    const orderId = _.get(body, "message.order_id");
    const context = _.get(body, "context");
    if (!context) {
      return res.status(400).send(util.httpResponse("NACK", "Missing Context"));
    }
    // ... Returns the ack immediately and continue the processing after validation
    res.status(200).send(util.httpResponse("ACK"));
    const cancelledOrder = await mobilityService.cancelOrder(orderId);
    let message = {
      order: cancelledOrder,
    };
    await util.respond(headers, context, message, "/mobility/on_cancel");
  } catch (error) {
    res.status(500).send(util.httpResponse("NACK", error));
  }
};

/**
 * Updates the Order by BPP
 * @param {object} req Api request object.
 * @param {object} res Api response object.
 * @return {object} returns the order Status
 */
const update = async ({ headers, body }, res) => {
  try {
    const order = _.get(body, "message.order");
    const context = _.get(body, "context");
    if (!context) {
      return res.status(400).send(util.httpResponse("NACK", "Missing Context"));
    }
    // ... Returns the ack immediately and continue the processing after validation
    res.status(200).send(util.httpResponse("ACK"));
    const updatedOrder = await mobilityService.saveOrder(order);
    let message = {
      order: updatedOrder,
    };
    await util.respond(headers, context, message, "/mobility/on_update");
  } catch (error) {
    res.status(500).send(util.httpResponse("NACK", error));
  }
};

/**
 * Tracks the Order by BPP
 * @param {object} req Api request object.
 * @param {object} res Api response object.
 * @return {object} returns the order Status
 */
const track = async ({ headers, body }, res) => {
  try {
    const orderId = _.get(body, "message.order_id");
    const context = _.get(body, "context");
    if (!context) {
      return res.status(400).send(util.httpResponse("NACK", "Missing Context"));
    }
    // ... Returns the ack immediately and continue the processing after validation
    res.status(200).send(util.httpResponse("ACK"));
    const trackingDetails = mobilityService.getTrackingDetails(orderId);
    let message = {
      tracking: trackingDetails,
    };
    await util.respond(headers, context, message, "/mobility/on_track");
  } catch (error) {
    res.status(500).send(util.httpResponse("NACK", error));
  }
};

/**
 * Rate the Order in BPP
 * @param {object} req Api request object.
 * @param {object} res Api response object.
 * @return {object} returns the order Status
 */
const rate = async ({ headers, body }, res) => {
  try {
    const orderId = _.get(body, "message.id");
    const value = _.get(body, "value");
    const context = _.get(body, "context");
    if (!context) {
      return res.status(400).send(util.httpResponse("NACK", "Missing Context"));
    }
    // ... Returns the ack immediately and continue the processing after validation
    res.status(200).send(util.httpResponse("ACK"));
    const feedback = await mobilityService.rateOrder(orderId, value);
    let message = {
      feedback,
    };
    await util.respond(headers, context, message, "/mobility/on_rating");
  } catch (error) {
    res.status(500).send(util.httpResponse("NACK", error));
  }
};

/**
 * Gets Support on the Order from BPP
 * @param {object} req Api request object.
 * @param {object} res Api response object.
 * @return {object} returns the order Status
 */
const support = async ({ headers, body }, res) => {
  try {
    const orderId = _.get(body, "message.ref_id");
    const context = _.get(body, "context");
    if (!context) {
      return res.status(400).send(util.httpResponse("NACK", "Missing Context"));
    }
    // ... Returns the ack immediately and continue the processing after validation
    res.status(200).send(util.httpResponse("ACK"));
    const supportDetails = await mobilityService.getSupportDetails(orderId);
    let message = {
      ...supportDetails,
    };
    await util.respond(headers, context, message, "/mobility/on_support");
  } catch (error) {
    res.status(500).send(util.httpResponse("NACK", error));
  }
};

/**
 * Gets All Cancellation Reason By BPP
 * @param {object} req Api request object.
 * @param {object} res Api response object.
 * @return {object} returns the order Status
 */
const getCancellationReasons = async ({ headers, body }, res) => {
  return [
    {
      id: 1,
      reason: "Delayed Ride",
    },
  ];
};

module.exports = {
  search,
  select,
  init,
  confirm,
  status,
  cancel,
  update,
  rate,
  support,
  track,
  getCancellationReasons,
};
