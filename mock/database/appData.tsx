export const APP_DATA = {
  status: [
    {
      id: 1,
      name: 'Заказ принят'
    },
    {
      id: 2,
      name: 'Заказ готовится'
    },
    {
      id: 3,
      name: 'Заказ приготовлен'
    },
    {
      id: 4,
      name: 'Курьер в пути'
    },
    {
      id: 5,
      name: 'Заказ выполнен'
    }
  ],
  pizzaType: [
    {
      id: 1,
      name: 'Хит'
    },
    {
      id: 2,
      name: 'Веган'
    },
    {
      id: 3,
      name: 'Острая'
    },
    {
      id: 4,
      name: 'Новинка'
    },
    {
      id: 5,
      name: 'С мясом'
    }
  ],
  size: [
    {
      id: 1,
      length: '30 см',
      changePricePizza: 0,
      changePriceTopping: 30
    },
    {
      id: 2,
      length: '35 см',
      changePricePizza: 150,
      changePriceTopping: 50
    },
    {
      id: 3,
      length: '40 см',
      changePricePizza: 300,
      changePriceTopping: 70
    }
  ],
  topping: [
    {
      id: 1,
      name: 'Томатный соус',
      toppingTypeId: 1
    },
    {
      id: 2,
      name: 'Чесночный соус',
      toppingTypeId: 1
    },
    {
      id: 3,
      name: 'Томаты',
      toppingTypeId: 2
    },
    {
      id: 4,
      name: 'Перец халапеньо',
      toppingTypeId: 2
    },
    {
      id: 5,
      name: 'Лук',
      toppingTypeId: 2
    },
    {
      id: 6,
      name: 'Пеперони',
      toppingTypeId: 3
    },
    {
      id: 7,
      name: 'Куринная грудка',
      toppingTypeId: 3
    },
    {
      id: 8,
      name: 'Моцарелла',
      toppingTypeId: 4
    },
    {
      id: 9,
      name: 'Сыр чеддер',
      toppingTypeId: 4
    },
    {
      id: 10,
      name: 'Чесночно-чырная корочка',
      toppingTypeId: 5
    }
  ],
  toppingType: [
    {
      id: 1,
      name: 'Соус',
      price: 140
    },
    {
      id: 2,
      name: 'Овощи',
      price: 90
    },
    {
      id: 3,
      name: 'Мясо',
      price: 150
    },
    {
      id: 4,
      name: 'Сыр',
      price: 130
    },
    {
      id: 5,
      name: 'Корочка',
      price: 100
    }
  ],
  dough: [
    {
      id: 1,
      name: 'Тонкое'
    },
    {
      id: 2,
      name: 'Классическое'
    }
  ]
}
