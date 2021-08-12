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
