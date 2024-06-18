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
import { CommitmentCategorySelect } from './CommitmentCategorySelect'
import { CommitmentFeeTypeSelect } from './CommitmentFeeTypeSelect'
//todo CommitmentCategoryPicker

const formSchema = z.object({
    name: z.string(),
    paymentStart: z.string(), // todo - change to z.coerce.date(),
    commitmentEnds: z.string(), // todo - change to z.coerce.date(),
    price: z.coerce.number().positive().multipleOf(0.01),
    feeType: z.union([z.literal('month'), z.literal('quarter'), z.literal('year')]),
    paymentDate: z.string(), // todo - change to z.coerce.date(),
    fee: z.coerce.number().positive().multipleOf(0.01),
    initialPayment: z.coerce.number().positive().multipleOf(0.01),
    interestRate: z.coerce.number().positive().multipleOf(0.01),
    sumPayLeft: z.coerce.number().positive().multipleOf(0.01),
    type: z.union([z.literal('Subscriptions'), z.literal('Leasing'), z.literal('Debts-mortgage-study-loans')]),
})

type CommitmentFormData = z.infer<typeof formSchema>

type Props = {
	onSave: (transactionData: CommitmentFormData) => void
	isLoading: boolean
}

const CommitmentForm = ({ onSave, isLoading }: Props) => {
	const form = useForm<CommitmentFormData>({
		resolver: zodResolver(formSchema),
	})

    const handleCommitmentTypeChange = () => {

    }

    const handleCommitmentFeeTypeChange = () => {

    }

	return (
		<Form {...form}>
			{/* <form className='space-y-4'> */}
                <FormField
					control={form.control}
					name='type'
					render={({ field }) => (
                        <FormItem>
                            <FormLabel>Commitment Type</FormLabel>
                            <FormControl>
                                <CommitmentCategorySelect
                                    onChange={handleCommitmentTypeChange}
                                />
                            </FormControl>
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
								<Input defaultValue={''} {...field} />
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
								<Input defaultValue={''} {...field} />
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
					name='feeType'
					render={({ field }) => (
                        <FormItem>
                            <FormLabel>Fee Type</FormLabel>
                            <FormControl>
                                <CommitmentFeeTypeSelect
                                    onChange={handleCommitmentFeeTypeChange}
                                />
                            </FormControl>
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
			{/* </form> */}
		</Form>
	)
}

export default CommitmentForm
