import { TransactionType } from '@/components/CreateTransactionDialog'
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import TransactionCategoryPicker from './TransactionCategoryPicker'

const formSchema = z.object({
	amount: z.coerce.number().positive().multipleOf(0.01),
	description: z.string().optional(),
	date: z.coerce.date(),
	category: z.string(),
	type: z.union([z.literal('income'), z.literal('expense')]),
})

type TransactionFormData = z.infer<typeof formSchema>

type Props = {
	onSave: (transactionData: TransactionFormData) => void
	isLoading: boolean
	type: TransactionType
}

const TransactionForm = ({ onSave, isLoading, type }: Props) => {
	const form = useForm<TransactionFormData>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			type,
			date: new Date(),
		},
	})

	return (
		<Form {...form}>
			<form className='space-y-4'>
				<FormField
					control={form.control}
					name='description'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Description</FormLabel>
							<FormControl>
								<Input defaultValue={''} {...field} />
							</FormControl>
							<FormDescription>
								Transaction description (optional)
							</FormDescription>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='amount'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Amount</FormLabel>
							<FormControl>
								<Input defaultValue={0} type='number' {...field} />
							</FormControl>
							<FormDescription>Transaction amount (required)</FormDescription>
						</FormItem>
					)}
				/>
				<div className='flex items-center justify-between gap-2'>
					<FormField
						control={form.control}
						name='category'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Category</FormLabel>
								<FormControl>
									<TransactionCategoryPicker type={type} />
								</FormControl>
								<FormDescription>
									Select a category for this transaction
								</FormDescription>
							</FormItem>
						)}
					/>
				</div>
			</form>
		</Form>
	)
}

export default TransactionForm
