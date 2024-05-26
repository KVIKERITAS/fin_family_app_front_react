import CategoriesStats from '@/components/CategoriesStats'
import StatsCard from '@/components/StatsCard'
import TransactionButtons from '@/components/TransactionButtons'

const PersonalFinancePage = () => {
	return (
		<>
			<div className='container flex w-full flex-col gap-2'>
				<div className='flex items-center justify-between'>
					<h2 className='text-3xl font-bold'>Overview</h2>
					<TransactionButtons />
				</div>
				<StatsCard />
				<CategoriesStats />
			</div>
		</>
	)
}

export default PersonalFinancePage
