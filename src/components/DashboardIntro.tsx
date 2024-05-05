import { useGetMyUser } from '@/api/MyUserApi'
import CreateTransactionDialog from './CreateTransactionDialog'
import { Button } from './ui/button'

const DashboardIntro = () => {
	const { currentUser } = useGetMyUser()

	return (
		<div className='border-b bg-card'>
			<div className='container flex flex-wrap items-center justify-between gap-6 py-6'>
				<p className='text-2xl font-bold'>Hello, {currentUser?.name}! 👋</p>

				<div className='flex items-center gap-3'>
					<CreateTransactionDialog
						trigger={
							<Button
								variant='outline'
								className='bg-emerald-600 text-white hover:bg-emerald-800 hover:text-white'
							>
								New Income
							</Button>
						}
						type='income'
					/>

					<CreateTransactionDialog
						trigger={
							<Button
								variant='outline'
								className='bg-rose-600 text-white hover:bg-rose-800 hover:text-white'
							>
								New Expense
							</Button>
						}
						type='expense'
					/>
				</div>
			</div>
		</div>
	)
}

export default DashboardIntro
