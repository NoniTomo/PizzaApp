import React from 'react'
import { useNavigate } from 'react-router-dom'

import { pizzaSlice } from '@/entities/pizza/pizza.slice'
import { AddPizzaModal } from '@/features/addPizza/AddPizzaModal'
import { usePrice } from '@/features/addPizza/hooks/usePrice'
import { useAppDispatch, useAppSelector } from '@/shared/lib'

export const PizzaPage = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const currentPizza = useAppSelector(pizzaSlice.selectors.selectCurrentPizza) as Pizza
  const currentPizzaUserConfig = useAppSelector(pizzaSlice.selectors.selectCurrentPizzaUserConfig) as {
    sizeId: number
    doughId: number
    toppingIds: number[]
  }
  const price = usePrice({ currentPizza: currentPizza, currentPizzaUserConfig })

  const [openModal, setOpenModal] = React.useState(true)

  const handleCloseModal = (value: boolean) => {
    if (value === false) {
      dispatch({
        type: 'cart/addPizza',
        payload: { pizzaId: currentPizza?.id, price: price.sum, ...currentPizzaUserConfig }
      })
      setOpenModal(value)
      navigate('/')
    }
  }

  return (
    <AddPizzaModal
      type="addPizza"
      open={openModal}
      setClose={(value) => {
        setOpenModal(value)
        navigate('/')
      }}
      setResult={handleCloseModal}
    />
  )
}
