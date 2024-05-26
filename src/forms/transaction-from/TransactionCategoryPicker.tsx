import { useGetTransactionCategories } from '@/api/MyTransactionApi'
import CreateCategoryDialog from '@/components/CreateCategoryDialog'
import { TransactionType } from '@/components/CreateTransactionDialog'
import { Spinner } from '@/components/Spinner'
import { Button } from '@/components/ui/button'
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from '@/components/ui/command'
import { Popover, PopoverContent } from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { TransactionCategory } from '@/types'
import { PopoverTrigger } from '@radix-ui/react-popover'
import { Check, ChevronsUpDown } from 'lucide-react'
import { useEffect, useState } from 'react'

type Props = {
	type: TransactionType
	onChange: (value: string) => void
}

const TransactionCategoryPicker = ({ type, onChange }: Props) => {
	const [open, setOpen] = useState(false)
	const [value, setValue] = useState('')

	useEffect(() => {
		if (!value) return
		onChange(value)
	}, [onChange, value])

	const { transactionCategories, isLoading } = useGetTransactionCategories(type)

	isLoading && <Spinner />

	const selectedCategory = transactionCategories?.find(
		(category: TransactionCategory) => category.name === value,
	)

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant='outline'
					role='combobox'
					aria-expanded={open}
					className='w-[200px] justify-between'
				>
					{selectedCategory ? (
						<CategoryRow category={selectedCategory} />
					) : (
						'Select category'
					)}
					<ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
				</Button>
			</PopoverTrigger>
			<PopoverContent className='w-[200px] p-0'>
				<Command onSubmit={e => e.preventDefault()}>
					<CommandInput placeholder='Search category...' />
					<CreateCategoryDialog type={type} />
					<CommandEmpty>
						<p>Category not found</p>
						<p className='text-xs text-muted-foreground'>
							Tip: create a new category
						</p>
					</CommandEmpty>
					<CommandGroup>
						<CommandList>
							{transactionCategories &&
								transactionCategories.map((category: TransactionCategory) => (
									<CommandItem
										key={category.name}
										onSelect={() => {
											setValue(category.name), setOpen(prev => !prev)
										}}
									>
										<CategoryRow category={category} />
										<Check
											className={cn(
												'mr-2 w-4 h-4 opacity-0',
												value === category.name && 'opacity-100',
											)}
										/>
									</CommandItem>
								))}
						</CommandList>
					</CommandGroup>
				</Command>
			</PopoverContent>
		</Popover>
	)
}

export default TransactionCategoryPicker

function CategoryRow({ category }: { category: TransactionCategory }) {
	return (
		<div className='flex items-center gap-2'>
			<span role='img'>{category.icon}</span>
			<span>{category.name}</span>
		</div>
	)
}
