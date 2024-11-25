import { Button } from '@/shared/components'
import { Card, CardContent } from '@/shared/components/ui/card'

export const CustomPizzaCard = ({ ...props }) => (
  <Card className="h-fill relative z-0 m-0 mx-auto mb-6 w-44 bg-primary-color shadow-md" {...props}>
    <CardContent className="flex flex-col items-center justify-center overflow-hidden rounded-lg p-0">
      <img src="/customPizza.png" />
      <div className="items-around flex h-max flex-col justify-center gap-2 p-3">
        <h3 className="text-size text-center text-sm font-semibold text-white">Create Your Own Pizza</h3>
        <p className="text-center text-xs text-white">
          Choose From Our Options Of Designa And Make Your Own Pizza.
        </p>
      </div>
      <Button
        variant="default"
        className="absolute -bottom-4 rounded-full bg-white px-7 py-1 text-black hover:bg-slate-100"
      >
        Create Now
      </Button>
    </CardContent>
  </Card>
)
