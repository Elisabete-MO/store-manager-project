const invalidValue = 'a';
const newSale = [
  {
    "productId": 1,
    "quantity": 5
  },
  {
    "productId": 2,
    "quantity": 10
  }
];

const sales = [
  {
    "saleId": 1,
    "date": "2023-02-23T23:27:58.000Z",
    "productId": 1,
    "quantity": 5
  },
  {
    "saleId": 1,
    "date": "2023-02-23T23:27:58.000Z",
    "productId": 2,
    "quantity": 10
  },
  {
    "saleId": 2,
    "date": "2023-02-23T23:27:58.000Z",
    "productId": 3,
    "quantity": 15
  }
]

const salesById = [
  {
    "date": "2023-02-23T23:27:58.000Z",
    "productId": 1,
    "quantity": 5
  },
  {
    "date": "2023-02-23T23:27:58.000Z",
    "productId": 2,
    "quantity": 10
  }
]

const salesUpdated = [
  { 
    "saleId": 1,
    "itemsUpdated": [
    {
      "productId": 1,
      "quantity":10
    },
  ]}
]

module.exports = {
  sales,
  invalidValue,
  newSale,
  salesById,
  salesUpdated
};