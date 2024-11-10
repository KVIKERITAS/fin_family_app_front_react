import { Button } from '@/components/ui/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { CommitmentType, NewCommitment } from '@/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const FormSchema = z.object({
	name: z
		.string()
		.max(30, { message: 'Name must be at most 30 characters long' })
		.min(1, { message: 'Commitment name cannot be empty' }),
	feeType: z.union([
		z.literal('monthly'),
		z.literal('quarterly'),
		z.literal('yearly'),
	]),
	fee: z.coerce.number().positive().multipleOf(0.01),
	commitmentStart: z.coerce.date(),
	commitmentEnds: z.coerce.date().optional(),
})

type SubscriptionsAndInsuranceFormData = z.infer<typeof FormSchema>

type Props = {
	commitmentType: CommitmentType
	onSave: (commitmentData: NewCommitment) => void
	isLoading: boolean
}

const SubscriptionsAndInsuranceForm = ({
	commitmentType,
	onSave,
	isLoading,
}: Props) => {
	const form = useForm<SubscriptionsAndInsuranceFormData>({
		resolver: zodResolver(FormSchema),
	})

	const { control, handleSubmit } = form
	const currentDate = new Date().toISOString().split('T')[0]

	function onSubmit(data: SubscriptionsAndInsuranceFormData) {
		const newCommitmentData = Object.assign({ type: commitmentType }, data)
		onSave(newCommitmentData)
	}

	return (
		<Form {...form}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className='space-y-3 mt-3'>
					<FormField
						control={control}
						name='name'
						defaultValue=''
						render={({ field }) => (
							<FormItem>
								<FormLabel>Name</FormLabel>
								<FormControl>
									<Input {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={control}
						name='feeType'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Fee Type</FormLabel>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
								>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder='Select fee type' />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										<SelectItem value='monthly'>Monthly</SelectItem>
										<SelectItem value='quarterly'>Quarterly</SelectItem>
										<SelectItem value='yearly'>Yearly</SelectItem>
									</SelectContent>
								</Select>
							</FormItem>
						)}
					/>
					<FormField
						control={control}
						name='fee'
						defaultValue={0}
						render={({ field }) => (
							<FormItem>
								<FormLabel>Fee</FormLabel>
								<FormControl>
									<Input type='number' {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={control}
						name='commitmentStart'
						defaultValue={currentDate}
						render={({ field }) => (
							<FormItem>
								<FormLabel>Payment Start</FormLabel>
								<FormControl>
									<Input type='date' {...field} />
								</FormControl>
								<FormMessage />
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
									<Input type='date' {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<Button type='submit' disabled={isLoading} className='mt-6'>
					{isLoading ? 'Saving...' : 'Save'}
				</Button>
			</form>
		</Form>
	)
}

export default SubscriptionsAndInsuranceForm
