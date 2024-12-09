interface Pizza {
  id: number
  name: string
  price: number
  image: string
  description: string
  pizzaType: string
}

interface User {
  id: number
  phoneNumber: string
  fullName: string
}

interface Order {
  id: number
  amount: number
  address: string
  statusId: number
  pizzas: {
    orderPizzaId: number
    pizzaId: number
    sizeId: number
    doughId: number
    toppingIds: number[]
  }[]
}

interface Address {
  city: string
  street: string
  house: string
}
interface Dough {
  id: number
  name: string
}
interface Size {
  id: number
  length: number
  changePricePizza: number
  changePriceTopping: number
}

interface ToppingType {
  id: number
  name: string
  price: number
}
interface Topping {
  id: number
  name: string
  toppingTypeId: number
}

interface PizzaType {
  id: number
  name: string
}

interface Status {
  id: number
  name: 'Заказ принят' | 'Заказ готовится' | 'Заказ приготовлен' | 'Курьер в пути' | 'Заказ выполнен'
}

interface PaymentCard {
  pan: string
  cvv: string
  expireDate: string
}
