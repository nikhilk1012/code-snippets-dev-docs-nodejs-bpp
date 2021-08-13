const test = require('../test/search.json')

const findMobiltyResourcesfromGeoLoc = (startLoc, endLoc) => {
  return test.mobilitySearchResponse;
}

const returnQuoteOnSelectedItems = (items) => {
  return test.mobilitySelectResponse;
}

module.exports = {
  findMobiltyResourcesfromGeoLoc,
  returnQuoteOnSelectedItems
}