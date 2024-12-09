// ----------------------------------------------------
// BACKEND TYPES --------------------------------------
// ----------------------------------------------------

interface SizeBackend {
  id: number
  length: number
  change_price_pizza: number
  change_price_topping: number
}

interface ToppingBackend {
  id: number
  name: string
  topping_type_fk: number
}

interface UserBackend {
  full_name: string
  phone_number: string
  id: number
}

interface OrderBackend {
  id: number
  amount: number
  address: string
  status_fk: number
  pizzas: {
    id: number
    pizza_fk: number
    size_fk: number
    dough_fk: number
    topping_ids: { topping_fk: number }[]
  }[]
}

// ----------------------------------------------------
// RESPONSES ------------------------------------------
// ----------------------------------------------------

interface PizzaListResponseDto {
  items: Pizza[]
}

interface OrderListResponseDto {
  items: OrderBackend[]
}

interface UserAuthResponseDto {
  user: UserBackend
  token: string
  status: Status[]
  pizza_type: PizzaType[]
  size: SizeBackend[]
  topping: ToppingBackend[]
  topping_type: ToppingType[]
  dough: Dough[]
}

interface LoginResponseDto {
  user: UserBackend
  token: string
  status: Status[]
  pizza_type: PizzaType[]
  size: SizeBackend[]
  topping: ToppingBackend[]
  topping_type: ToppingType[]
  dough: Dough[]
}

// ----------------------------------------------------
// REQUESTS -------------------------------------------
// ----------------------------------------------------

interface OrderRequestDto {
  address: string
  card: PaymentCard
  amount: number
  pizzas: {
    pizzaId: number
    sizeId: number
    doughId: number
    toppingIds: number[]
  }[]
}

interface RegistrationRequestDto {
  phoneNumber: string
  fullName: string
  password: string
}

interface LoginRequestDto {
  password: string
  phoneNumber: string
}

interface UserUpdateRequestDto {
  phoneNumber?: string
  fullName?: string
  password?: {
    oldPassword: string
    newPassword: string
  }
}
