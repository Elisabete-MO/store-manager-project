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

const idSale = [
  {
    "productId": 'a',
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

const productQuantityById = [
  {
    "productId": 1,
    "quantity": 5
  },
  {
    "productId": 2,
    "quantity": 10
  }
]

const newSaleInsert = {
  "id": 1,
  "itemsSold": [
    {
      "productId": 1,
      "quantity": 5
    },
    {
      "productId": 2,
      "quantity": 10
    }
  ]
}

const itemsUpdated = {
  "id": 1,
  "itemsUpdated": [
    {
      "productId": 1,
      "quantity": 5
    },
  ]
}

const products = [
  {
    id: 1,
    name: 'Martelo de Thor',
  },
  {
    id: 2,
    name: 'Traje de encolhimento',
  },
];

module.exports = {
  sales,
  newSale,
  salesById,
  idSale,
  newSaleInsert,
  productQuantityById,
  products,
  itemsUpdated,
};