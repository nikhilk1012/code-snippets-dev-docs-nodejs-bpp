const _ = require("lodash");

const findRetailProviders = (endLoc) => {
  return {
    providers: [
      {
        id: "./local-retail.kirana/ind.blr/naveen-stores@lrdn.bpp.shopx.com.provider",
        descriptor: {
          name: "Pooja Stores",
        },
        categories: [
          {
            id: "./local-retail.kirana/ind.blr/pooja-stores.breads@lrdn.bpp.shopx.com.provider_category",
            descriptor: {
              name: "Breads",
            },
          },
          {
            id: "./local-local-retail.kirana/ind.blr/pooja-stores.dairy@lrdn.bpp.shopx.com.provider_category",
            descriptor: {
              name: "Dairy",
            },
          },
        ],
        matched: true,
      },
      {
        id: "./local-retail.kirana/ind.blr/nilgiris@lrdn.bpp.shopx.com.provider",
        descriptor: {
          name: "Nilgiris",
        },
        categories: [
          {
            id: "./local-retail.kirana/ind.blr/nilgiris.bread-and-dairy@lrdn.bpp.shopx.com.provider_category",
            descriptor: {
              name: "Bread and Dairy",
            },
          },
        ],
        matched: true,
      },
      {
        id: "./local-retail.kirana/ind.blr/natures-basket@lrdn.bpp.shopx.com.provider",
        descriptor: {
          name: "Nature's basket",
        },
        categories: [
          {
            id: "./local-retail.kirana/ind.blr/natures-basket.bread-and-dairy@lrdn.bpp.shopx.com.provider_category",
            descriptor: {
              name: "Bread and Dairy",
            },
          },
        ],
        matched: false,
      },
    ],
  };
};

const findRetailDesc = () => {
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
    _.keys(order).includes("fulfillment") &&
    _.keys(order).includes("items") &&
    _.keys(order).includes("billing")
  ) {
    return true;
  }
  return false;
};

const validateOrderOnPayment = (order, paymentTransactionId) => {
  return true;
};

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
  findRetailDesc,
  findRetailProviders,
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
  getTrackingDetails,
};
