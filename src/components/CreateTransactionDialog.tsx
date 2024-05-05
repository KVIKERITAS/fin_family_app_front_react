import TransactionForm from '@/forms/transaction-from/TransactionForm'
import { cn } from '@/lib/utils'
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from './ui/dialog'

export type TransactionType = 'income' | 'expense'

type Props = {
	trigger: React.ReactNode
	type: TransactionType
}

const CreateTransactionDialog = ({ trigger, type }: Props) => {
	return (
		<Dialog>
			<DialogTrigger asChild>{trigger}</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>
						Create a new{' '}
						<span
							className={cn(
								'm1',
								type === 'income' ? 'text-emerald-600' : 'text-rose-600',
							)}
						>
							{type}
						</span>{' '}
						transaction
					</DialogTitle>
				</DialogHeader>
				<TransactionForm type={type} />
			</DialogContent>
		</Dialog>
	)
}

export default CreateTransactionDialog
