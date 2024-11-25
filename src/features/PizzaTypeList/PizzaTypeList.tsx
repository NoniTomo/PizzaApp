import { useSearchParams } from 'react-router-dom'

import { Badge } from '@/shared/components/ui/badge'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/shared/components/ui/tooltip'

const pizzaTypes = [
  { name: 'starters', id: 1, description: 'Просто какой-то текст с описанием' },
  { name: 'asian', id: 2, description: 'Просто какой-то текст с описанием' },
  { name: 'classic', id: 3, description: 'Просто какой-то текст с описанием' },
  { name: 'starters', id: 4, description: 'Просто какой-то текст с описанием' },
  { name: 'asian', id: 5, description: 'Просто какой-то текст с описанием' },
  { name: 'classic', id: 6, description: 'Просто какой-то текст с описанием' },
  { name: 'starters', id: 7, description: 'Просто какой-то текст с описанием' },
  { name: 'asian', id: 8, description: 'Просто какой-то текст с описанием' },
  { name: 'classic', id: 9, description: 'Просто какой-то текст с описанием' },
  { name: 'starters', id: 10, description: 'Просто какой-то текст с описанием' },
  { name: 'asian', id: 11, description: 'Просто какой-то текст с описанием' },
  { name: 'classic', id: 12, description: 'Просто какой-то текст с описанием' }
]

export const PizzaTypeList = () => {
  /* const pizzaTypes = useAppSelector(userSlice.selectors.selectPizzaType) */
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
        <TooltipProvider key={pizzaType.id}>
          <Tooltip>
            <TooltipTrigger>
              <Badge
                onClick={() =>
                  Number(searchParams.get('pizza-type')) === pizzaType.id
                    ? handleFilterChange('pizza-type')
                    : handleFilterChange('pizza-type', pizzaType.id)
                }
                className={`text-md cursor-pointer rounded-full px-5 ${Number(searchParams.get('pizza-type')) === pizzaType.id ? 'bg-secondary-color hover:bg-secondary-color-2' : 'bg-transparent text-black shadow-none hover:bg-slate-200'}`}
              >
                {pizzaType.name}
              </Badge>
            </TooltipTrigger>
            <TooltipContent>
              <p>{pizzaType.description}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}
    </div>
  )
}
