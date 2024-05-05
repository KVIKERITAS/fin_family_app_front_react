import { TransactionType } from '@/components/CreateTransactionDialog'
import { Button } from '@/components/ui/button'
import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Popover, PopoverTrigger } from '@/components/ui/popover'
import { zodResolver } from '@hookform/resolvers/zod'
import { CircleOff } from 'lucide-react'
import { Form, useForm } from 'react-hook-form'
import { z } from 'zod'

const formSchema = z.object({
	name: z.string().min(3).max(20),
	icon: z.string().min(20),
	type: z.enum(['income', 'expense']),
})

type Props = {
	type: TransactionType
}

type CategoryFormData = z.infer<typeof formSchema>

const CategoryForm = ({ type }: Props) => {
	const form = useForm<CategoryFormData>({
		resolver: zodResolver(formSchema),
		defaultValues: { type },
	})

	return (
		<Form {...form}>
			<form className='space-y-8'>
				<FormField
					control={form.control}
					name='name'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Name</FormLabel>
							<FormControl>
								<Input defaultValue={''} {...field} />
							</FormControl>
							<FormDescription>
								Select a category for this transaction
							</FormDescription>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='icon'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Icon</FormLabel>
							<FormControl>
								<Popover>
									<PopoverTrigger asChild>
										<Button variant='outline' className='h-[100px] w-full'>
											{form.watch('icon') ? (
												<div>Selected icon</div>
											) : (
												<div className='flex flex-col items-center gap-2'>
													<CircleOff className='h-[48px] w-[48px]' />
												</div>
											)}
										</Button>
									</PopoverTrigger>
								</Popover>
							</FormControl>
							<FormDescription>
								This is how your category will appear in the app
							</FormDescription>
						</FormItem>
					)}
				/>
			</form>
		</Form>
	)
}

export default CategoryForm
