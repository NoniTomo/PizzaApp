interface PizzaListResponseDto {
  items: Pizza[]
}

interface OrderListResponseDto {
  items: Order[]
}

interface UserAuthResponseDto {
  user: User
  appData: {
    status: Status[]
    pizzaType: PizzaType[]
    size: Size[]
    topping: Topping[]
    toppingType: ToppingType[]
    dough: Dough[]
  }
}

interface LoginResponseDto {
  user: User
}

interface OrderRequestDto {
  address: Address
  card: PaymentCard
  pizzas: {
    pizzaId: number
    sizeId: number
    doughId: number
    toppingIds: number[]
  }[]
}

interface RegistrationRequestDto {
  phone: string
  username: string
  password: string
}

interface LoginRequestDto {
  password: string
  phone: string
}

interface UserUpdateRequestDto {
  phoneNumber?: string
  fullName?: string
  oldPassword?: string
  newPassword?: string
}
