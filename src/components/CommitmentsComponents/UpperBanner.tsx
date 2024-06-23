import { useGetMyUser } from '@/api/MyUserApi'
import CreateCommitmentDialog from '@/components/CommitmentsComponents/CreateCommitmentDialog'
import { Button } from '@/components/ui/button'

const DashboardIntro = () => {
	const { currentUser } = useGetMyUser()

	return (
		<div className='container flex w-full flex-col gap-2 py-3 sm:py-6'>
			<div className='flex flex-col gap-4 items-center justify-between sm:flex-row'>
				<h2 className='text-3xl font-bold pt-4 sm:pt-0'>Commitments</h2>
				<CreateCommitmentDialog
					trigger={
						<Button
							variant='outline'
							className='bg-emerald-600 text-white hover:bg-emerald-800 hover:text-white'
						>
							Add commitment
						</Button>
					}
				/>
			</div>
		</div>
	)
}

export default DashboardIntro
