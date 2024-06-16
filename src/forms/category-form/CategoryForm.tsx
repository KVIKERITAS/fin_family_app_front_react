import { TransactionType } from '@/components/CreateTransactionDialog'
import LoadingButton from '@/components/LoadingButton'
import { Button } from '@/components/ui/button'
import { DialogClose, DialogFooter } from '@/components/ui/dialog'
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { CircleOff } from 'lucide-react'
import { useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const formSchema = z.object({
	name: z.string().min(3).max(20),
	icon: z.string().max(20),
	type: z.enum(['income', 'expense']),
})

export type CategoryFormData = z.infer<typeof formSchema>

type Props = {
	type: TransactionType
	onSave: (categoryData: CategoryFormData) => void
	isLoading: boolean
	setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const CategoryForm = ({ type, onSave, isLoading, setOpen }: Props) => {
	const form = useForm<CategoryFormData>({
		resolver: zodResolver(formSchema),
		defaultValues: { type },
	})

	const onSubmit = useCallback(
		(formData: CategoryFormData) => {
			form.reset({ name: '', icon: '', type })
			onSave(formData)
			setOpen(prev => !prev)
		},
		[onSave, setOpen, form, type],
	)

	return (
		<>
			<Form {...form}>
				<form className='space-y-8' onSubmit={form.handleSubmit(onSubmit)}>
					<FormField
						control={form.control}
						name='name'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Name</FormLabel>
								<FormControl>
									<Input placeholder='Category' {...field} />
								</FormControl>
								<FormMessage />
								<FormDescription>
									This is how your category will appear in the app
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
													<div className='flex flex-col items-center gap-2'>
														<span className='text-5xl' role='img'>
															{field.value}
														</span>

														<p className='text-xs text-muted-foreground'>
															Click to change
														</p>
													</div>
												) : (
													<div className='flex flex-col items-center gap-2'>
														<CircleOff className='h-[48px] w-[48px]' />

														<p className='text-xs text-muted-foreground'>
															Click to select
														</p>
													</div>
												)}
											</Button>
										</PopoverTrigger>
										<PopoverContent className='relative top-[30px] w-full p-0 border-none rounded-full'>
											<Picker
												data={data}
												onEmojiSelect={(emoji: { native: string }) => {
													field.onChange(emoji.native)
												}}
											/>
										</PopoverContent>
									</Popover>
								</FormControl>
								<FormMessage />
								<FormDescription>
									This is how your category will appear in the app
								</FormDescription>
							</FormItem>
						)}
					/>
					<DialogFooter>
						<DialogClose asChild>
							<Button type='button' variant='secondary'>
								Cancel
							</Button>
						</DialogClose>
						{isLoading ? (
							<LoadingButton />
						) : (
							<Button type='submit'>Save</Button>
						)}
					</DialogFooter>
				</form>
			</Form>
		</>
	)
}

export default CategoryForm
