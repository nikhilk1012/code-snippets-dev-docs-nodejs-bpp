const test = require("../test/search.json");

const findMobiltyProviders = (startLoc, endLoc) => {
  return {
    providers: [
      {
        id: "yellow-cabs",
        descriptor: {
          name: "Yellow Cabs",
        },
        locations: [
          {
            id: "closest-suv-spot",
            gps: "12.9349377,77.6055586",
          },
          {
            id: "closest-sedan-spot",
            gps: "12.9349377,77.6055586",
          },
          {
            id: "closest-sedan-outstation",
            gps: "12.9349377,77.6055586",
          },
        ],
        categories: [
          {
            id: "spot_booking",
            descriptor: {
              name: "Spot booking",
            },
          },
          {
            id: "outstation",
            descriptor: {
              name: "Outstation",
            },
          },
        ],
        items: [
          {
            id: "sedan_spot",
            descriptor: {
              name: "4 seater Sedan",
              images: ["https://mock_bpp.com/images/sedan.jpg"],
            },
            category_id: "spot_booking",
            location_id: "closest-sedan-spot",
            price: {
              currency: "INR",
              value: "170",
            },
            time: {
              label: "ETA",
              duration: "P14M",
            },
            matched: true,
          },
          {
            id: "suv_spot",
            descriptor: {
              name: "6 seater SUV ",
              images: ["https://mock_bpp.com/images/suv.jpg"],
            },
            category_id: "spot_booking",
            location_id: "closest-suv-spot",
            price: {
              currency: "INR",
              value: "290",
            },
            time: {
              label: "ETA",
              duration: "P12M",
            },
            matched: true,
          },
          {
            id: "sedan_outstation",
            descriptor: {
              name: "4 Seater Sedan",
              images: ["https://mock_bpp.com/images/sedan-out.jpg"],
            },
            category_id: "outstation",
            location_id: "closest-sedan-outstation",
            price: {
              currency: "INR",
              value: "570",
            },
            time: {
              label: "ETA",
              duration: "P17M",
            },
            matched: true,
          },
        ],
      },
      {
        id: "cabs-4-all",
        descriptor: {
          name: "Cabs 4 All",
        },
        locations: [
          {
            id: "closest-sedan",
            gps: "12.9349377,77.6055586",
          },
        ],
        categories: [
          {
            id: "rental",
            descriptor: {
              name: "Rental",
            },
          },
        ],
        items: [
          {
            id: "sedan_rental",
            descriptor: {
              name: "Sedan 5 hours",
              images: ["https://mock_bpp.com/images/sedan_rental.jpg"],
            },
            category_id: "rental",
            location_id: "closest-sedan",
            price: {
              currency: "INR",
              value: "200",
            },
            time: {
              label: "ETA",
              duration: "P12M",
            },
            matched: true,
          },
        ],
      },
    ],
  };
};

const findMobilityDescription = () => {
  return {
    "description": {
      "name": "Mock BPP"
    }
  }
};

const returnQuoteOnSelectedItems = (items) => {
  return  {}
};

module.exports = {
  findMobilityDescription,
  findMobiltyProviders,
  returnQuoteOnSelectedItems,
};
