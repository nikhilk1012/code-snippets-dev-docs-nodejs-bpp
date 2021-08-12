const _ = require("lodash");
const { BPP_CONSTANTS } = require("../config/constants/constants");
const bpp = require("../services/bpp");

/**
 * Performs the search using message intent.
 * @param {object} req Api request object.
 * @param {object} res Api response object.
 * @param {object} next Api next object.
 * @return {object} The search result executed by BPP.
 */
const search = ({ body }, res, next) => {
  try {
    const intent = _.get(body, "message.intent");
    const context = _.get(body, "context");
    const searchMethodNames = _.keys(intent);
    const catalog = {};
    // Iterating over all the keys to get the names of search method
    for (let i = 0; i < searchMethodNames.length; i++) {
      try {
        let searchMethodInput = _.get(intent, searchMethodNames[i]);
        // ... Switching Method Name for Specific Search Criteria
        // TO-DO Error Handling for Search Method Inputs
        switch (searchMethodName) {
          case BPP_CONSTANTS.PROVIDER:
            catalog["bpp/providers"] = await bpp.search.searchProvider(
              searchMethodInput
            );
            break;
          case BPP_CONSTANTS.OFFER:
            catalog["bpp/offers"] = await bpp.search.searchOffers(
              searchMethodInput
            );
            break;
          case BPP_CONSTANTS.PAYMENT:
            catalog["bpp/payments"] = await bpp.search.searchPayments(
              searchMethodInput
            );
            break;
          case BPP_CONSTANTS.CATEGORY:
            catalog["bpp/categories"] = await bpp.search.searchCategories(
              searchMethodInput
            );
            break;
          case BPP_CONSTANTS.FULFILLMENT:
            catalog["bpp/fulfillments"] = await bpp.search.searchFulfillments(
              searchMethodInput
            );
            break;
          default:
            console.log(`Invalid Search Method Name ${searchMethodNames[i]}`);
        }
      } catch (error) {
        console.log(`Error Occured ... Skipping ${searchMethodNames[i]}`);
      }
    }
    const response = {
      message: {
        catalog,
      },
      context,
    };
    // Call On Search Method of BAP - TO-DO
    res.status(200).send(response);
  } catch (error) {
    res
      .status(500)
      .send({ err: error.message ? error.message : JSON.stringify(error) });
  }
};
module.exports = {
  search,
};
