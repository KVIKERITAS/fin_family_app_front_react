import CategoryForm from '@/forms/category-form/CategoryForm'
import { cn } from '@/lib/utils'
import { DialogDescription } from '@radix-ui/react-dialog'
import { PlusSquare } from 'lucide-react'
import { useState } from 'react'
import { TransactionType } from './CreateTransactionDialog'
import { Button } from './ui/button'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from './ui/dialog'

type Props = {
	type: TransactionType
}

const CreateCategoryDialog = ({ type }: Props) => {
	const [open, setOpen] = useState(false)

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button
					variant='ghost'
					className='flex border-separate items-center justify-start rounded-none border-b px-3 py-3 text-muted-foreground'
				>
					<PlusSquare className='mr-2 h-4 w-4' />
					Create new
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>
						Create
						<span
							className={cn(
								'm-1',
								type === 'income' ? 'text-emerald-600' : 'text-rose-600',
							)}
						>
							{type}
						</span>
						category
					</DialogTitle>
					<DialogDescription>
						Categories are used to group your transactions
					</DialogDescription>
				</DialogHeader>
				<CategoryForm />
			</DialogContent>
		</Dialog>
	)
}

export default CreateCategoryDialog
