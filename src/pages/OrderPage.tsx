import React from 'react'
import { useNavigate } from 'react-router-dom'

import { userSlice } from '@/entities/user/user.slice'
import { useAppSelector } from '@/shared/lib'
import { Layout } from '@/widgets'
import { CreateOrderModal } from '@/widgets/ui/createOrder/CreateOrderModal'

export const OrderPage = () => {
  const navigate = useNavigate()
  const isLoading = useAppSelector(userSlice.selectors.selectIsGetUserAuthPending)

  const [openModal, setOpenModal] = React.useState(true)

  const handleCloseModal = (value: boolean) => {
    if (value === false) {
      setOpenModal(value)
      navigate('/orders')
    }
  }

  return (
    <Layout>
      <Layout.Header />
      <Layout.Content>
        <div className="flex flex-col">
          {!isLoading && <CreateOrderModal open={openModal} setClose={handleCloseModal} />}
          {isLoading && <p>loading ...</p>}
        </div>
      </Layout.Content>
      <Layout.Footer />
    </Layout>
  )
}
