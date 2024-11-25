export const ORDER_LIST = [
  {
    id: 1, // Example value
    amount: 600, // Example value
    address: {
      city: 'Томск', // Placeholder for the city string
      street: 'улица Крылова', // Placeholder for the street string
      house: '17' // Placeholder for the house string
    },
    statusId: 1, // Example value
    pizzas: [
      {
        orderPizzaId: 7, // Example value
        pizzaId: 1, // Example value
        sizeId: 1, // Example value
        doughId: 1, // Example value
        toppingIds: [1, 2, 3] // Example array of topping IDs
      }
      // Add more pizzas as needed
    ]
  },
  {
    id: 2, // Example value
    amount: 1890, // Example value
    address: {
      city: 'Томск', // Placeholder for the city string
      street: 'улица Крылова', // Placeholder for the street string
      house: '17' // Placeholder for the house string
    },
    statusId: 3, // Example value
    pizzas: [
      {
        orderPizzaId: 6, // Example value
        pizzaId: 1, // Example value
        sizeId: 3, // Example value
        doughId: 1 // Example value
      },
      {
        orderPizzaId: 5, // Example value
        pizzaId: 1, // Example value
        sizeId: 2, // Example value
        doughId: 1, // Example value
        toppingIds: [1, 2, 3] // Example array of topping IDs
      }
    ]
  },
  {
    id: 3, // Example value
    amount: 600, // Example value
    address: {
      city: 'Томск', // Placeholder for the city string
      street: 'улица Крылова', // Placeholder for the street string
      house: '17' // Placeholder for the house string
    },
    statusId: 5, // Example value
    pizzas: [
      {
        orderPizzaId: 1, // Example value
        pizzaId: 1, // Example value
        sizeId: 1, // Example value
        doughId: 1, // Example value
        toppingIds: [1, 2, 3] // Example array of topping IDs
      },
      {
        orderPizzaId: 2, // Example value
        pizzaId: 1, // Example value
        sizeId: 1, // Example value
        doughId: 1, // Example value
        toppingIds: [1, 2, 3] // Example array of topping IDs
      },
      {
        orderPizzaId: 3, // Example value
        pizzaId: 2, // Example value
        sizeId: 3, // Example value
        doughId: 2, // Example value
        toppingIds: [1, 2, 3] // Example array of topping IDs
      },
      {
        orderPizzaId: 4, // Example value
        pizzaId: 1, // Example value
        sizeId: 2, // Example value
        doughId: 2 // Example value
      }
      // Add more pizzas as needed
    ]
  }
]
