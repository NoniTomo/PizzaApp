interface AuthPageInput {
  register: UseFormRegister<IInputs>
  errors: FieldErrors<IInputs>
}

interface Inputs {
  fullName: string
  phoneNumber: string
  password: string
}

interface SignUp {
  phoneNumber: string
  password: string
  fullName: string
}

interface SignIn {
  phoneNumber: string
  password: string
}
