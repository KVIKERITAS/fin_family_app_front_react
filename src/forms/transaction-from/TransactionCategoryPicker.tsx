import CreateCategoryDialog from '@/components/CreateCategoryDialog'
import { TransactionType } from '@/components/CreateTransactionDialog'
import { Button } from '@/components/ui/button'
import { Command, CommandInput } from '@/components/ui/command'
import { Popover, PopoverContent } from '@/components/ui/popover'
import { TransactionCategories } from '@/config/TransactionCategories'
import { PopoverTrigger } from '@radix-ui/react-popover'
import { useState } from 'react'

type Props = {
	type: TransactionType
}

const TransactionCategoryPicker = ({ type }: Props) => {
	const [open, setOpen] = useState(false)
	const [value, setValue] = useState('')

	const selectedCategory = TransactionCategories.find(
		category => category === value,
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
				</Button>
			</PopoverTrigger>
			<PopoverContent className='w-[200px] p-0'>
				<Command onSubmit={e => e.preventDefault()}>
					<CommandInput placeholder='Search category...' />
					<CreateCategoryDialog type={type} />
				</Command>
			</PopoverContent>
		</Popover>
	)
}

export default TransactionCategoryPicker

function CategoryRow({ category }: { category: string }) {
	return (
		<div className='flex items-center gap-2'>
			<span>{category}</span>
		</div>
	)
}
