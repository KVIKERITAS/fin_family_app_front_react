import TransactionForm from '@/forms/transaction-from/TransactionForm'
// import { cn } from '@/lib/utils'

import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'

export type TransactionType = 'income' | 'expense'

type Props = {
	trigger: React.ReactNode

}

const CreateTransactionDialog = ({ trigger }: Props) => {
	return (
		<Dialog>
			<DialogTrigger asChild>{trigger}</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>
						Create a new commitment
					</DialogTitle>
				</DialogHeader>
				{/*<TransactionForm type={type} />*/}
			</DialogContent>
		</Dialog>
	)
}

export default CreateTransactionDialog
