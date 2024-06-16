import { Card, CardHeader, CardTitle } from './ui/card'
import { Progress } from './ui/progress'
import { ScrollArea } from './ui/scroll-area'

const CategoriesStats = () => {
	return (
		<div className='flex w-full flex-wrap gap-2 md:flex-nowrap'>
			<CategoriesCard type='income' />
			<CategoriesCard />
		</div>
	)
}

export default CategoriesStats

type Props = {
	type?: 'income' | 'expense'
}

function CategoriesCard({ type }: Props) {
	return (
		<Card className='h-80 w-full col-span-6'>
			<CardHeader>
				<CardTitle className='grid grid-flow-row justify-between gap-2 text-muted-foreground md:grid-flow-col'>
					{type === 'income' ? 'Incomes' : 'Expenses'} by category
				</CardTitle>
			</CardHeader>

			<div className='flex items-center justify-between gap-2'>
				<ScrollArea className='h-60 w-full px-4'>
					<div className='flex w-full flex-col gap-4 p-4'>
						<div className='flex flex-col gap-2'>
							<div className='flex items-center justify-between'>
								<span className='flex items-center text-gray-400'>
									Icon Category
									<span className='ml-2 text-xs text-muted-foreground'>
										50%
									</span>
								</span>

								<span className='text-sm font-bold text-gray-500'>50$</span>
							</div>

							<Progress
								value={50}
								indicator={type === 'income' ? 'bg-emerald-500' : 'bg-rose-500'}
							/>
						</div>

						<div className='flex flex-col gap-2'>
							<div className='flex items-center justify-between'>
								<span className='flex items-center text-gray-400'>
									Icon Category
									<span className='ml-2 text-xs text-muted-foreground'>
										50%
									</span>
								</span>

								<span className='text-sm font-bold text-gray-500'>50$</span>
							</div>

							<Progress
								value={50}
								indicator={type === 'income' ? 'bg-emerald-500' : 'bg-rose-500'}
							/>
						</div>

						<div className='flex flex-col gap-2'>
							<div className='flex items-center justify-between'>
								<span className='flex items-center text-gray-400'>
									Icon Category
									<span className='ml-2 text-xs text-muted-foreground'>
										50%
									</span>
								</span>

								<span className='text-sm font-bold text-gray-500'>50$</span>
							</div>

							<Progress
								value={50}
								indicator={type === 'income' ? 'bg-emerald-500' : 'bg-rose-500'}
							/>
						</div>
					</div>
				</ScrollArea>
			</div>
		</Card>
	)
}
