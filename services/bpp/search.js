const test = require("../../test/search.json");

const searchProvider = (input) => {
  return test.providers;
};

const searchFulfillments = (input) => {
  return test.fulfillment;
};

const searchPayments = (input) => {
  return test.payments;
};

const searchCategories = (input) => {
  return test.categories;
};

const searchOffers = (input) => {
  return test.offers;
};


module.exports = {
  searchProvider,
  searchFulfillments,
  searchPayments,
  searchCategories,
  searchOffers
};
