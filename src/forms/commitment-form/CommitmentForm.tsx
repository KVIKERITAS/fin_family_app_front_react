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
    name: z.string(),
    paymentStart: z.coerce.date(),
    commitmentEnds: z.coerce.date(),
    price: z.coerce.number().positive().multipleOf(0.01),
    feeType: z.union([z.literal('month'), z.literal('quarter'), z.literal('year')]),
    paymentDate: z.coerce.date(),
    fee: z.coerce.number().positive().multipleOf(0.01),
    initialPayment: z.coerce.number().nonnegative().multipleOf(0.01),
    interestRate: z.coerce.number().nonnegative().multipleOf(0.01),
    sumPayLeft: z.coerce.number().nonnegative().multipleOf(0.01),
    type: z.union([z.literal('Subscriptions'), z.literal('Leasing'), z.literal('Debts-mortgage-study-loans')]),
})

type CommitmentFormData = z.infer<typeof FormSchema>

type Props = {
	onSave: (transactionData: CommitmentFormData) => void
	isLoading: boolean
}

const CommitmentForm = ({ onSave, isLoading }: Props) => {
	const form = useForm<CommitmentFormData>({
		resolver: zodResolver(FormSchema),
	})

	function onSubmit(data: CommitmentFormData) {
		console.log(JSON.stringify(data, null, 2))
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
				<FormField
					control={form.control}
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
									<SelectItem value="Debts-mortgage-study-loans">Debts/mortgage/study loans</SelectItem>
								</SelectContent>
							</Select>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='name'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Name</FormLabel>
							<FormControl>
								<Input defaultValue={''} {...field} />
							</FormControl>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
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
					control={form.control}
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
					control={form.control}
					name='price'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Price</FormLabel>
							<FormControl>
								<Input defaultValue={0} type='number' {...field} />
							</FormControl>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
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
					control={form.control}
					name='fee'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Fee</FormLabel>
							<FormControl>
								<Input defaultValue={0} type='number' {...field} />
							</FormControl>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
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
                <FormField
					control={form.control}
					name='initialPayment'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Initial Payment</FormLabel>
							<FormControl>
								<Input defaultValue={0} type='number' {...field} />
							</FormControl>
						</FormItem>
					)}
				/>
                <FormField
					control={form.control}
					name='interestRate'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Interest Rate</FormLabel>
							<FormControl>
								<Input defaultValue={0} type='number' {...field} />
							</FormControl>
						</FormItem>
					)}
				/>
				<Button type='submit'>Save</Button>
			</form>
		</Form>
	)
}

export default CommitmentForm
