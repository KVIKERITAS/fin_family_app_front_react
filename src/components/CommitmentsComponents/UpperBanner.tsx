import { useGetMyUser } from '@/api/MyUserApi'
import CreateCommitmentDialog from '@/components/CommitmentsComponents/CreateCommitmentDialog'
import { Button } from '@/components/ui/button'

const DashboardIntro = () => {
	const { currentUser } = useGetMyUser()

	return (
		<div className='border-b bg-card'>
			<div className='container flex flex-wrap items-center justify-end py-6'>
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
