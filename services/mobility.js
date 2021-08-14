const test = require("../test/search.json");
const _ = require("lodash");
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
    description: {
      name: "Mock BPP",
    },
  };
};

const returnQuoteOnSelectedItems = (items) => {
  return {};
};

const saveOrder = () => {
  // Saved
  return {
    order: {
      items: [
        {
          id: "sedan_spot",
          quantity: {
            count: 1,
          },
        },
      ],
      billing: {
        name: "John Doe",
        address: {
          door: "21A",
          name: "ABC Appartments",
          locality: "HSR Layout",
          city: "Bengaluru",
          state: "Karnataka",
          country: "India",
          area_code: "560102",
        },
        email: "user@example.com",
        phone: "+919876543210",
      },
      fulfillment: {
        tracking: true,
        start: {
          location: {
            id: "user-location",
            descriptor: {
              name: "Current user location",
            },
            gps: "12.9349377,77.6055586",
          },
          instructions: {
            name: "pick up instructions",
            short_desc: "Ask doorman to ring 21A",
          },
          time: {
            label: "ETA",
            duration: "P12M",
          },
          contact: {
            phone: "+919999999999",
            email: "test@example.com",
          },
        },
        end: {
          location: {
            gps: "12.914028, 77.638698",
          },
        },
      },
    },
  };
};

const getQuote = () => {
  return {
    price: {
      currency: "INR",
      value: "180",
    },
    breakup: [
      {
        title: "Sedan Spot Booking",
        price: {
          currency: "INR",
          value: "170",
        },
      },
      {
        title: "Service Charge",
        price: {
          currency: "INR",
          value: "10",
        },
      },
    ],
  };
};

const getPaymentDetails = () => {
  return {
    payment: {
      uri: "https://api.bpp.com/pay?amt=$180&mode=upi&vpa=bpp@upi",
      tl_method: "http/get",
      params: {
        amount: "180",
        mode: "upi",
        vpa: "bpp@upi",
      },
      type: "ON-FULFILMENT",
      status: "NOT-PAID",
    },
  };
};
const validateOrderOnDetails = (order) => {
  if (
    (_.keys(order).includes("fulfillment") &&
      _.keys(order).includes("items") &&
      _.keys(order).includes("billing"))
  ) {
    return true;
  }
  return false;
};

const validateOrderOnPayment = (order, paymentTransactionId) => {
  return true;
}

const getOrder = (order) => {
  return {
    order: {
      items: [
        {
          id: "sedan_spot",
          quantity: {
            count: 1,
          },
        },
      ],
      billing: {
        name: "John Doe",
        address: {
          door: "21A",
          name: "ABC Appartments",
          locality: "HSR Layout",
          city: "Bengaluru",
          state: "Karnataka",
          country: "India",
          area_code: "560102",
        },
        email: "user@example.com",
        phone: "+919876543210",
      },
      fulfillment: {
        tracking: true,
        start: {
          location: {
            id: "user-location",
            descriptor: {
              name: "Current user location",
            },
            gps: "12.9349377,77.6055586",
          },
          instructions: {
            name: "pick up instructions",
            short_desc: "Ask doorman to ring 21A",
          },
          time: {
            label: "ETA",
            duration: "P12M",
          },
          contact: {
            phone: "+919999999999",
            email: "test@example.com",
          },
        },
        end: {
          location: {
            gps: "12.914028, 77.638698",
          },
        },
      },
      quote: {
        price: {
          currency: "INR",
          value: "180",
        },
        breakup: [
          {
            title: "Sedan Spot Booking",
            price: {
              currency: "INR",
              value: "170",
            },
          },
          {
            title: "Service Charge",
            price: {
              currency: "INR",
              value: "10",
            },
          },
        ],
      },
      payment: {
        uri: "https://api.bpp.com/pay?amt=$640&mode=upi&vpa=bpp@upi",
        tl_method: "http/get",
        params: {
          amount: "180",
          mode: "upi",
          vpa: "bpp@upi",
        },
        type: "ON-FULFILMENT",
        status: "PAID",
      },
    },
  };
};

const getOrderById = (orderId) => {
  return {
    order: {
      items: [
        {
          id: "sedan_spot",
          quantity: {
            count: 1,
          },
        },
      ],
      billing: {
        name: "John Doe",
        address: {
          door: "21A",
          name: "ABC Appartments",
          locality: "HSR Layout",
          city: "Bengaluru",
          state: "Karnataka",
          country: "India",
          area_code: "560102",
        },
        email: "user@example.com",
        phone: "+919876543210",
      },
      fulfillment: {
        tracking: true,
        start: {
          location: {
            id: "user-location",
            descriptor: {
              name: "Current user location",
            },
            gps: "12.9349377,77.6055586",
          },
          instructions: {
            name: "pick up instructions",
            short_desc: "Ask doorman to ring 21A",
          },
          time: {
            label: "ETA",
            duration: "P12M",
          },
          contact: {
            phone: "+919999999999",
            email: "test@example.com",
          },
        },
        end: {
          location: {
            gps: "12.914028, 77.638698",
          },
        },
      },
      quote: {
        price: {
          currency: "INR",
          value: "180",
        },
        breakup: [
          {
            title: "Sedan Spot Booking",
            price: {
              currency: "INR",
              value: "170",
            },
          },
          {
            title: "Service Charge",
            price: {
              currency: "INR",
              value: "10",
            },
          },
        ],
      },
      payment: {
        uri: "https://api.bpp.com/pay?amt=$640&mode=upi&vpa=bpp@upi",
        tl_method: "http/get",
        params: {
          amount: "180",
          mode: "upi",
          vpa: "bpp@upi",
        },
        type: "ON-FULFILMENT",
        status: "PAID",
      },
    },
  };
};

const cancelOrder = (orderId) => {
  return {
    order: {
      items: [
        {
          id: "sedan_spot",
          quantity: {
            count: 1,
          },
        },
      ],
      billing: {
        name: "John Doe",
        address: {
          door: "21A",
          name: "ABC Appartments",
          locality: "HSR Layout",
          city: "Bengaluru",
          state: "Karnataka",
          country: "India",
          area_code: "560102",
        },
        email: "user@example.com",
        phone: "+919876543210",
      },
      fulfillment: {
        tracking: true,
        start: {
          location: {
            id: "user-location",
            descriptor: {
              name: "Current user location",
            },
            gps: "12.9349377,77.6055586",
          },
          instructions: {
            name: "pick up instructions",
            short_desc: "Ask doorman to ring 21A",
          },
          time: {
            label: "ETA",
            duration: "P12M",
          },
          contact: {
            phone: "+919999999999",
            email: "test@example.com",
          },
        },
        end: {
          location: {
            gps: "12.914028, 77.638698",
          },
        },
      },
      quote: {
        price: {
          currency: "INR",
          value: "180",
        },
        breakup: [
          {
            title: "Sedan Spot Booking",
            price: {
              currency: "INR",
              value: "170",
            },
          },
          {
            title: "Service Charge",
            price: {
              currency: "INR",
              value: "10",
            },
          },
        ],
      },
      payment: {
        uri: "https://api.bpp.com/pay?amt=$640&mode=upi&vpa=bpp@upi",
        tl_method: "http/get",
        params: {
          amount: "180",
          mode: "upi",
          vpa: "bpp@upi",
        },
        type: "ON-FULFILMENT",
        status: "PAID",
      },
    },
  };
};
const rateOrder = () => {
  return {
    id: "trip_1",
    descriptor: "https://feedback.mock_bpp.com/pooja-stores?id=trip_1",
    parent_id: "yellow-cabs",
  };
};
const getSupportDetails = () => {
  return {
    phone: "+919898989898",
    email: "support@example.com",
    uri: "http://support.mock_bpp.com?order_id=trip_1",
  };
};
const getTrackingDetails = (orderId) => {
  return {
    tl_method: "http/get",
    url: "https://track.mock_bpp.com?order_id=trip_1",
    status: "active",
  };
};
module.exports = {
  findMobilityDescription,
  findMobiltyProviders,
  returnQuoteOnSelectedItems,
  getPaymentDetails,
  getQuote,
  saveOrder,
  validateOrderOnPayment,
  validateOrderOnDetails,
  getOrder,
  getOrderById,
  cancelOrder,
  rateOrder,
  getSupportDetails,
  getTrackingDetails
};
