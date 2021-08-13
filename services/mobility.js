const test = require('../test/search.json')

const findMobiltyProviders = (startLoc, endLoc) => {
  return test.mobility.providers;
}

const findMobilityDescription = () => {
  return test.mobility.descriptors
}

const returnQuoteOnSelectedItems = (items) => {
  return test.mobilitySelectResponse;
}

module.exports = {
  findMobilityDescription,
  findMobiltyProviders,
  returnQuoteOnSelectedItems
}