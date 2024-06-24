import { Button } from '@/components/ui/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
  } from "@/components/ui/select"

const FormSchema = z.object({
	type: z.union([z.literal('Subscriptions'), z.literal('Leasing'), z.literal('Debts'), z.literal('Mortgage'), z.literal('Insurance')]),
    name: z.string(),
    paymentStart: z.coerce.date(),
    commitmentEnds: z.coerce.date(),
    // price: z.coerce.number().positive().multipleOf(0.01), //deleted in form for now, because there is no such field in backend model
    feeType: z.union([z.literal('month'), z.literal('quarter'), z.literal('year')]),
    paymentDate: z.coerce.date(),
    fee: z.coerce.number().positive().multipleOf(0.01),
    initialPayment: z.coerce.number().nonnegative().multipleOf(0.01).optional(),
    interestRate: z.coerce.number().nonnegative().multipleOf(0.01).optional(),
    sumPayLeft: z.coerce.number().nonnegative().multipleOf(0.01).optional(),
})

type CommitmentFormData = z.infer<typeof FormSchema>

type Props = {
	onSave: (commitmentData: CommitmentFormData) => void
	isLoading: boolean
}

const CommitmentForm = ({ onSave, isLoading }: Props) => {
	const form = useForm<CommitmentFormData>({
		resolver: zodResolver(FormSchema),
	})

	const { control, handleSubmit, watch } = form
	const selectedType = watch('type')

	function onSubmit(data: CommitmentFormData) {
		onSave(data);
	}

	return (
		<Form {...form}>
			<form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
				<FormField
					control={control}
					name="type"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Commitment Type</FormLabel>
							<Select onValueChange={field.onChange} defaultValue={field.value}>
								<FormControl>
								<SelectTrigger>
									<SelectValue placeholder="Select commitment type" />
								</SelectTrigger>
								</FormControl>
								<SelectContent>
									<SelectItem value="Subscriptions">Subscriptions</SelectItem>
									<SelectItem value="Leasing">Leasing</SelectItem>
									<SelectItem value="Debts">Debts</SelectItem>
									<SelectItem value="Mortgage">Mortgage</SelectItem>
									<SelectItem value="Insurance">Insurance</SelectItem>
								</SelectContent>
							</Select>
						</FormItem>
					)}
				/>
				<FormField
					control={control}
					name='name'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Name</FormLabel>
							<FormControl>
								<Input {...field} />
							</FormControl>
						</FormItem>
					)}
				/>
				<FormField
					control={control}
					name='paymentStart'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Payment Start</FormLabel>
							<FormControl>
								<Input type="date" {...field} />
							</FormControl>
						</FormItem>
					)}
				/>
                <FormField
					control={control}
					name='commitmentEnds'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Commitment End</FormLabel>
							<FormControl>
								<Input type="date" {...field} />
							</FormControl>
						</FormItem>
					)}
				/>
				<FormField
					control={control}
					name="feeType"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Fee Type</FormLabel>
							<Select onValueChange={field.onChange} defaultValue={field.value}>
								<FormControl>
								<SelectTrigger>
									<SelectValue placeholder="Select fee type" />
								</SelectTrigger>
								</FormControl>
								<SelectContent>
									<SelectItem value="month">Monthly</SelectItem>
									<SelectItem value="quarter">Quarterly</SelectItem>
									<SelectItem value="year">Yearly</SelectItem>
								</SelectContent>
							</Select>
						</FormItem>
					)}
				/>
                <FormField
					control={control}
					name='fee'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Fee</FormLabel>
							<FormControl>
								<Input type='number' {...field} />
							</FormControl>
						</FormItem>
					)}
				/>
				<FormField
					control={control}
					name='paymentDate'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Payment Date</FormLabel>
							<FormControl>
								<Input type="date" {...field} />
							</FormControl>
						</FormItem>
					)}
				/>
                {selectedType === 'Mortgage' && 
					<FormField
						control={control}
						name='initialPayment'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Initial Payment</FormLabel>
								<FormControl>
									<Input type='number' {...field} />
								</FormControl>
							</FormItem>
						)}
					/>
				}
                {selectedType === 'Mortgage' &&
					<FormField
						control={control}
						name='interestRate'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Interest Rate</FormLabel>
								<FormControl>
									<Input type='number' {...field} />
								</FormControl>
							</FormItem>
						)}
					/>
				}
				{selectedType === 'Mortgage' &&
					<FormField
						control={control}
						name='sumPayLeft'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Left To Pay</FormLabel>
								<FormControl>
									<Input type='number' {...field} />
								</FormControl>
							</FormItem>
						)}
					/>
				}
				<Button type="submit" disabled={isLoading}>
					{isLoading ? 'Saving...' : 'Save'}
				</Button>
			</form>
		</Form>
	)
}

export default CommitmentForm
