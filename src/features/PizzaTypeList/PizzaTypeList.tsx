import { useSearchParams } from 'react-router-dom'

import { userSlice } from '@/entities/user/user.slice'
import { Badge } from '@/shared/components/ui/badge'
import { useAppSelector } from '@/shared/lib'

export const PizzaTypeList = () => {
  const pizzaTypes = useAppSelector(userSlice.selectors.selectAllPizzaType)
  const [searchParams, setSearchParams] = useSearchParams()

  if (!pizzaTypes) return <p>Error</p>

  const handleFilterChange = (key: string, value?: number) => {
    setSearchParams((prevParams) => {
      if (!value) {
        prevParams.delete(key)
      } else {
        prevParams.set(key, String(value))
      }
      return prevParams
    })
  }

  return (
    <div className="scrollbar m-auto flex w-full gap-2 overflow-scroll bg-white px-3 py-2 shadow-sm">
      {pizzaTypes.map((pizzaType) => (
        <Badge
          key={pizzaType.id}
          onClick={() =>
            Number(searchParams.get('pizza-type')) === pizzaType.id
              ? handleFilterChange('pizza-type')
              : handleFilterChange('pizza-type', pizzaType.id)
          }
          className={`cursor-pointer text-nowrap rounded-full px-5 text-sm ${Number(searchParams.get('pizza-type')) === pizzaType.id ? 'bg-secondary-color hover:bg-secondary-color-2' : 'bg-transparent text-black shadow-none hover:bg-slate-200'}`}
        >
          {pizzaType.name}
        </Badge>
      ))}
    </div>
  )
}
